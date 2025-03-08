"use client";
import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { spells } from "@/data/all_spells";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [spellListFilter, setSpellListFilter] = useState("");
  const [ritualFilter, setRitualFilter] = useState("");
  const [concentrationFilter, setConcentrationFilter] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");

  const classes = ["Artificer", "Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"];
  const schools = ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"];

  useEffect(() => {
    setMounted(true);
  }, []);

  const uniqueLevels = useMemo(() =>
    [...new Set(spells.map((spell) => spell.details.level.toLowerCase()))], []
  );

  const stringInList = (spellString: string, searchSpellString: string) => {
    return spellString.includes(searchSpellString)
  }

  // const uniqueSpellList = useMemo(() =>
  //   [...new Set(spells.map((spell) => spell.details.spellList.toLowerCase()))], []
  // );

  const uniqueDuration = useMemo(() =>
    [...new Set(spells.map((spell) => spell.details.duration.toLowerCase()))], []
  );

  const uniqueRange = useMemo(() =>
    [...new Set(spells.map((spell) => spell.details.range.toLowerCase()))], []
  )

  const uniqueSchool = useMemo(() =>
    [...new Set(spells.map((spell) => spell.details.school.toLowerCase()))], []
  )



  const filteredSpells = useMemo(() => {
    return spells.filter((spell) => {
      const { name, details } = spell;
      return (
        (!nameFilter ||
          name.toLowerCase().includes(nameFilter.toLowerCase())) &&
        (!levelFilter || details.level.toLowerCase() === levelFilter.toLowerCase()) &&
        (!spellListFilter || stringInList(details.spellList.toLowerCase(), spellListFilter.toLowerCase())) &&
        (!ritualFilter || stringInList(details.school.toLowerCase(), ritualFilter.toLowerCase())) &&
        (!concentrationFilter || stringInList(details.duration.toLowerCase(), concentrationFilter.toLowerCase())) &&
        (!schoolFilter || stringInList(details.school.toLowerCase(), schoolFilter.toLowerCase()))
      );
    });
  }, [nameFilter, levelFilter, spellListFilter, ritualFilter, concentrationFilter, schoolFilter]);

  if (!mounted) return null;
  console.log(
    "spells", spells
  )
  console.log("unique duration", uniqueDuration);
  console.log("unique range", uniqueRange);
  console.log("qniue school", uniqueSchool);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <button
        className="border-2 rounded-sm p-2"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Toggle {theme === "dark" ? "Light" : "Dark"} Mode
      </button>
      <header className="flex"></header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="p-4">
          {/* Responsive grid for filter controls */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {/* Name Filter */}
            <div>
              <label htmlFor="nameFilter" className="block text-sm font-medium mb-1">
                Name:
              </label>
              <input
                id="nameFilter"
                type="text"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                className="border rounded-lg p-2 w-full"
              />
            </div>

            {/* Level Filter */}
            <div>
              <label htmlFor="levelFilter" className="block text-sm font-medium mb-1">
                Level:
              </label>
              <select
                id="levelFilter"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="border rounded-lg p-2 w-full"
              >
                <option value="">All Levels</option>
                {uniqueLevels.map((lvl, index) => (
                  <option key={index} value={lvl} className="bg-white text-gray-800">
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* School Filter */}
            <div>
              <label htmlFor="schoolFilter" className="block text-sm font-medium mb-1">
                School:
              </label>
              <select
                id="schoolFilter"
                value={schoolFilter}
                onChange={(e) => setSchoolFilter(e.target.value)}
                className="border rounded-lg p-2 w-full"
              >
                <option value="">All Schools</option>
                {schools.map((school, index) => (
                  <option key={index} value={school} className="bg-white text-gray-800">
                    {school}
                  </option>
                ))}
              </select>
            </div>

            {/* Spell List Filter */}
            <div>
              <label htmlFor="spellListFilter" className="block text-sm font-medium mb-1">
                Spell List:
              </label>
              <select
                id="spellListFilter"
                value={spellListFilter}
                onChange={(e) => setSpellListFilter(e.target.value)}
                className="border rounded-lg p-2 w-full"
              >
                <option value="">All Spell Lists</option>
                {classes.map((sl, index) => (
                  <option key={index} value={sl} className="bg-white text-gray-800">
                    {sl}
                  </option>
                ))}
              </select>
            </div>

            {/* Ritual Button */}
            <div className="flex items-end">
              <button
                className="border-2 rounded-lg p-2 w-full"
                onClick={() => setRitualFilter(ritualFilter ? "" : "ritual")}
              >
                Ritual
              </button>
            </div>

            {/* Concentration Button */}
            <div className="flex items-end">
              <button
                className="border-2 rounded-lg p-2 w-full"
                onClick={() =>
                  setConcentrationFilter(
                    concentrationFilter ? "" : "concentration"
                  )
                }
              >
                Concentration
              </button>
            </div>

            {/* Optionally add more filters or leave blank cells to maintain grid structure */}
          </div>

          {/* Clear Filters Button */}
          <div className="mt-4">
            <button
              className="border rounded-lg p-2 w-full"
              onClick={() => {
                setNameFilter("");

                setLevelFilter("");
                setSchoolFilter("");

                setSpellListFilter("");
                setConcentrationFilter("");
                setRitualFilter("");
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        <div>
          {filteredSpells.map((spell, index) => (
            <div key={index}>
              <div>{spell.name}</div>
              <div>{spell.details.duration}</div>
              <div>{spell.details.level}</div>
              <div>{spell.details.school}</div>
              <div>{spell.details.range}</div>
              <div>{spell.details.castingTime}</div>
              <div>{spell.details.components}</div>
              <div>{spell.details.description}</div>
              <div>{spell.details.spellList}</div>
              <div>{spell.details.upcast}</div>
              <div>{spell.details.source}</div>
              <br />
            </div>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
