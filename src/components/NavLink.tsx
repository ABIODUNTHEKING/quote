import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavLinkProps {
  icon: any;
  label: string;
  desktop: boolean;
  href?: string;
  action?: () => void;
}

export default function NavLink({ href, icon: Icon, label, desktop, action }: INavLinkProps) {
  const pageLink = usePathname();

  if (href) {
    const isLinkActive = pageLink.startsWith(href) && href != "/";
    const isChatLink = pageLink == "/new-chat" && href == "/chats";
    return (
      <Link
        href={href}
        className={` items-center inline-block  text-white gap-2 hover:bg-black hover:bg-opacity-30 p-3 rounded-2xl ${
          !desktop ? "lg:hidden" : "lg:flex"
        } ${(isLinkActive || isChatLink) && "bg-black bg-opacity-30"}
   `}
      >
        <Icon className="w-5 mx-auto lg:mx-0" />
        <p className="text-xs lg:text-base font-medium lg:font-bold">{label}</p>
      </Link>
    );
  }

  return (
    <button
      className={` items-center inline-block text-white gap-2 hover:bg-black hover:bg-opacity-30 p-3 rounded-2xl ${
        !desktop ? "lg:hidden" : "lg:flex"
      }
          `}
      onClick={action}
    >
      <Icon className="w-5 mx-auto lg:mx-0" />
      <p className="text-xs lg:text-base font-medium lg:font-bold">{label}</p>
    </button>
  );
}
