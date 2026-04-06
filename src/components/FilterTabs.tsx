import type { DoubtStatus } from "../types/doubt";

type Filter = DoubtStatus | "all";

interface FilterTabsProps {
  active: Filter;
  onChange: (filter: Filter) => void;
  openCount: number;
  resolvedCount: number;
  totalCount: number;
}

interface Tab {
  id: Filter;
  label: string;
  count: number;
}

export function FilterTabs({
  active,
  onChange,
  openCount,
  resolvedCount,
  totalCount,
}: FilterTabsProps) {
  const tabs: Tab[] = [
    { id: "all", label: "Todas", count: totalCount },
    { id: "open", label: "Abertas", count: openCount },
    { id: "resolved", label: "Resolvidas", count: resolvedCount },
  ];

  return (
    <nav aria-label="Filtrar dúvidas" className="flex gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          aria-pressed={active === tab.id}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
            active === tab.id
              ? "bg-amber-500 text-white shadow-sm"
              : "bg-stone-100 text-stone-500 hover:bg-stone-200 hover:text-stone-700"
          }`}
        >
          {tab.label}
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
              active === tab.id
                ? "bg-amber-400 text-white"
                : "bg-stone-200 text-stone-500"
            }`}
          >
            {tab.count}
          </span>
        </button>
      ))}
    </nav>
  );
}
