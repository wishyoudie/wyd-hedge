interface SDKProviderErrorProps {
  message: string;
}

export default function SDKProviderError({ message }: SDKProviderErrorProps) {
  return (
    <blockquote>
      <code>{message}</code>
    </blockquote>
  );
}
