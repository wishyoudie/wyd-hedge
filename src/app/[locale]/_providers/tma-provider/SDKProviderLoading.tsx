import Welcome from "~/app/[locale]/tma/wel";

export default function SDKProviderLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Welcome />
      </div>
    </div>
  );
}
