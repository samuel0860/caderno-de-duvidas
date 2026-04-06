import { useCallback } from "react";
import type { Doubt } from "../types/doubt";

interface DoubtCardProps {
  doubt: Doubt;
  onResolve: (id: string) => void;
  onRemove: (id: string) => void;
}

export function DoubtCard({ doubt, onResolve, onRemove }: DoubtCardProps) {
  const isResolved = doubt.status === "resolved";

  const handleResolve = useCallback(() => {
    onResolve(doubt.id);
  }, [doubt.id, onResolve]);

  const handleRemove = useCallback(() => {
    if (window.confirm("Remover essa dúvida? Essa ação não pode ser desfeita.")) {
      onRemove(doubt.id);
    }
  }, [doubt.id, onRemove]);

  const formattedDate = new Date(doubt.createdAt).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      className={`rounded-2xl border p-5 flex flex-col gap-3 transition-all duration-200 ${
        isResolved
          ? "bg-stone-50 border-stone-200 opacity-75"
          : "bg-white border-amber-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                isResolved
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {isResolved ? "✓ Resolvida" : "● Aberta"}
            </span>
            <span className="text-xs text-stone-400 bg-stone-100 px-2 py-0.5 rounded-full">
              {doubt.subject}
            </span>
          </div>
          <h2 className="text-base font-semibold text-stone-800 leading-snug mt-1">
            {doubt.title}
          </h2>
        </div>

        <button
          onClick={handleRemove}
          aria-label="Remover dúvida"
          className="text-stone-300 hover:text-red-400 transition-colors shrink-0 p-1 rounded-lg hover:bg-red-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
            <path d="M10 11v6M14 11v6" />
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
          </svg>
        </button>
      </div>

      {/* Context */}
      {doubt.context && (
        <p className="text-sm text-stone-500 leading-relaxed border-l-2 border-stone-200 pl-3">
          {doubt.context}
        </p>
      )}

      {/* Answer */}
      {isResolved && doubt.answer && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3">
          <p className="text-xs font-semibold text-emerald-600 mb-1">Resposta</p>
          <p className="text-sm text-emerald-800 leading-relaxed">{doubt.answer}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-1">
        <time className="text-xs text-stone-400" dateTime={doubt.createdAt}>
          {formattedDate}
        </time>

        {!isResolved && (
          <button
            onClick={handleResolve}
            className="text-sm font-medium text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors"
          >
            Marcar como resolvida →
          </button>
        )}
      </div>
    </article>
  );
}
