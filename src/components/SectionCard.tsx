import { SectionDef, TaskDef } from '@/utils/tasks-data';
import { TaskList } from '@/components/TaskList';
import { Button } from '@/components/ui/Button';
import { PlusCircle, Trash2, Wand2, Loader2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface SectionCardProps {
  section: SectionDef;
  completedTaskIds: Set<string>;
  onToggleTask: (taskId: string, completed: boolean) => void;
  onAddGroup: () => void;
  onDeleteGroup: (groupId: string) => void;
  onAddTask: (groupId: string) => void;
  onDeleteTask: (groupId: string, taskId: string) => void;
}

export function SectionCard({ 
  section, 
  completedTaskIds, 
  onToggleTask,
  onAddGroup,
  onDeleteGroup,
  onAddTask,
  onDeleteTask
}: SectionCardProps) {

  const [generatingFor, setGeneratingFor] = useState<string | null>(null);

  const handleAIGenerate = async (groupId: string, topic: string) => {
    setGeneratingFor(groupId);
    const toastId = toast.loading('AI is crafting your curriculum...');
    try {
      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic })
      });
      if (!res.ok) throw new Error();
      toast.success('Curriculum Generated! (Simulated)', { id: toastId });
    } catch(e) {
      toast.error('AI Generation failed', { id: toastId });
    } finally {
      setGeneratingFor(null);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden group">
      <div className="bg-indigo-600 dark:bg-indigo-900/50 px-6 py-5 flex justify-between items-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <h2 className="text-xl md:text-2xl font-bold text-white relative z-10">{section.title}</h2>
        <Button 
          variant="secondary" 
          size="sm" 
          onClick={onAddGroup}
          className="relative z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 hover:bg-white/30 text-white border-0"
        >
          <PlusCircle className="w-4 h-4" /> Add Subject
        </Button>
      </div>

      <div className="p-6 md:p-8 space-y-10">
        {section.groups.length === 0 && (
           <p className="text-slate-400 text-center">No subjects in this section.</p>
        )}
        {section.groups.map(group => (
          <div key={group.id} className="group/subject relative p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="mb-5 pb-2 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{group.title}</h3>
                {group.subtitle && <p className="text-slate-500 text-sm mt-1">{group.subtitle}</p>}
              </div>
              <div className="flex gap-2">
                 <button 
                  onClick={() => handleAIGenerate(group.id, group.title)}
                  disabled={generatingFor === group.id}
                  className="p-2 text-purple-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 rounded-lg transition-all opacity-0 group-hover/subject:opacity-100 disabled:opacity-50"
                  title="Generate AI Tasks"
                 >
                  {generatingFor === group.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wand2 className="w-4 h-4" />}
                 </button>
                 <button 
                  onClick={() => onAddTask(group.id)}
                  className="p-2 text-indigo-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-all opacity-0 group-hover/subject:opacity-100"
                  title="Add Single Task"
                 >
                  <PlusCircle className="w-4 h-4" />
                 </button>
                 <button 
                  onClick={() => onDeleteGroup(group.id)}
                  className="p-2 text-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all opacity-0 group-hover/subject:opacity-100"
                  title="Delete Subject"
                 >
                  <Trash2 className="w-4 h-4" />
                 </button>
              </div>
            </div>
            {group.tasks.length > 0 ? (
               <TaskList 
                 tasks={group.tasks} 
                 completedTaskIds={completedTaskIds} 
                 onToggleTask={onToggleTask}
                 onDeleteTask={(taskId) => onDeleteTask(group.id, taskId)}
               />
            ) : (
               <p className="text-sm text-slate-400 italic px-2">No tasks defined. Click + to add one manually, or ✨ to use AI.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
