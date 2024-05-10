import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppCommandDialog from "@/widgets/command/command";
import Aside from "./_components/aside";
import Header from "./_components/header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-white dark:bg-black">
        <Header />
        <Aside />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          {children}
        </div>
      </div>
      <Toaster />
      <AppCommandDialog />
    </TooltipProvider>
  );
}
