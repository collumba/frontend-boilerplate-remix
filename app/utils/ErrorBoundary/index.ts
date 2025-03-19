export default function ErrorBoundaryParserError({
  error,
}: {
  error: unknown;
}) {
  let errorMessage = "";
  let errorCode = 500;
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "object" && error !== null) {
    const errorObj = error as { status?: number; statusText?: string };
    if (errorObj.status) errorCode = errorObj.status;
    if (errorObj.statusText) errorMessage = errorObj.statusText;
  }
  return {
    errorMessage,
    errorCode,
  };
}
