// import { User } from "../entities/user.entity";
import {  IsNotEmpty,IsBoolean } from 'class-validator';


export class CreateUserDto {
    @IsNotEmpty({message:"Name cant be empty"})
    name:string;

    @IsNotEmpty({message:"IsChecked cant be empty"})
    @IsBoolean()
    isChecked:boolean;

    @IsNotEmpty({message:"IsDeleted cant be empty"})
    @IsBoolean()
    isDeleted:boolean;
}
