import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface LinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  active?: boolean;
}

export function Link({ href, icon: Icon, children, active }: LinkProps) {
  return (
    <RouterLink
      to={href}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors w-full
        ${active 
          ? 'bg-emerald-700 text-white' 
          : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'
        }`}
    >
      <Icon className="h-5 w-5 mr-2" />
      {children}
    </RouterLink>
  );
}