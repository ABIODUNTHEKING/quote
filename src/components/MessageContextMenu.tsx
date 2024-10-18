"use client";
import useDeactivateMenuOnTouchOutside from "@/lib/customHooks/useDeactivateOnTouchOutsideMenu";
import {
  MESSAGE_CONTEXT_MENU_TIME_INTERVAL_IN_MINUTES_FOR_SPECIAL_OPERATIONS,
  MENU_LABELS,
} from "@/lib/data/constantValues.data";
import { IMessageContextMenuProps } from "@/lib/utilis/interfaces";
import { useMemo, useRef } from "react";

export default function MessageContextMenu({
  position,
  items,
  setIsContextMenuVisible,
  messageTime,
  isSender,
}: IMessageContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useDeactivateMenuOnTouchOutside({
    menuRef,
    closeMenu: () => setIsContextMenuVisible(false),
  });

  const isTimeIntervalToDeleteMessageAllowed =
    new Date().getTime() - new Date(messageTime).getTime() <
    MESSAGE_CONTEXT_MENU_TIME_INTERVAL_IN_MINUTES_FOR_SPECIAL_OPERATIONS *
      60 *
      1000;

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (
        !isSender &&
        item.label !== MENU_LABELS[0] &&
        item.label != MENU_LABELS[1]
      ) {
        return false;
      }

      if (
        item.label === MENU_LABELS[2] &&
        !isTimeIntervalToDeleteMessageAllowed
      ) {
        return false;
      }

      return true;
    });
  }, [items, isSender, isTimeIntervalToDeleteMessageAllowed]);

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-labelledby="contextmenu-label"
      className="absolute z-40 text-black w-40 bg-white border border-solid shadow-lg border-[#cc] p-1 text-sm my-1"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
    >
      {filteredItems.map((item, index) => (
        <button
          key={index}
          role="menuitem"
          tabIndex={-1}
          onClick={item.action}
          className="block p-2 text-left w-full hover:bg-black/10 text-xs"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
