import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export enum ActivityType {
  USER_MANAGEMENT = 'User Management',
  TASK_MANAGEMENT = 'Task Management',
  PROJECT_MANAGEMENT = 'Project Management',
}

@Schema({
  timestamps: true,
})
export class ActivityLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: String, required: true })
  action: string;

  @Prop({ type: String, enum: Object.values(ActivityType), required: true })
  type: ActivityType;

  @Prop({ type: Date, default: Date.now })
  time: Date;
}

export const ActivityLogSchema = SchemaFactory.createForClass(ActivityLog);
