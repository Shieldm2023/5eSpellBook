// hooks/useSpells.ts
import { useEffect, useState } from 'react';

export interface Spell {
  name: string;
  link: string;
  details:{
    name: string;
    source: string;
    level: string;
    school: string;
    castingTime: string;
    range: string;
    components: string;
    duration: string;
    description: string;
    upcast?: string;
    spellList?: string;
  }
}


export function useSpells() {
  const [spells, setSpells] = useState<Spell[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/spells');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json() as Spell[];
        setSpells(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return { spells, loading, error };
}