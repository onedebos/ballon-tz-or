## Getting Started

This is a [Tezos](https://tezos.com/) voting dApp example project.

To get started, first, run the development server:

```bash
npm run dev
```

Next, run

```bash
npm install
```

to install the necessary libraries.

```bash
npm run dev
```

to run the application. It'll start up on `localhost:3000` by default. Make sure to update the `CONTRACT_ADDRESS` in helpers/constants.js to use your preferred smart contract.

Create and deploy the dApp's smart contract by following [this tutorial](https://medium.com/@adebola-niran/how-to-build-a-voting-dapp-on-tezos-with-python-and-react-part-1-1b05e7b8f338).

Follow along with the Frontend of this tutorial by following [this post](https://medium.com/@adebola-niran/how-to-build-a-voting-dapp-on-tezos-with-python-and-react-part-2-ac44393331f5).

## Libraries used in this dApp

- [Taquito](https://taquito.com) - Interact with the Tezos blockchain using Taquito.
- [Beacon SDK](https://docs.walletbeacon.io/) - Beacon implements the [tzip-10](https://gitlab.com/tzip/tzip/tree/master/proposals/tzip-10) proposal allowing dApps interact with tezos wallets.

## Meta Transactions on Tezos

This repository also demonstrates how Meta transactions/gasless transactions work on Tezos. Read more [here](https://medium.com/@adebola-niran/how-to-pay-gas-fees-for-users-of-your-dapp-meta-transactions-on-tezos-018125b16651).

To see it in action, run the application and head to `/gasless` in your browser.

## More Tezos

Learn more about building on [Tezos](https://docs.tezos.com)
