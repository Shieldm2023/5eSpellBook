"use client";
import { useTheme } from "next-themes";
import { spells } from "@/data/all_spells";

export default function Home() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button
        className="border-2 rounded-sm p-2"
        onClick={() =>
          setTheme(theme === "dark" ? "light" : "dark")
        }
      >
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
      <header className="flex">5e Spells</header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div>
          {spells.map((spell, index) => (
            <div key={index}>
              <div>{spell.name}</div>
              <div>{spell.details.duration}</div>
              <div>{spell.details.level}</div>
              <div>{spell.details.school}</div>
              <div>{spell.details.range}</div>
              <div>{spell.details.castingTime}</div>
              <div>{spell.details.description}</div>
              <div>{spell.details.spellList}</div>
              <div>{spell.details.upcast}</div>
              <br />
            </div>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        chyea
      </footer>
    </div>
  );
}
