export type DoubtStatus = "open" | "resolved";

export interface Doubt {
  id: string;
  title: string;
  context: string;
  subject: string;
  status: DoubtStatus;
  answer: string | null;
  createdAt: string;
  resolvedAt: string | null;
}

export type CreateDoubtDTO = Omit<
  Doubt,
  "id" | "createdAt" | "resolvedAt" | "answer" | "status"
>;

export type ResolveDoubtDTO = {
  answer: string;
  status: "resolved";
  resolvedAt: string;
};
