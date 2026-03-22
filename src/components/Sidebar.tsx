'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, Settings, LogOut, Globe } from 'lucide-react';
import { cn } from '@/utils/cn';
import { signOut } from 'next-auth/react';
import { ThemeToggle } from './ThemeToggle';

export function Sidebar({ user }: { user?: any }) {
  const pathname = usePathname();

  const links = [
    { name: 'Overview', href: '/dashboard/overview', icon: LayoutDashboard },
    { name: 'My Curriculum', href: '/dashboard', icon: BookOpen },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 shadow-xl border-r border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="p-6">
         <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center shadow-md">
               <Globe className="text-white w-5 h-5"/>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Study<span className="text-indigo-500">Tracker</span></span>
         </Link>

         <nav className="space-y-2">
           {links.map((link) => {
             const Icon = link.icon;
             const isActive = pathname === link.href;
             return (
               <Link
                 key={link.name}
                 href={link.href}
                 className={cn(
                   'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group',
                   isActive 
                     ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400' 
                     : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                 )}
               >
                 <Icon className={cn("w-5 h-5 transition-transform group-hover:scale-110", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500")} />
                 {link.name}
               </Link>
             )
           })}
         </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
           <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Theme</span>
           <ThemeToggle />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
             <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center flex-shrink-0">
                <span className="text-indigo-700 dark:text-indigo-300 font-bold text-sm">
                   {user?.name?.[0]?.toUpperCase() || 'U'}
                </span>
             </div>
             <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-slate-900 dark:text-slate-100 truncate">{user?.name || 'User'}</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 truncate">{user?.email}</span>
             </div>
          </div>
        </div>

        <button 
           onClick={() => signOut({ callbackUrl: '/login' })}
           className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
