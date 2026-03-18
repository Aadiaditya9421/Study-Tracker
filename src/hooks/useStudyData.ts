'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SectionDef } from '@/utils/tasks-data';

export function useStudyPlan() {
  return useQuery<{ sections: SectionDef[] }>({
    queryKey: ['studyPlan'],
    queryFn: async () => {
      const res = await fetch('/api/plan');
      if (!res.ok) throw new Error('Failed to fetch plan');
      return res.json();
    },
  });
}

export function useStudyProgress() {
  return useQuery<{ tasks: { id: string; completed: boolean; group: string }[] }>({
    queryKey: ['studyProgress'],
    queryFn: async () => {
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch progress');
      return res.json();
    },
  });
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (sections: SectionDef[]) => {
      const res = await fetch('/api/plan', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections }),
      });
      if (!res.ok) throw new Error('Failed to update plan');
      return sections;
    },
    // Optimistic Update
    onMutate: async (newSections) => {
      await queryClient.cancelQueries({ queryKey: ['studyPlan'] });
      const previous = queryClient.getQueryData(['studyPlan']);
      queryClient.setQueryData(['studyPlan'], { sections: newSections });
      return { previous };
    },
    onError: (err, newSections, context) => {
      queryClient.setQueryData(['studyPlan'], context?.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['studyPlan'] });
    },
  });
}

export function useUpdateProgress() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (tasksArray: any[]) => {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tasks: tasksArray }),
      });
      if (!res.ok) throw new Error('Failed to update progress');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['studyProgress'] });
    },
  });
}
