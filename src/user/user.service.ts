import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddUserDto } from 'src/DTO/user/addUser';
import { LoginCredentialsDto } from 'src/DTO/user/loginUser';
import { updateUserDto } from 'src/DTO/user/updateUser';
import { userEntity } from 'src/entities/user.entity';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {


    constructor(
        @InjectRepository(userEntity)
        private userRepository: Repository<userEntity>,
        private jwtService: JwtService
      )
       {}



       async getUsers(user): Promise<userEntity[]>
       {
        if (user.role === UserRoleEnum.CHEFSERVICE )
            return await this.userRepository.find();
        else 
            throw new UnauthorizedException();
         
       }
   
   
       async getById(username:string, user): Promise<userEntity>
       {
         const personnel =  await this.userRepository.findOne(username);
         
   
         if (!personnel)
           { 
             throw new NotFoundException(`user d'id ${username} n'existe pas`);
           }
           
         if (user.role === UserRoleEnum.CHEFSERVICE ||user.role === UserRoleEnum.RECEPTION || personnel.username === user.username)
            return personnel;
   
         else 
         throw new UnauthorizedException();
         
       }
   
    
        
       async getByRole(role:string,user): Promise<userEntity[]>
       {
            
        if (user.role === UserRoleEnum.RECEPTION ||user.role === UserRoleEnum.CHEFSERVICE || user.role === role)
           return await this.userRepository.find({role});
   
        else 
           throw new UnauthorizedException();
       }
   

       async addUser(userData: AddUserDto, user1) : Promise<Partial<userEntity>>{
   
        if (user1.role === UserRoleEnum.CHEFSERVICE ) {
           const user = this.userRepository.create({
             ...userData
           });
           user.salt = await bcrypt.genSalt();
           user.password = await bcrypt.hash(user.password, user.salt);
           try {
             await this.userRepository.save(user);
           } catch (e) {
             throw new ConflictException(`le email ou le username doit être unique`);
           }
           return {
             username: user.username,
             email: user.email,
             role: user.role
           };
         }
   
        else 
         throw new UnauthorizedException();
         
         
         
   
         
         
         
         
         
         
         
         
         
         
         
         
         
       }
   
     async deleteUser(username: string, user): Promise<unknown> {
   
       if (user.role === UserRoleEnum.CHEFSERVICE){
         const deletedUser = await this.userRepository.delete(username);
         if(! deletedUser) {
           throw new NotFoundException(`user d'id ${username} n'existe pas`);
         } else {
           return deletedUser;
         }
       }
       else 
         throw new UnauthorizedException();
          
       
     }
       
       
     async putUser(username: string, newUser: updateUserDto, user): Promise<userEntity> {
       const updatedUser = await this.userRepository.preload({
         username,
         ...newUser
     });
       console.log('Valeur de retour de preload : ', updatedUser);
     if (! updatedUser) {
       throw new NotFoundException(`user d'id ${username} n'existe pas`);
     } 
     if (user.role === UserRoleEnum.CHEFSERVICE || updatedUser.username === user.username){
       return await this.userRepository.save(updatedUser);
     }
     else 
       throw new UnauthorizedException();
        
     
     }
   
   
   
   
     async login(credentials: LoginCredentialsDto)  {
   
       
       const {username, password} = credentials;
       const user = await this.userRepository.createQueryBuilder("user")
         .where("user.username = :username or user.email = :username",
           {username}
           )
         .getOne(); 
       if (!user)
         throw new NotFoundException('username ou password erronée');
      
       const hashedPassword = await bcrypt.hash(password, user.salt);
       if (hashedPassword === user.password) {
         const payload = {
           username: user.username,
           email: user.email,
           role: user.role
         };
         const jwt = await this.jwtService.sign(payload);
         
         return {
           "access_token" : jwt,
           "user": user
         };
       } else {
         
         throw new NotFoundException('username ou password erronée');
       }
     }
   
   
       
       
       
     
       
       
       
     
     
     
   
   
   
       
       
       
     
       
       
       
     
     
     
     
     
     
     
     
     
     
     
     
     
     
   
     
     
     
   
     
}
