import axios from "axios";
import type { Doubt, CreateDoubtDTO, ResolveDoubtDTO } from "../types/doubt";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const doubtsApi = {
  getAll: async (): Promise<Doubt[]> => {
    const { data } = await api.get<Doubt[]>("/doubts");
    return data;
  },

  create: async (dto: CreateDoubtDTO): Promise<Doubt> => {
    const newDoubt: Omit<Doubt, "id"> = {
      ...dto,
      status: "open",
      answer: null,
      createdAt: new Date().toISOString(),
      resolvedAt: null,
    };
    const { data } = await api.post<Doubt>("/doubts", newDoubt);
    return data;
  },

  resolve: async (id: string, dto: ResolveDoubtDTO): Promise<Doubt> => {
    const { data } = await api.patch<Doubt>(`/doubts/${id}`, dto);
    return data;
  },

  remove: async (id: string): Promise<void> => {
    await api.delete(`/doubts/${id}`);
  },
};
