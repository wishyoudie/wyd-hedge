interface SDKProviderErrorProps {
  error: unknown;
}

export default function SDKProviderError({ error }: SDKProviderErrorProps) {
  const message =
    error instanceof Error ? error.message : JSON.stringify(error);

  return (
    <blockquote>
      <code>{message}</code>
    </blockquote>
  );
}
