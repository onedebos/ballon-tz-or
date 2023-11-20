import { Inter } from "next/font/google";
import Card from "@/components/Card";

// Step 1
import { BeaconWallet } from "@taquito/beacon-wallet";
import { TezosToolkit } from "@taquito/taquito";
import { CONTRACT_ADDRESS, RPC_URL } from "@/helpers/constants";
import { useEffect, useState, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // Step 2 - Initialise a Tezos instance
  const Tezos = new TezosToolkit(RPC_URL);

  // Step 3 - Set state to display content on the screen
  const [players, setPlayers] = useState([]);
  const [reload, setReload] = useState(false);
  const [message, setMessage] = useState("");

  // Step 4 - Set a wallet ref to hold the wallet instance later
  const walletRef = useRef(null);

  // Step 5 - Create a ConnectWallet Function
  const connectWallet = async () => {
    setMessage("");
    try {
      const options = {
        name: "Ballon tz'or",
        network: { type: "ghostnet" },
      };
      const wallet = new BeaconWallet(options);
      walletRef.current = wallet;
      await wallet.requestPermissions();
      Tezos.setProvider({ wallet: walletRef.current });
    } catch (error) {
      console.error(error);
      setMessage(error.message);
    }
  };

  // Step 6 - Create a function to allow users disconnect their wallet from the
  // dApp
  const disconnectWallet = () => {
    setMessage("");
    if (walletRef.current != "disconnected") {
      walletRef.current?.client.clearActiveAccount();
      walletRef.current = "disconnected";
      console.log("Disconnected");
    } else {
      console.log("Already disconnected");
    }
  };

  // Step 7 - Create an async function that fetches the users from the storage
  const getPlayers = async () => {
    try {
      const contract = await Tezos.contract.at(CONTRACT_ADDRESS);
      const storage = await contract.storage();
      const players = [];

      if (storage) {
        storage.players.forEach((value, key) => {
          players.push({
            playerId: key,
            name: value.name,
            year: value.year,
            votes: value.votes.toNumber(),
          });
        });
      }

      setPlayers(players);
      return players;
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    }
  };

  // Step 8 - Create a function that calls the increase_votes entrypoint
  // and reloads the page to update it and display the new state of the storage
  const votePlayer = async (playerId) => {
    try {
      await connectWallet();
      const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);
      const op = await contract.methods.increase_votes(playerId).send();
      setMessage("Awaiting Confirmation....");
      const { hash } = await op.confirmation(2);
      console.log("hash:  ", hash);
      if (hash) {
        setMessage("Vote Confirmed.");
        setReload(true);
      }
    } catch (error) {
      setMessage(error.message);
      console.log(error);
    }
  };

  // Step 9 - Use a useEffect to call the getPlayers function when the page loads
  // initially
  useEffect(() => {
    getPlayers();
    if (reload) {
      setReload(false);
    }
  }, [reload]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <h1 className="text-2xl font-bold mb-3">Ballon Tz'or 2023</h1>
      </div>

      <div className="flex flex-col items-center w-full gap-2">
        {players?.length > 0
          ? players.map((player, index) => (
              <Card
                index={index}
                onClick={() => votePlayer(player.playerId)}
                playerId={player.playerId}
                playerName={player.name}
                votes={player.votes}
              />
            ))
          : "Loading....."}
      </div>
      <p className="my-3">
        {message ? <span className="text-gray-300">{message}</span> : ""}
      </p>
      <button
        className="mt-4 rounded-full bg-red-500 p-3 hover:bg-red-700 transition-all ease-in-out"
        onClick={() => disconnectWallet()}
      >
        Disconnect Wallet
      </button>
    </main>
  );
}
