interface EmptyStateProps {
  title: string;
  description: string;
  icon?: string;
}

export function EmptyState({ title, description, icon = "📭" }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <span className="text-5xl mb-4" role="img" aria-label="ícone">
        {icon}
      </span>
      <h3 className="text-lg font-semibold text-stone-700 mb-1">{title}</h3>
      <p className="text-sm text-stone-400 max-w-xs">{description}</p>
    </div>
  );
}
