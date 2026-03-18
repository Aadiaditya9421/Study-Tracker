import { z } from 'zod';

export const TaskDefSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  _id: z.any().optional(),
}).strict();

export const TaskGroupDefSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  tasks: z.array(TaskDefSchema),
  _id: z.any().optional(),
}).strict();

export const SectionDefSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  groups: z.array(TaskGroupDefSchema),
  _id: z.any().optional(),
}).strict();

export const PlanUpdateSchema = z.object({
  sections: z.array(SectionDefSchema),
}).strict();

export const UserProgressSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.string().min(1),
      group: z.string().min(1),
      completed: z.boolean(),
      _id: z.any().optional(),
    }).strict()
  ),
}).strict();
