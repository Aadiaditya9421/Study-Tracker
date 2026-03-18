import mongoose, { Schema, Document } from 'mongoose';

export interface ITask {
  id: string;
  group: string;
  completed: boolean;
}

export interface IUserProgress extends Document {
  userId: string;
  tasks: ITask[];
}

const TaskSchema = new Schema<ITask>({
  id: { type: String, required: true },
  group: { type: String, required: true },
  completed: { type: Boolean, required: true, default: false },
});

const UserProgressSchema = new Schema<IUserProgress>({
  userId: { type: String, required: true, unique: true },
  tasks: [TaskSchema],
});

// Avoid OverwriteModelError in Next.js development environment
const UserProgress =
  mongoose.models.UserProgress ||
  mongoose.model<IUserProgress>('UserProgress', UserProgressSchema);

export default UserProgress;
