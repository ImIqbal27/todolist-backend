import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { User ,UserDocument} from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { NotFoundException } from '@nestjs/common/exceptions';



@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto):Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async updateUser(userId: string, updateStudentDto: UpdateUserDto): Promise<UserDocument> {
    const existingUser = await this.userModel.findByIdAndUpdate(userId, updateStudentDto, { new: true });
   if (!existingUser) {
     throw new NotFoundException(`#${userId} not found`);
   }
   return existingUser;
}
async getAllUsers(): Promise<UserDocument[]> {
    const userData = await this.userModel.find({isDeleted:false});
    return userData;
}
async getUser(userId: string): Promise<UserDocument> {
   const existingUser = await this.userModel.findOne({_id:userId}).exec();
   if (!existingUser) {
    throw new NotFoundException(`Task #${userId} not found`);
   }
   return existingUser;
}
async deleteUser(userId: string): Promise<UserDocument> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId);
   if (!deletedUser) {
     throw new NotFoundException(`Student #${userId} not found`);
   }
   return deletedUser;
}
}









// @Injectable()
// export class UsersService {
//   create(createUserDto: CreateUserDto) {
//     return 'This action adds a new user';
//   }

//   findAll() {
//     return `This action returns all users from rumon`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} user`;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     return `This action updates a #${id} user`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} user`;
//   }
// }
