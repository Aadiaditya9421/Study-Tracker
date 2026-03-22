'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import toast from 'react-hot-toast';
import { SectionDef } from '@/utils/tasks-data';
import { SectionCard } from '@/components/SectionCard';
import { Dashboard } from '@/components/Dashboard';
import { Button } from '@/components/ui/Button';
import { Toaster } from '@/components/Toaster';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { useStudyPlan, useStudyProgress, useUpdatePlan, useUpdateProgress } from '@/hooks/useStudyData';

export function StudyTracker() {
  const { data: planData, isLoading: planLoading } = useStudyPlan();
  const { data: progressData, isLoading: progressLoading, refetch: refetchProgress } = useStudyProgress();
  const { mutateAsync: updatePlanAsync, isPending: savingPlan } = useUpdatePlan();
  const { mutateAsync: updateProgressAsync, isPending: savingProgress } = useUpdateProgress();

  const [completedTaskIds, setCompletedTaskIds] = useState<Set<string>>(new Set());
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const sections = planData?.sections || [];

  // Sync initial progress to local state for instant optimistic UI
  useEffect(() => {
    if (progressData?.tasks) {
      const completedSet = new Set<string>();
      progressData.tasks.forEach(t => { if (t.completed) completedSet.add(t.id); });
      setCompletedTaskIds(completedSet);
    }
  }, [progressData]);

  const saveProgressToDb = useCallback(async (newCompletedSet: Set<string>, currSections: SectionDef[]) => {
    const tasksArray: any[] = [];
    currSections.forEach(section => {
      section.groups.forEach(group => {
        group.tasks.forEach(task => {
          tasksArray.push({
            id: task.id,
            group: group.id,
            completed: newCompletedSet.has(task.id)
          });
        });
      });
    });

    try {
      await updateProgressAsync(tasksArray);
    } catch (error) {
       toast.error("Failed to sync progress");
    }
  }, [updateProgressAsync]);

  const updatePlan = async (newSections: SectionDef[]) => {
    try {
      await updatePlanAsync(newSections);
    } catch (e) {
      toast.error('Failed to save study plan changes');
    }
  };

  const handleToggleTask = useCallback((taskId: string, completed: boolean) => {
    setCompletedTaskIds(prev => {
      const next = new Set(prev);
      if (completed) next.add(taskId);
      else next.delete(taskId);
      
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      
      debounceTimerRef.current = setTimeout(() => saveProgressToDb(next, sections), 1000);
      return next;
    });
  }, [saveProgressToDb, sections]);

  const handleReset = async () => {
    if (confirm("Are you sure you want to reset all your progress?")) {
      setCompletedTaskIds(new Set());
      const toastId = toast.loading('Resetting progress...');
      try {
        await fetch('/api/reset', { method: 'POST' });
        await refetchProgress();
        toast.success('All progress has been reset', { id: toastId });
      } catch (error) {
        toast.error('Failed to clear progress', { id: toastId });
      }
    }
  };

  // ==================== SECTION CRUD ====================
  const handleAddSection = () => {
    const title = prompt("Enter Section Name (e.g. 'My Custom Curriculum'):");
    if (!title) return;
    const newSection: SectionDef = {
      id: `section-${Date.now()}`,
      title,
      groups: [],
    };
    updatePlan([...sections, newSection]);
    toast.success(`Section "${title}" created!`);
  };

  const handleDeleteSection = (sectionId: string) => {
    const section = sections.find(s => s.id === sectionId);
    if (!confirm(`Delete entire section "${section?.title}" and ALL its subjects/tasks?`)) return;
    updatePlan(sections.filter(s => s.id !== sectionId));
    toast.success('Section deleted');
  };

  // ==================== GROUP (SUBJECT) CRUD ====================
  const handleAddGroup = (sectionId: string) => {
    const title = prompt("Enter Subject Name:");
    if (!title) return;
    const newGroupId = `group-${Date.now()}`;
    const updated = sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, groups: [...s.groups, { id: newGroupId, title, tasks: [] }] };
      }
      return s;
    });
    updatePlan(updated);
  };

  const handleDeleteGroup = (sectionId: string, groupId: string) => {
    if (!confirm("Delete this subject and all its tasks?")) return;
    const updated = sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, groups: s.groups.filter(g => g.id !== groupId) };
      }
      return s;
    });
    updatePlan(updated);
  };

  // ==================== TASK CRUD ====================
  const handleAddTask = (sectionId: string, groupId: string) => {
    const title = prompt("Enter Task Title:");
    if (!title) return;
    const newTaskId = `task-${Date.now()}`;
    const updated = sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, groups: s.groups.map(g => {
          if (g.id === groupId) {
            return { ...g, tasks: [...g.tasks, { id: newTaskId, title }] };
          }
          return g;
        })};
      }
      return s;
    });
    updatePlan(updated);
  };

  const handleDeleteTask = (sectionId: string, groupId: string, taskId: string) => {
    const updated = sections.map(s => {
      if (s.id === sectionId) {
        return { ...s, groups: s.groups.map(g => {
          if (g.id === groupId) {
            return { ...g, tasks: g.tasks.filter(t => t.id !== taskId) };
          }
          return g;
        })};
      }
      return s;
    });
    updatePlan(updated);
  };

  const stats = useMemo(() => {
    let coursesTotal = 0; let coursesCompleted = 0;
    let placementTotal = 0; let placementCompleted = 0;

    sections.forEach((section, index) => {
      section.groups.forEach(group => {
        if (index === 0) { 
          coursesTotal += group.tasks.length;
          coursesCompleted += group.tasks.filter(t => completedTaskIds.has(t.id)).length;
        } else { 
          placementTotal += group.tasks.length;
          placementCompleted += group.tasks.filter(t => completedTaskIds.has(t.id)).length;
        }
      });
    });
    return { coursesTotal, coursesCompleted, placementTotal, placementCompleted };
  }, [sections, completedTaskIds]);

  if (planLoading || progressLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-indigo-600">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">Synchronizing Global Cache...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <Toaster />
      <header className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500 mb-3 tracking-tight">
          Your Study Tracker
        </h1>
        <p className="text-emerald-600 font-semibold mb-1">
          Customized Learning Flow
        </p>
      </header>
      
      <div className="flex justify-end mb-6">
        <div className="text-sm font-medium text-gray-400 dark:text-slate-500">
          {(savingPlan || savingProgress) ? (
             <span className="flex items-center text-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded">
               <Loader2 className="w-3 h-3 animate-spin mr-1.5" /> Background Syncing...
             </span>
          ) : (
             <span className="text-emerald-500 flex items-center bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded transition-colors fade-in">
               ✓ Sync Complete
             </span>
          )}
        </div>
      </div>

      <Dashboard 
        coursesCompleted={stats.coursesCompleted} 
        coursesTotal={stats.coursesTotal} 
        placementCompleted={stats.placementCompleted}
        placementTotal={stats.placementTotal}
      />

      <div className="space-y-8 mt-10">
        {sections.map(section => (
          <div key={section.id} className="relative">
            <SectionCard 
              section={section} 
              completedTaskIds={completedTaskIds}
              onToggleTask={handleToggleTask}
              onAddGroup={() => handleAddGroup(section.id)}
              onDeleteGroup={(groupId) => handleDeleteGroup(section.id, groupId)}
              onAddTask={(groupId) => handleAddTask(section.id, groupId)}
              onDeleteTask={(groupId, taskId) => handleDeleteTask(section.id, groupId, taskId)}
            />
            {/* Delete Section Button */}
            <button
              onClick={() => handleDeleteSection(section.id)}
              className="absolute -top-2 -right-2 z-20 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg opacity-0 hover:opacity-100 focus:opacity-100 transition-all"
              title={`Delete section "${section.title}"`}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
        {sections.length === 0 && (
          <div className="text-center p-8 bg-white dark:bg-slate-900 border border-dashed border-gray-300 dark:border-slate-700 rounded-xl text-gray-500 dark:text-slate-400">
            No sections found. Click "Add New Section" below to get started!
          </div>
        )}
      </div>

      {/* Add Section + Reset Row */}
      <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4 border-t border-gray-100 dark:border-slate-800 pt-8">
        <Button 
          variant="primary"
          size="lg" 
          onClick={handleAddSection}
          className="w-full sm:w-auto min-w-[250px] shadow-sm flex items-center justify-center gap-2 font-bold"
        >
          <PlusCircle className="w-5 h-5" /> Add New Section
        </Button>
        <Button 
          variant="danger" 
          size="lg" 
          onClick={handleReset}
          className="w-full sm:w-auto min-w-[250px] shadow-sm flex items-center justify-center gap-2 font-bold"
        >
          <span>🗑️</span> Reset Progress (Keeps Plan)
        </Button>
      </div>
    </div>
  );
}
