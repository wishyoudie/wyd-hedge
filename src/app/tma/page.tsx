import DuckWorkLottie from "~/components/lottie/duck-work";
import BackButton from "./_components/back-button";
import { Placeholder } from "@xelene/tgui";

export default async function HomePage() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <>
      <Placeholder
        // title="Work in Progress"
        header="Work in Progress"
        description="You came in too early, we are still working on our TMA."
      >
        <DuckWorkLottie />
      </Placeholder>
      <BackButton hide />
    </>
  );
}
