import { Card } from '@/components/ui/Card';
import { BookOpen, Target } from 'lucide-react';

interface DashboardProps {
  coursesCompleted: number;
  coursesTotal: number;
  placementCompleted: number;
  placementTotal: number;
}

export function Dashboard({
  coursesCompleted,
  coursesTotal,
  placementCompleted,
  placementTotal,
}: DashboardProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <Card className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-indigo-50 to-white text-center border-indigo-100">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mb-3">
          <BookOpen size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">COURSES</h3>
        <p className="text-2xl font-black text-indigo-600">
          {coursesCompleted} <span className="text-base font-medium text-gray-500">/ {coursesTotal} tasks done</span>
        </p>
      </Card>

      <Card className="flex-1 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-50 to-white text-center border-emerald-100">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3">
          <Target size={24} />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">PLACEMENT PREP</h3>
        <p className="text-2xl font-black text-emerald-600">
          {placementCompleted} <span className="text-base font-medium text-gray-500">/ {placementTotal} done</span>
        </p>
      </Card>
    </div>
  );
}
