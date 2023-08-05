import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth/next";
import Navbar from "./navbar";

export default async function Nav() {
  // const [receivedLight, setReceivedLight] = useState(true);

  // console.log("nav", receivedLight);
  // const handleReceiveData = (data) => {
  //   setReceivedLight(data);
  // };

  const session = await getServerSession(authOptions);
  return <Navbar session={session} />;
}
