import { useState } from "react";
import { useDoubts } from "../hooks/useDoubts";
import { DoubtCard } from "../components/DoubtCard";
import { DoubtForm } from "../components/DoubtForm";
import { ResolveModal } from "../components/ResolveModal";
import { EmptyState } from "../components/EmptyState";
import { FilterTabs } from "../components/FilterTabs";

export function HomePage() {
  const {
    doubts,
    filteredDoubts,
    openCount,
    resolvedCount,
    isLoading,
    error,
    activeFilter,
    setActiveFilter,
    createDoubt,
    resolveDoubt,
    removeDoubt,
  } = useDoubts();

  const [resolvingId, setResolvingId] = useState<string | null>(null);

  const doubtBeingResolved = resolvingId
    ? doubts.find((d) => d.id === resolvingId)
    : null;

  const handleConfirmResolve = async (answer: string) => {
    if (!resolvingId) return;
    await resolveDoubt(resolvingId, answer);
    setResolvingId(null);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-white border-b border-stone-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-800 tracking-tight">
              📓 Caderno de Dúvidas
            </h1>
            <p className="text-xs text-stone-400 mt-0.5">
              Registre, acompanhe e resolva suas dúvidas de estudo
            </p>
          </div>

          {!isLoading && !error && (
            <div className="hidden sm:flex items-center gap-4 text-sm text-stone-500">
              <span>
                <strong className="text-amber-600">{openCount}</strong> abertas
              </span>
              <span>
                <strong className="text-emerald-600">{resolvedCount}</strong> resolvidas
              </span>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar: form */}
          <aside className="lg:col-span-1">
            <DoubtForm onSubmit={createDoubt} />
          </aside>

          {/* Main: list */}
          <section className="lg:col-span-2 flex flex-col gap-4" aria-label="Lista de dúvidas">
            <FilterTabs
              active={activeFilter}
              onChange={setActiveFilter}
              openCount={openCount}
              resolvedCount={resolvedCount}
              totalCount={doubts.length}
            />

            {/* Loading */}
            {isLoading && (
              <div
                role="status"
                aria-live="polite"
                className="flex flex-col gap-3"
              >
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-2xl border border-stone-100 p-5 animate-pulse"
                  >
                    <div className="h-3 bg-stone-100 rounded w-1/4 mb-3" />
                    <div className="h-4 bg-stone-100 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-stone-100 rounded w-full" />
                  </div>
                ))}
                <span className="sr-only">Carregando dúvidas...</span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div
                role="alert"
                className="bg-red-50 border border-red-100 text-red-700 rounded-2xl p-5 text-sm"
              >
                <strong className="block font-semibold mb-1">Erro ao carregar</strong>
                {error}
              </div>
            )}

            {/* Empty */}
            {!isLoading && !error && filteredDoubts.length === 0 && (
              <div className="bg-white rounded-2xl border border-stone-100">
                {doubts.length === 0 ? (
                  <EmptyState
                    icon="🤔"
                    title="Nenhuma dúvida registrada ainda"
                    description="Use o formulário ao lado para registrar sua primeira dúvida de estudo."
                  />
                ) : (
                  <EmptyState
                    icon="✅"
                    title="Nenhuma dúvida aqui"
                    description={
                      activeFilter === "open"
                        ? "Você não tem dúvidas abertas. Ótimo trabalho!"
                        : "Você ainda não resolveu nenhuma dúvida."
                    }
                  />
                )}
              </div>
            )}

            {/* List */}
            {!isLoading && !error && filteredDoubts.length > 0 && (
              <ul className="flex flex-col gap-3">
                {filteredDoubts.map((doubt) => (
                  <li key={doubt.id}>
                    <DoubtCard
                      doubt={doubt}
                      onResolve={setResolvingId}
                      onRemove={removeDoubt}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      {/* Modal */}
      {doubtBeingResolved && (
        <ResolveModal
          doubtTitle={doubtBeingResolved.title}
          onConfirm={handleConfirmResolve}
          onCancel={() => setResolvingId(null)}
        />
      )}
    </div>
  );
}
