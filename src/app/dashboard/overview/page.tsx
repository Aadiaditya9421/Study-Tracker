'use client';

import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { BookOpen, CheckCircle, Calendar, Target, Loader2 } from 'lucide-react';
import { useStudyPlan, useStudyProgress } from '@/hooks/useStudyData';
import { useSession } from 'next-auth/react';

export default function OverviewPage() {
  const { data: session } = useSession();
  const { data: planData, isLoading: planLoading } = useStudyPlan();
  const { data: progressData, isLoading: progressLoading } = useStudyProgress();

  const sections = planData?.sections || [];
  const completedIds = useMemo(() => {
     const set = new Set<string>();
     if (progressData?.tasks) {
        progressData.tasks.forEach(t => { if (t.completed) set.add(t.id); });
     }
     return set;
  }, [progressData]);

  const stats = useMemo(() => {
     let total = 0; let completed = 0;
     sections.forEach(s => s.groups.forEach(g => {
        total += g.tasks.length;
        completed += g.tasks.filter(t => completedIds.has(t.id)).length;
     }));
     return { total, completed, remaining: total - completed };
  }, [sections, completedIds]);

  const chartData = [
    { name: 'Completed', value: stats.completed, color: '#10b981' }, 
    { name: 'Remaining', value: stats.remaining, color: '#6366f1' }, 
  ];

  if (planLoading || progressLoading || !session) return (
     <div className="flex flex-col h-full items-center justify-center text-slate-400">
       <Loader2 className="w-10 h-10 animate-spin mb-4" />
       Loading overview cache...
     </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
       <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Overview</h1>
          <p className="text-slate-500 dark:text-slate-400">Your high-level learning analytics and velocity.</p>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
             <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
               <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
             </div>
             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Tasks</p>
             <h3 className="text-3xl font-bold mt-1">{stats.total}</h3>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
             <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/50 flex items-center justify-center mb-4">
               <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
             </div>
             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Tasks Completed</p>
             <h3 className="text-3xl font-bold mt-1">{stats.completed}</h3>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
             <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/50 flex items-center justify-center mb-4">
               <BookOpen className="w-5 h-5 text-amber-600 dark:text-amber-400" />
             </div>
             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Subjects</p>
             <h3 className="text-3xl font-bold mt-1">{sections.reduce((acc, s) => acc + s.groups.length, 0)}</h3>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
             <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/50 flex items-center justify-center mb-4">
               <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
             </div>
             <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Completion %</p>
             <h3 className="text-3xl font-bold mt-1">{stats.total === 0 ? 0 : Math.round((stats.completed/stats.total)*100)}%</h3>
          </div>
       </div>

       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col items-center">
             <h3 className="text-lg font-bold w-full mb-6">Progress Distribution</h3>
             {stats.total > 0 ? (
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                         contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                         itemStyle={{ fontWeight: 'bold' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
               </div>
             ) : (
                <div className="h-64 flex items-center justify-center text-slate-400">No tasks defined yet.</div>
             )}
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
             <h3 className="text-lg font-bold mb-6">Predictive Velocity</h3>
             <div className="space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                   <p className="font-semibold text-sm text-slate-500 dark:text-slate-400">Estimated Completion Date</p>
                   <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">December 14, 2026</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"></div>
                   <p className="font-semibold text-sm text-slate-500 dark:text-slate-400">7-Day Study Streak</p>
                   <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">Active 🔥</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl relative overflow-hidden">
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                   <p className="font-semibold text-sm text-slate-500 dark:text-slate-400">Task Velocity</p>
                   <p className="text-2xl font-bold mt-1 text-slate-900 dark:text-white">4.2 Tasks / Day</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
