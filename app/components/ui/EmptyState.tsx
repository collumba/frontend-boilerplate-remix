import { cn } from "@utils/cn";
import { Typography } from "./Typography";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title = "Nenhum conteúdo",
  description = "Não há itens para exibir no momento.",
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-[400px] flex-col items-center justify-center space-y-4 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          {icon}
        </div>
      )}
      <div className="max-w-md space-y-2">
        <Typography variant="h3">
          {title}
        </Typography>
        <Typography variant="body2" color="secondary">
          {description}
        </Typography>
      </div>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

// Predefined variants for common use cases
EmptyState.Search = function EmptyStateSearch({
  query,
  ...props
}: Omit<EmptyStateProps, "title" | "description"> & { query: string }) {
  return (
    <EmptyState
      title="Nenhum resultado encontrado"
      description={`Não encontramos resultados para "${query}". Tente uma busca diferente.`}
      {...props}
    />
  );
};

EmptyState.NoData = function EmptyStateNoData(props: Omit<EmptyStateProps, "title" | "description">) {
  return (
    <EmptyState
      title="Sem dados"
      description="Não há dados disponíveis para exibir no momento."
      {...props}
    />
  );
};

EmptyState.Error = function EmptyStateError({
  error,
  ...props
}: Omit<EmptyStateProps, "title" | "description"> & { error?: string }) {
  return (
    <EmptyState
      title="Ocorreu um erro"
      description={error || "Não foi possível carregar o conteúdo. Tente novamente mais tarde."}
      {...props}
    />
  );
}; 