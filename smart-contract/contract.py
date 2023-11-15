import smartpy as sp


@sp.module
def main():
    class Voting(sp.Contract):
        def __init__(self, films, votersWalletAddresses):
            # cast the votersWalletAddress to a set of addresses. Explain why
            sp.cast(votersWalletAddresses, sp.set[sp.address])
            self.data.films = films
            self.data.votersWalletAddresses = votersWalletAddresses

        @sp.entrypoint
        def increase_votes(self, params):
            # Explain why we only use sp.sender and not take a param with walletAddress
            assert not self.data.votersWalletAddresses.contains(
                sp.sender
            ), "YouAlreadyVoted"
            assert self.data.films.contains(params.filmId), "FilmIDNotFound"
            self.data.films[params.filmId].votes += 1
            self.data.votersWalletAddresses.add(sp.sender)


@sp.add_test(name="Voting")
def test():
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    charlie = sp.test_account("charlie")
    adebola = sp.test_account("adebola")
    scenario = sp.test_scenario(main)
    films = {
        1: sp.record(name="Ant-man and the Wasp: Quantumania", year="2023", votes=0),
        2: sp.record(name="Guardian of the Galaxy Vol. 3", year="2023", votes=0),
    }

    contract = main.Voting(films, sp.set([alice.address]))
    scenario += contract

    # Scenario 1: Increase votes when filmId Exists
    contract.increase_votes(filmId=2).run(sender=bob.address)
    scenario.verify(contract.data.films[2].votes == 1)

    # Scenario 2: Increase votes when filmId Exists
    contract.increase_votes(filmId=2).run(sender=charlie.address)
    scenario.verify(contract.data.films[2].votes == 2)

    # Scenario 3: Fail if User already voted
    contract.increase_votes(filmId=2).run(
        sender=charlie, valid=False, exception="YouAlreadyVoted"
    )

    # Scenario 4: Fail if filmID does not exist
    contract.increase_votes(filmId=3).run(
        sender=adebola, valid=False, exception="FilmIDNotFound"
    )
