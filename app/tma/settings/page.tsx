import ThemeToggle from "~/app/theme/theme-select";
import BackButton from "~/shared/ui/back-button";

export default function SettingsPage() {
  return (
    <>
      <section className="px-4">
        <ThemeToggle />
      </section>
      <BackButton to={-1} />
    </>
  );
}
