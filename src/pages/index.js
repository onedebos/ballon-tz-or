import { Inter } from "next/font/google";
import Card from "@/components/Card";

// Step 1
import { TezosToolkit } from "@taquito/taquito";
import { CONTRACT_ADDRESS, RPC_URL } from "@/helpers/constants";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  // Step 2
  const Tezos = new TezosToolkit(RPC_URL);

  // Step 3
  const getPlayers = async () => {
    try {
      const contract = await Tezos.contract.at(CONTRACT_ADDRESS);
      const storage = await contract.storage();
      console.log("In the getMethods: ", storage);
      const v = [];

      storage.players.forEach((value, key) => {
        v.push({
          playerId: key,
          name: value.name,
          year: value.year,
          votes: value.votes.toNumber(),
        });
      });

      console.log("ss", v);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <h1 className="text-2xl font-bold mb-3">Ballon Tz'or 2023</h1>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <Card playerName={"Player Name"} onClick={getPlayers} />
        <Card playerName={"Player Name"} />
        <Card playerName={"Player Name"} />
        <Card playerName={"Player Name"} />
        <Card playerName={"Player Name"} />
      </div>
    </main>
  );
}
