import Chat from "@/components/home/chat";
import Landing from "@/components/home/landing";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    session !== null ? (
      <Chat />
    ) : (
      <Landing />
    )
  );
}
