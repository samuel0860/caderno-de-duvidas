import { useState, useEffect, useCallback, useMemo } from "react";
import { doubtsApi } from "../api/doubtsApi";
import type { Doubt, CreateDoubtDTO, DoubtStatus } from "../types/doubt";

interface UseDoubtsReturn {
  doubts: Doubt[];
  filteredDoubts: Doubt[];
  openCount: number;
  resolvedCount: number;
  isLoading: boolean;
  error: string | null;
  activeFilter: DoubtStatus | "all";
  setActiveFilter: (filter: DoubtStatus | "all") => void;
  createDoubt: (dto: CreateDoubtDTO) => Promise<void>;
  resolveDoubt: (id: string, answer: string) => Promise<void>;
  removeDoubt: (id: string) => Promise<void>;
}

export function useDoubts(): UseDoubtsReturn {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<DoubtStatus | "all">("all");

  useEffect(() => {
    doubtsApi
      .getAll()
      .then(setDoubts)
      .catch(() =>
        setError(
          "Não foi possível carregar as dúvidas. Verifique se a API está rodando."
        )
      )
      .finally(() => setIsLoading(false));
  }, []);

  const filteredDoubts = useMemo(() => {
    if (activeFilter === "all") return doubts;
    return doubts.filter((d) => d.status === activeFilter);
  }, [doubts, activeFilter]);

  const openCount = useMemo(
    () => doubts.filter((d) => d.status === "open").length,
    [doubts]
  );

  const resolvedCount = useMemo(
    () => doubts.filter((d) => d.status === "resolved").length,
    [doubts]
  );

  const createDoubt = useCallback(async (dto: CreateDoubtDTO) => {
    const created = await doubtsApi.create(dto);
    setDoubts((prev) => [created, ...prev]);
  }, []);

  const resolveDoubt = useCallback(async (id: string, answer: string) => {
    const updated = await doubtsApi.resolve(id, {
      answer,
      status: "resolved",
      resolvedAt: new Date().toISOString(),
    });
    setDoubts((prev) => prev.map((d) => (d.id === id ? updated : d)));
  }, []);

  const removeDoubt = useCallback(async (id: string) => {
    await doubtsApi.remove(id);
    setDoubts((prev) => prev.filter((d) => d.id !== id));
  }, []);

  return {
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
  };
}
