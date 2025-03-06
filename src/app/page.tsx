import Image from "next/image";
import { spells } from "@/data/all_spells";

export default function Home() {
  console.log("spells", spells)
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

        <div>{spells
          .filter((spell) => spell.details.duration.toLowerCase().includes("conc"))
          .map((spell, index) => (
            <div key={index}>
              <div className="">{spell.name}</div>
              <div>{spell.details.duration}</div>
              <div>{spell.details.level}</div>
              <div>{spell.details.school}</div>
              <div>{spell.details.range}</div>
              <div>{spell.details.castingTime}</div>
              <div>{spell.details.description}</div>
              <div>{spell.details.spellList}</div>
              <div>{spell.details.upcast}</div>
              <br></br>
            </div>
          ))}</div>


        <div className="flex gap-4 items-center flex-col sm:flex-row">

        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
