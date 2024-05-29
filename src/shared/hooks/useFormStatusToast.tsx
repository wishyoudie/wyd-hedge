import { useRouter } from "@/navigation";
import type { FormState } from "@/server/actions";
import { useEffect } from "react";
import { toast } from "sonner";

export function useFormStatusToast({
  state,
  redirect,
}: {
  state: FormState;
  redirect: boolean;
}) {
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.ok) {
        toast.success("Success", {
          description: state.message,
        });
        redirect && router.back();
      } else if (state.ok === false) {
        toast.error("Error", {
          description: state.message,
        });
      } else {
        toast(state.message);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
}
