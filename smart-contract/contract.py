import smartpy as sp


@sp.module
def main():
    class Voting(sp.Contract):
        def __init__(self, players, votersWalletAddresses):
            self.data.players = players
            self.data.votersWalletAddresses = votersWalletAddresses
            self.data.dummy = ""

        @sp.entrypoint
        def increase_votes(self, params):
            assert not self.data.votersWalletAddresses.contains(
                sp.sender
            ), "YouAlreadyVoted"
            assert self.data.players.contains(params.playerId), "PlayerIDNotFound"
            self.data.players[params.playerId].votes += 1
            self.data.votersWalletAddresses.add(sp.sender)

        @sp.entrypoint
        def dummy(self):
            self.data.dummy = ""


@sp.add_test(name="Voting")
def test():
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    charlie = sp.test_account("charlie")
    adebola = sp.test_account("adebola")

    scenario = sp.test_scenario(main)

    players = {
        1: sp.record(name="Lionel Messi", year="2023", votes=0),
        2: sp.record(name="Erling Haaland", year="2023", votes=0),
        3: sp.record(name="Kylian Mbappe", year="2023", votes=0),
        4: sp.record(name="Sadio Mane", year="2023", votes=0),
        5: sp.record(name="Cristiano Ronaldo", year="2023", votes=0),
    }

    contract = main.Voting(players, sp.set([alice.address]))
    scenario += contract

    # Scenario 1: Increase votes when playerId Exists
    contract.increase_votes(playerId=2).run(sender=bob.address)
    scenario.verify(contract.data.players[2].votes == 1)

    # Scenario 2: Increase votes when playerId Exists
    contract.increase_votes(playerId=2).run(sender=charlie.address)
    scenario.verify(contract.data.players[2].votes == 2)

    # Scenario 3: Fail if User already voted
    contract.increase_votes(playerId=2).run(
        sender=charlie, valid=False, exception="YouAlreadyVoted"
    )

    # Scenario 4: Fail if playerID does not exist
    contract.increase_votes(playerId=6).run(
        sender=adebola, valid=False, exception="PlayerIDNotFound"
    )
