"use client";
import { useState, useMemo, useEffect } from "react";
import { useTheme } from "next-themes";
import { spells } from "@/data/all_spells";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { SunIcon } from "@heroicons/react/24/solid";
import { MoonIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
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
  const [showFilters, setShowFilters] = useState(false);

  const classes = ["Artificer", "Bard", "Cleric", "Druid", "Paladin", "Ranger", "Sorcerer", "Warlock", "Wizard"];
  const schools = ["Abjuration", "Conjuration", "Divination", "Enchantment", "Evocation", "Illusion", "Necromancy", "Transmutation"];
  const castingTimes = ["1 action", "1 bonus action", "1 reaction", "1 minute", "10 minutes", "1 hour", "8 hours", "12 hours", "24 hours"];

  const labelMap = {
    V: "Verbal",
    S: "Somatic",
    M: "Material",
    gp: "Cost",
  }

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

  // Add this useEffect to handle client-side only rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="grid grid-rows-[60px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 h-[60px] bg-[var(--background)] border-b border-[var(--card-border)] flex items-center justify-center px-4 gap-4 z-10">
        <button
          className="border-2 rounded-sm p-2 bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)]"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted ? (
            theme === "dark" ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />
          ) : (
            <div className="w-5 h-5"></div> // Placeholder while not mounted
          )}
        </button>

        <div className="flex-1 max-w-xl">
          <input
            id="nameFilter"
            type="text"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            placeholder="Search spells..."
            className="border rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)]"
          />
        </div>

        <button
          className="border-2 rounded-sm p-2 bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)]"
          onClick={showFilters === true ? () => setShowFilters(false) : () => setShowFilters(true)}
        >
          <FunnelIcon className="w-5 h-5" />
        </button>
      </nav>

      <main className="flex flex-col gap-8 mt-[60px]">
        <div>
          {showFilters && (
            <div className="fixed top-0 right-0 h-full w-full bg-[var(--background)] shadow-lg z-40 overflow-y-auto transition-transform duration-300">
              <div className="p-2 flex justify-between items-center border-b border-[var(--card-border)]">
                <h2 className="text-lg font-bold text-[var(--text-primary)]">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="border-2 rounded-sm p-2 z-100 bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)]">
                  Close
                </button>
              </div>
              <div className="p-4 space-y-6">
                <div className="justify-center">
                  {/* Responsive grid for filter controls */}
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                    {/* Spell List Filter */}
                    <div>
                      <label htmlFor="spellListFilter" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                        Spell List:
                      </label>
                      <select
                        id="spellListFilter"
                        value={spellListFilter}
                        onChange={(e) => setSpellListFilter(e.target.value)}
                        className="border rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)]"
                      >
                        <option value="">All Spell Lists</option>
                        {classes.map((sl, index) => (
                          <option key={index} value={sl} className="bg-[var(--background)] text-[var(--text-primary)]">
                            {sl}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Level Filter */}
                    <div>
                      <label htmlFor="levelFilter" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                        Level:
                      </label>
                      <select
                        id="levelFilter"
                        value={levelFilter}
                        onChange={(e) => setLevelFilter(e.target.value)}
                        className="border rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)]"
                      >
                        <option value="">All Levels</option>
                        {uniqueLevels.map((lvl, index) => (
                          <option key={index} value={lvl} className="bg-[var(--background)] text-[var(--text-primary)]">
                            {lvl}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* School Filter */}
                    <div>
                      <label htmlFor="schoolFilter" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                        School:
                      </label>
                      <select
                        id="schoolFilter"
                        value={schoolFilter}
                        onChange={(e) => setSchoolFilter(e.target.value)}
                        className="border rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)]"
                      >
                        <option value="">All Schools</option>
                        {schools.map((school, index) => (
                          <option key={index} value={school} className="bg-[var(--background)] text-[var(--text-primary)]">
                            {school}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Casting Time Filter */}
                    <div>
                      <label htmlFor="castingTimeFilter" className="block text-sm font-medium mb-1 text-[var(--text-primary)]">
                        Casting Time:
                      </label>
                      <select
                        id="castingTimeFilter"
                        value={castingTimeFilter}
                        onChange={(e) => setCastingTimeFilter(e.target.value)}
                        className="border rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)]"
                      >
                        <option value="">All Casting Times</option>
                        {castingTimes.map((castTime, index) => (
                          <option key={index} value={castTime} className="bg-[var(--background)] text-[var(--text-primary)]">
                            {castTime}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Components Filter */}
                    <div>
                      <label className="block text-sm font-medium mb-1 text-[var(--text-primary)]">Components:</label>
                      <div className="flex gap-2">

                        {(["V", "S", "M", "gp"] as Array<"V" | "S" | "M" | "gp">).map((comp) => {
                          const key: "V" | "S" | "M" | "$" = comp === "gp" ? "$" : comp;
                          return (
                            <button
                              key={comp}
                              onClick={() => toggleComponentFilter(comp)}
                              className={`border rounded-lg p-2 flex-1 transition-colors ${componentsFilter[key] === 1
                                ? "bg-green-500 text-white"
                                : componentsFilter[key] === -1
                                  ? "bg-red-500 text-white"
                                  : "bg-[var(--tag-background)] text-[var(--text-primary)] border-[var(--card-border)]"
                                }`}
                            >
                              {labelMap[comp]}{" "}
                              {componentsFilter[key] === 1
                                ? "(included)"
                                : componentsFilter[key] === -1
                                  ? "(excluded)"
                                  : ""}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Ritual Button */}
                    <div className="flex items-end">
                      <button
                        className={`border-2 rounded-lg p-2 w-full transition-colors ${ritualFilter === ""
                          ? "bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)]"
                          : "bg-[var(--tag-background)] text-[var(--text-primary)] border-[var(--card-border)]"
                          }`}
                        onClick={() => setRitualFilter(ritualFilter ? "" : "ritual")}
                      >
                        Ritual
                      </button>
                    </div>

                    {/* Concentration Button */}
                    <div className="flex items-end">
                      <button
                        className={`border-2 rounded-lg p-2 w-full transition-colors ${concentrationFilter === ""
                          ? "bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)]"
                          : "bg-[var(--tag-background)] text-[var(--text-primary)] border-[var(--card-border)]"
                          }`}
                        onClick={() =>
                          setConcentrationFilter(
                            concentrationFilter ? "" : "concentration"
                          )
                        }
                      >
                        Concentration
                      </button>
                    </div>
                  </div>

                  {/* Clear Filters Button */}
                  <div className="mt-4">
                    <button
                      className="border rounded-lg p-2 w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--card-border)] transition-colors hover:bg-[var(--tag-background)]"
                      onClick={() => {
                        setNameFilter("");
                        setLevelFilter("");
                        setSchoolFilter("");
                        setCastingTimeFilter("");
                        setSpellListFilter("");
                        setConcentrationFilter("");
                        setRitualFilter("");
                        setComponentsFilter({
                          V: 0,
                          S: 0,
                          M: 0,
                          $: 0,
                        });
                      }}
                    >
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <div className="flex flex-col gap-4 w-full max-w-5xl">
        {filteredSpells.map((spell, index) => (
          <div
            key={index}
            className="border border-[var(--card-border)] rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-[var(--card-background)]"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">{spell.name}</h3>
              <div className="text-sm text-[var(--text-secondary)]">
                {spell.details.level} {spell.details.school}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[var(--text-secondary)] mb-3">
              <div><span className="font-medium">Casting Time:</span> {spell.details.castingTime}</div>
              <div><span className="font-medium">Range:</span> {spell.details.range}</div>
              <div><span className="font-medium">Duration:</span> {spell.details.duration}</div>
              <div><span className="font-medium">Components:</span> {spell.details.components}</div>
            </div>

            <div className="text-sm text-[var(--text-secondary)] mb-3">
              <p>{spell.details.description}</p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              <div className="bg-[var(--tag-background)] px-2 py-1 rounded">
                <span className="font-medium">Classes:</span> {spell.details.spellList}
              </div>
              {spell.details.upcast && (
                <div className="bg-[var(--tag-background)] px-2 py-1 rounded">
                  <span className="font-medium">Upcast:</span> {spell.details.upcast}
                </div>
              )}
              <div className="bg-[var(--tag-background)] px-2 py-1 rounded">
                <span className="font-medium">Source:</span> {spell.details.source}
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">

      </footer>
    </div>
  );
}
