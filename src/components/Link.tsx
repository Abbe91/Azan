import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { DivideIcon as LucideIcon } from "lucide-react";

interface LinkProps {
  href: string;
  icon: typeof LucideIcon;
  children: React.ReactNode;
  active?: boolean;
}

export function Link({ href, icon: Icon, children, active }: LinkProps) {
  return (
    <RouterLink
      to={href}
      className={`flex items-center px-2.5 py-1.5 rounded-md text-sm font-medium transition-colors w-full
        ${
          active
            ? "bg-emerald-700 text-white"
            : "text-emerald-100 hover:bg-emerald-700 hover:text-white"
        }`}
    >
      <Icon className="h-4 w-4 mr-1.5" />
      {children}
    </RouterLink>
  );
}
