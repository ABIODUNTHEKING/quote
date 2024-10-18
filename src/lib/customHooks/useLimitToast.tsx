import { useEffect } from "react";
import toast, { useToasterStore } from "react-hot-toast";

function useLimitToast(TOAST_LIMIT: number) {
  const { toasts } = useToasterStore();
  useEffect(() => {
    toasts
      .filter((t) => t.visible)
      .filter((_, i) => i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [TOAST_LIMIT, toasts]);
}

export default useLimitToast;
