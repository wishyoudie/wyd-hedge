export default function Welcome({ text }: { text?: string }) {
  return (
    <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
      Welcome, {text}
    </h1>
  );
}
