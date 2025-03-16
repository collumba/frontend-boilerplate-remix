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
  title,
  description,
  icon,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4 p-8 text-center",
        className
      )}
      {...props}
    >
      {icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-600">
          {icon}
        </div>
      )}
      {title && (
        <Typography variant="h6" color="primary">
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" color="secondary" className="max-w-sm">
          {description}
        </Typography>
      )}
      {action && <div className="pt-2">{action}</div>}
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