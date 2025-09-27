import Image from "next/image";
import { Greet } from "./components/greet";
import { Counter } from "./components/counter";
export default function Home() {
  return (
    <div>
        <Greet />
        <Counter />
   
    </div>
  );
}
