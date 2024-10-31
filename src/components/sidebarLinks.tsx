"use client";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../utils/store";

type Props = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const SidebarLinks = ({ label, href, icon: Icon }: Props) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href);
  const { isSidebarCollapsed } = useStore();

  return (
    <Link
      href={href}
      className={`${isSidebarCollapsed ? "hidden md:block" : "block"}`}
    >
      <div
        className={`group flex justify-start gap-2 px-4 py-3 w-full hover:bg-gradient-to-b hover:from-blue-100 hover:to-blue-200 dark:hover:from-slate-500 dark:hover:to-slate-700 ${
          isActive && "bg-slate-200 dark:bg-slate-700"
        }
        `}
      >
        <Icon
          className={`  group-hover:text-indigo-600 dark:group-hover:text-red-500 ${
            isActive ? "text-indigo-600 dark:text-red-500 " : "text-red-500 dark:text-yellow-500 "
          }`}
          strokeWidth={2.5}
        />
        <span className={`${isSidebarCollapsed ? "hidden" : "block"}`}>
          {label}
        </span>
      </div>
    </Link>
  );
};
export default SidebarLinks;
