import { useEffect } from "react";
import { IUseDeactivateOnTouchOutsideProps } from "../utilis/interfaces";

const useDeactivateMenuOnTouchOutside = ({
  menuRef,
  closeMenu,
}: IUseDeactivateOnTouchOutsideProps) => {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef, closeMenu]);
};

export default useDeactivateMenuOnTouchOutside;
