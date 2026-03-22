import { TaskDef } from '@/utils/tasks-data';
import { cn } from '@/utils/cn';
import { X } from 'lucide-react';

interface TaskListProps {
  tasks: TaskDef[];
  completedTaskIds: Set<string>;
  onToggleTask: (taskId: string, completed: boolean) => void;
  onDeleteTask: (taskId: string) => void;
  className?: string;
}

export function TaskList({
  tasks,
  completedTaskIds,
  onToggleTask,
  onDeleteTask,
  className,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="text-sm text-gray-400 dark:text-slate-500 italic px-2">No tasks added yet.</p>;
  }

  return (
    <ul className={cn('space-y-3', className)}>
      {tasks.map((task) => {
        const isCompleted = completedTaskIds.has(task.id);

        return (
          <li
            key={task.id}
            className={cn(
              'flex items-start justify-between group rounded-lg p-2 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800',
              isCompleted && 'bg-indigo-50/50 dark:bg-indigo-900/20 hover:bg-indigo-50 dark:hover:bg-indigo-900/30'
            )}
          >
            <label className="flex items-start cursor-pointer w-full relative pr-4">
              <div className="flex items-center h-6">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer disabled:opacity-50 transition-all accent-indigo-600"
                  checked={isCompleted}
                  onChange={(e) => onToggleTask(task.id, e.target.checked)}
                />
              </div>
              <div className="ml-3 text-sm flex-1">
                <span
                  className={cn(
                    'text-gray-700 dark:text-slate-300 font-medium select-none transition-colors transition-opacity duration-200',
                    isCompleted && 'text-gray-400 dark:text-slate-500 line-through opacity-70'
                  )}
                >
                  {task.title}
                </span>
              </div>
            </label>
            <button
               onClick={(e) => { e.preventDefault(); onDeleteTask(task.id); }}
               className="text-gray-400 dark:text-slate-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity p-1"
               title="Remove task"
            >
              <X className="w-4 h-4" />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
