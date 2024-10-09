"use client";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../store";

type Props = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const SidebarLinks = ({ label, href, icon: Icon }: Props) => {
  const pathname = usePathname();
  const isActive =
    pathname === href ||
    (pathname === "/home" && href === "/dashboard");
    const { isSidebarCollapsed } = useStore();

  return (
    <Link href={href} className={`${isSidebarCollapsed ? "hidden md:block" : "block"}`}>
      <div
        className={`flex justify-start gap-2 px-4 py-3 w-full hover:bg-blue-200 dark:hover:bg-slate-700 ${
          isActive && "bg-slate-100 dark:bg-slate-700"
        }
        `}
      >
        <Icon  className={`text-red-500 dark:text-yellow-500`}
          strokeWidth={2.5}/>
        <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>{label}</span>
      </div>
    </Link>
  );
};
export default SidebarLinks;
