import { Inter } from "next/font/google";
import Card from "@/components/Card";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <h1 className="text-2xl font-bold mb-3">Ballon Tz'or 2023</h1>
      </div>
      <div className="flex flex-col items-center w-full gap-2">
        <Card playerName={"Player Name"} votes={0} />
        <Card playerName={"Player Name"} votes={0} />
        <Card playerName={"Player Name"} votes={0} />
        <Card playerName={"Player Name"} votes={0} />
        <Card playerName={"Player Name"} votes={0} />
      </div>
    </main>
  );
}
