import { cn } from '@/utils/cn';

interface ProgressBarProps {
  progress: number; // 0 to 100
  label?: string;
  className?: string;
}

export function ProgressBar({ progress, label, className }: ProgressBarProps) {
  // Ensure progress is between 0 and 100
  const clampledProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn('w-full mt-4', className)}>
      <div className="h-3 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden border border-gray-200 dark:border-slate-700 shadow-inner">
        <div
          className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${clampledProgress}%` }}
        />
      </div>
      {label && (
        <div className="mt-2 text-right text-xs font-semibold text-gray-500 dark:text-slate-400">
          {label}
        </div>
      )}
    </div>
  );
}
