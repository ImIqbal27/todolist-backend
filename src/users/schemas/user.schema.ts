import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({required:true})
  name: string;

  @Prop({required:true,default:false})
  isChecked: boolean;

  @Prop({required:true,default:false})
  isDeleted: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);