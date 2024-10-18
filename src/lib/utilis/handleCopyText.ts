import toast from "react-hot-toast";


export const handleCopyText = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Text copied to clipboard"))
      .catch((err) => toast.error("Failed to copy text", err));
  };
