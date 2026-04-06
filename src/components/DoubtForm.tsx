import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import type { CreateDoubtDTO } from "../types/doubt";

interface DoubtFormProps {
  onSubmit: (dto: CreateDoubtDTO) => Promise<void>;
}

interface FormFields {
  title: string;
  context: string;
  subject: string;
}

interface FormErrors {
  title?: string;
  subject?: string;
}

const INITIAL_FIELDS: FormFields = { title: "", context: "", subject: "" };

export function DoubtForm({ onSubmit }: DoubtFormProps) {
  const [fields, setFields] = useState<FormFields>(INITIAL_FIELDS);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!fields.title.trim()) newErrors.title = "O título da dúvida é obrigatório.";
    if (!fields.subject.trim()) newErrors.subject = "Informe a matéria ou tema.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit({
        title: fields.title.trim(),
        context: fields.context.trim(),
        subject: fields.subject.trim(),
      });
      setFields(INITIAL_FIELDS);
    } catch {
      setSubmitError("Não foi possível salvar a dúvida. Verifique sua conexão e tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white border border-amber-200 rounded-2xl p-5 flex flex-col gap-4 shadow-sm"
    >
      <h2 className="text-base font-semibold text-stone-800">Nova dúvida</h2>

      {/* Title */}
      <div className="flex flex-col gap-1">
        <label htmlFor="title" className="text-sm font-medium text-stone-700">
          Qual é a sua dúvida? <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={fields.title}
          onChange={handleChange}
          placeholder="Ex: O que é closure em JavaScript?"
          className={`rounded-xl border px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition ${
            errors.title ? "border-red-300 bg-red-50" : "border-stone-200"
          }`}
          aria-describedby={errors.title ? "title-error" : undefined}
          aria-invalid={!!errors.title}
        />
        {errors.title && (
          <p id="title-error" role="alert" className="text-xs text-red-500">
            {errors.title}
          </p>
        )}
      </div>

      {/* Subject */}
      <div className="flex flex-col gap-1">
        <label htmlFor="subject" className="text-sm font-medium text-stone-700">
          Matéria / Tema <span aria-hidden="true" className="text-red-400">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={fields.subject}
          onChange={handleChange}
          placeholder="Ex: JavaScript, React, CSS..."
          className={`rounded-xl border px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition ${
            errors.subject ? "border-red-300 bg-red-50" : "border-stone-200"
          }`}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          aria-invalid={!!errors.subject}
        />
        {errors.subject && (
          <p id="subject-error" role="alert" className="text-xs text-red-500">
            {errors.subject}
          </p>
        )}
      </div>

      {/* Context */}
      <div className="flex flex-col gap-1">
        <label htmlFor="context" className="text-sm font-medium text-stone-700">
          Contexto{" "}
          <span className="text-stone-400 font-normal">(opcional)</span>
        </label>
        <textarea
          id="context"
          name="context"
          value={fields.context}
          onChange={handleChange}
          rows={3}
          placeholder="Em qual parte do estudo surgiu essa dúvida?"
          className="rounded-xl border border-stone-200 px-3 py-2 text-sm text-stone-800 placeholder:text-stone-300 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition"
        />
      </div>

      {submitError && (
        <p role="alert" className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
          {submitError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2.5 text-sm font-semibold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Salvando..." : "Registrar dúvida"}
      </button>
    </form>
  );
}
