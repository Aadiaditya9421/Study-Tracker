import mongoose, { Schema, Document } from 'mongoose';
import { SectionDef, TaskGroupDef, TaskDef } from '@/utils/tasks-data';

export interface IStudyPlan extends Document {
  userId: string;
  sections: SectionDef[];
}

const TaskDefSchema = new Schema<TaskDef>({
  id: { type: String, required: true },
  title: { type: String, required: true },
});

const TaskGroupDefSchema = new Schema<TaskGroupDef>({
  id: { type: String, required: true },
  title: { type: String, default: "" },
  subtitle: { type: String },
  tasks: [TaskDefSchema],
});

const SectionDefSchema = new Schema<SectionDef>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  groups: [TaskGroupDefSchema],
});

const StudyPlanSchema = new Schema<IStudyPlan>({
  userId: { type: String, required: true, unique: true },
  sections: [SectionDefSchema],
});

const StudyPlan =
  mongoose.models.StudyPlan ||
  mongoose.model<IStudyPlan>('StudyPlan', StudyPlanSchema);

export default StudyPlan;
