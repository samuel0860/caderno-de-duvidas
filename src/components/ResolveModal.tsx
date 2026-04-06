import { useState, useRef, useEffect } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface ResolveModalProps {
  doubtTitle: string;
  onConfirm: (answer: string) => Promise<void>;
  onCancel: () => void;
}

export function ResolveModal({ doubtTitle, onConfirm, onCancel }: ResolveModalProps) {
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
    if (error) setError(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!answer.trim()) {
      setError("Escreva a resposta antes de confirmar.");
      return;
    }

    setIsSubmitting(true);
    try {
      await onConfirm(answer.trim());
    } catch {
      setError("Erro ao salvar. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-4">
        <div>
          <h2 id="modal-title" className="text-lg font-semibold text-stone-800">
            Registrar resposta
          </h2>
          <p className="text-sm text-stone-500 mt-1 leading-snug">
            "{doubtTitle}"
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="answer"
              className="text-sm font-medium text-stone-700"
            >
              Como você resolveu essa dúvida?
            </label>
            <textarea
              id="answer"
              ref={textareaRef}
              value={answer}
              onChange={handleChange}
              rows={4}
              placeholder="Descreva a resposta ou o que você entendeu..."
              className="w-full rounded-xl border border-stone-200 p-3 text-sm text-stone-800 placeholder:text-stone-300 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
            />
            {error && (
              <p role="alert" className="text-xs text-red-500">
                {error}
              </p>
            )}
          </div>

          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-stone-600 hover:text-stone-800 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Salvando..." : "Confirmar resolução"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
