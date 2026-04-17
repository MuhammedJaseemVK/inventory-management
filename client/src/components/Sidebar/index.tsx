"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/app/state";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center py-4 ${isCollapsed ? "justify-center" : "justtify-start px-4"} hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${isActive ? "bg-blue-200 text-white dark:bg-blue-700" : ""}
        }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        <span
          className={`${isCollapsed ? "hidden" : "block"} font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { isSidebarCollapsed, isDarkMode } = useAppSelector(
    (state) => state.global,
  );
  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = `fixed flex flex-col ${isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"} ${isDarkMode ? "bg-black" : "bg-white"} transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassNames}>
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${isSidebarCollapsed ? "px-5" : "px-8"}`}
      >
        <div>logo</div>
        <h1
          className={`${isSidebarCollapsed ? "hidden" : "block"} font-extrabold text-2xl`}
        >
          MJSTOCK
        </h1>
        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={toggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-grow mt-8">
        <SidebarLink
          href="/dashboard"
          label="Dashboard"
          icon={Layout}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/inventory"
          label="inventory"
          icon={Archive}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/products"
          label="Products"
          icon={Clipboard}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/users"
          label="Users"
          icon={Layout}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/settings"
          label="Settings"
          icon={SlidersHorizontal}
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/expenses"
          label="Expenses"
          icon={CircleDollarSign}
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2026 MJstock</p>
      </div>
    </div>
  );
};

export default Sidebar;
