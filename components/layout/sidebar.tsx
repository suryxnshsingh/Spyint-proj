'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  LayoutDashboard,
  AlertTriangle,
  Bitcoin,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const sidebarItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/',
  },
  {
    title: 'Dark Web Threats',
    icon: AlertTriangle,
    href: '/threats',
  },
  {
    title: 'Crypto Transactions',
    icon: Bitcoin,
    href: '/transactions',
  },
  {
    title: 'Suspect Profiles',
    icon: Users,
    href: '/suspects',
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        'relative flex flex-col border-r bg-card/50 transition-all duration-300',
        isCollapsed ? 'w-[60px]' : 'w-[240px]'
      )}
    >
      <div className="flex h-[60px] items-center border-b px-2">
        {!isCollapsed && (
          <span className="text-lg font-semibold">Threat Intel</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
      <ScrollArea className="flex-1 pt-2">
        <div className="space-y-1 px-1">
          {sidebarItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={pathname === item.href ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start hover:bg-muted transition-colors',
                  isCollapsed && 'justify-center'
                )}
              >
                <item.icon className={cn('transition-all', isCollapsed ? 'h-4 w-4' : 'h-5 w-5')} />
                {!isCollapsed && (
                  <span className="ml-2 text-sm font-medium">{item.title}</span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}