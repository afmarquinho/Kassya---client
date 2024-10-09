"use client";
import {
  CircleDollarSign,
  CircleUserRound,
  ClipboardPen,
  ShoppingBag,
  UserRoundCog,
  Wrench,
  X,
} from "lucide-react";
import SidebarLinks from "./sidebarLinks";
import Image from "next/image";
import logo from "@/public/images/logo.png";
import { useStore } from "../store";

const Sidebar = () => {
  const { isSidebarCollapsed, setSidebarCollapsed } = useStore();

  return (
    <div
      className={`bg-white dark:bg-slate-800 fixed md:static h-full z-10 
    ${isSidebarCollapsed ? "w-0 md:w-14" : "w-64"}
    `}
    >
      <div className={`flex items-center justify-between p-3`}>
        {/* DIV TO WRAP LOGO AND NAME */}
        <div className={`flex justify-start items-center`}>
          <div
            className={`bg-white p-1 ${isSidebarCollapsed ? "hidden md:block" : "block"}`}
          >
            <div className={`w-6 h-7 relative`}>
              <Image src={logo} alt="Kassya" fill className={``}/>
            </div>
          </div>
          <p
            className={`font-bold text-2xl text-red-500 ${
              isSidebarCollapsed ? "hidden" : "block"
            }`}
          >
            Kassya
          </p>
        </div>

        <button
          onClick={setSidebarCollapsed}
          className={`hover:bg-slate-200 dark:hover:bg-slate-800 p-2 rounded-full  ${
              isSidebarCollapsed ? "hidden" : "block md:hidden"
            }`}
        >
          <X className={`text-red-500 dark:text-yellow-500}`} />
        </button>
      </div>

      <SidebarLinks
        label="Dashboard"
        href="/home/dashboard"
        icon={ClipboardPen}
      />
      <SidebarLinks label="Sales" href="/home/sales" icon={CircleDollarSign} />
      <SidebarLinks
        label="Purchase Order"
        href="/home/purchase"
        icon={ShoppingBag}
      />
      <SidebarLinks
        label="Manage Users"
        href="/home/users"
        icon={UserRoundCog}
      />
      <SidebarLinks label="Masters" href="/home/masters" icon={ShoppingBag} />
      <SidebarLinks label="Reports" href="/home/masters" icon={UserRoundCog} />
      <SidebarLinks label="Warranty" href="/home/warranty" icon={Wrench} />
      <SidebarLinks
        label="My Profile"
        href="/home/profile"
        icon={CircleUserRound}
      />
    </div>
  );
};
export default Sidebar;