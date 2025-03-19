"use client";
import { useState, useMemo } from "react";
import { useTheme } from "next-themes";
import { spells } from "@/data/all_spells";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [nameFilter, setNameFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");
  const [spellListFilter, setSpellListFilter] = useState("");
  const [ritualFilter, setRitualFilter] = useState("");
  const [concentrationFilter, setConcentrationFilter] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [castingTimeFilter, setCastingTimeFilter] = useState("");
  const [componentsFilter, setComponentsFilter] = useState({
    V: 0,
    S: 0,
    M: 0,
    $: 0,
  });

  const classes = ["Artificer", "Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"];
  const schools = ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"];
  const castingTimes = ["1 action", "1 bonus action", "1 reaction", "1 minute", "10 minutes", "1 hour", "8 hours", "12 hours", "24 hours"];

  const toggleComponentFilter = (comp: "V" | "S" | "M" | "gp") => {
    const key = comp === "gp" ? "$" : comp;
    setComponentsFilter((prev) => ({
      ...prev,
      [key]: prev[key] === 0 ? 1 : prev[key] === 1 ? -1 : 0,
    }));
  };

  const uniqueLevels = useMemo(() =>
    [...new Set(spells.map((spell) => spell.details.level.toLowerCase()))], []
  );

  // const uniqueDuration = useMemo(() =>
  //   [...new Set(spells.map((spell) => spell.details.duration.toLowerCase()))], []
  // );

  // const uniqueRange = useMemo(() =>
  //   [...new Set(spells.map((spell) => spell.details.range.toLowerCase()))], []
  // )

  // const uniqueSchool = useMemo(() =>
  //   [...new Set(spells.map((spell) => spell.details.school.toLowerCase()))], []
  // )

  // const uniqueCastingTime = useMemo(() =>
  //   [...new Set(spells.map((spell) => spell.details.castingTime.toLowerCase()))], [])


  const filteredSpells = useMemo(() => {
    return spells.filter((spell) => {
      const { name, details } = spell;

      const nameMatches =
        !nameFilter ||
        name.toLowerCase().includes(nameFilter.toLowerCase());
      const levelMatches =
        !levelFilter ||
        details.level.toLowerCase() === levelFilter.toLowerCase();
      const spellListMatches =
        !spellListFilter ||
        details.spellList.toLowerCase().includes(spellListFilter.toLowerCase());
      const ritualMatches =
        !ritualFilter ||
        details.school.toLowerCase().includes(ritualFilter.toLowerCase());
      const concentrationMatches =
        !concentrationFilter ||
        details.duration.toLowerCase().includes(concentrationFilter.toLowerCase());
      const schoolMatches =
        !schoolFilter ||
        details.school.toLowerCase().includes(schoolFilter.toLowerCase());
      const castingTimeMatches =
        !castingTimeFilter ||
        details.castingTime.toLowerCase().includes(castingTimeFilter.toLowerCase());

      // Components filtering with three states: 
      // 0 = ignore, 1 = required, -1 = forbidden.
      let componentsMatch = true;
      const compStr = details.components.toLowerCase();
      for (const comp of ["V", "S", "M", "$"]) {
        const key = comp;
        const searchTerms = key === "$" ? ["gp", "tax"] : [comp.toLowerCase()];

        const filterVal = componentsFilter[key as "V" | "S" | "M" | "$"];

        if (filterVal === 1 && !searchTerms.some(term => compStr.includes(term))) {
          componentsMatch = false;
          break;
        }
        if (filterVal === -1 && searchTerms.some(term => compStr.includes(term))) {
          componentsMatch = false;
          break;
        }
      }



      return (
        nameMatches &&
        levelMatches &&
        spellListMatches &&
        ritualMatches &&
        concentrationMatches &&
        schoolMatches &&
        castingTimeMatches &&
        componentsMatch
      );
    });
  }, [
    nameFilter,
    levelFilter,
    spellListFilter,
    ritualFilter,
    concentrationFilter,
    schoolFilter,
    castingTimeFilter,
    componentsFilter,
  ]);

  // console.log("unique duration", uniqueDuration);
  // console.log("unique range", uniqueRange);
  // console.log("unique casting tiem", uniqueCastingTime);

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

            {/* Casting Time Filter */}
            <div>
              <label htmlFor="castingTimeFilter" className="block text-sm font-medium mb-1">
                Casting Time:
              </label>
              <select
                id="castingTimeFilter"
                value={castingTimeFilter}
                onChange={(e) => setCastingTimeFilter(e.target.value)}
                className="border rounded-lg p-2 w-full"
              >
                <option value="">All Casting Times</option>
                {castingTimes.map((castTime, index) => (
                  <option key={index} value={castTime} className="bg-white text-gray-800">
                    {castTime}
                  </option>
                ))}
              </select>
            </div>

            {/* Components Filter */}
            <div>
              <label className="block text-sm font-medium mb-1">Components:</label>
              <div className="flex gap-2">
                {(["V", "S", "M", "gp"] as Array<"V" | "S" | "M" | "gp">).map((comp) => {
                  const key: "V" | "S" | "M" | "$" = comp === "gp" ? "$" : comp;
                  return (
                    <button
                      key={comp}
                      onClick={() => toggleComponentFilter(comp)}
                      className={`border rounded-lg p-2 flex-1 ${componentsFilter[key] === 1
                        ? "bg-green-500 text-white"
                        : componentsFilter[key] === -1
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-800"
                        }`}
                    >
                      {comp === "gp" ? "$" : comp}{" "}
                      {componentsFilter[key] === 1
                        ? "(+)"
                        : componentsFilter[key] === -1
                          ? "(-)"
                          : ""}
                    </button>
                  );
                })}

              </div>
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
                className={ritualFilter === "" ? "border-2 rounded-lg p-2 w-full" : "border-2 rounded-lg p-2 w-full bg-gray-800 text-white"}
                onClick={() => setRitualFilter(ritualFilter ? "" : "ritual")}
              >
                Ritual
              </button>
            </div>

            {/* Concentration Button */}
            <div className="flex items-end">
              <button
                className={concentrationFilter === "" ? "border-2 rounded-lg p-2 w-full" : "border-2 rounded-lg p-2 w-full bg-gray-800 text-white"}
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
                setCastingTimeFilter("");
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
              <div>{spell.name + " " + spell.details.level + " " + spell.details.school}</div>
              <div>{spell.details.castingTime}</div>
              <div>{spell.details.range}</div>
              <div>{spell.details.duration}</div>
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
