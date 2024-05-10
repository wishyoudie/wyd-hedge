import BackButton from "./back-button";

type Props = {
  header: string;
  children?: React.ReactNode;
};

export default function NewEntityPage(props: Props) {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid max-w-[60rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {props.header}
          </h1>
        </div>
        {props.children}
      </div>
    </main>
  );
}
