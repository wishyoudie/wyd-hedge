import Welcome from "./wel";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Welcome />
      </div>
    </main>
  );
}
