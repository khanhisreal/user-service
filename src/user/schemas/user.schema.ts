import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Status {
  ACTIVATED = 'Activated',
  INACTIVATED = 'Inactivated',
}

export enum AccountType {
  PREMUIM = 'Premium',
  BASIC = 'Basic',
}

export enum Roles {
  MANAGER = 'Manager',
  LEADER = 'Leader',
  EMPLOYEE = 'Employee',
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ type: String, required: true })
  fullname: string;

  @Prop({ type: String, unique: true, required: true })
  email: string;

  @Prop({ type: String, required: true, select: false })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(Status),
    default: Status.ACTIVATED,
  })
  status: Status;

  @Prop({
    type: String,
    enum: Object.values(AccountType),
    default: AccountType.BASIC,
  })
  accountType: AccountType;

  @Prop({ type: String, enum: Object.values(Roles), default: Roles.EMPLOYEE })
  role: Roles;

  @Prop({ type: String })
  phone: string;

  @Prop({ type: String })
  nationality: string;

  @Prop({ type: String })
  language: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
