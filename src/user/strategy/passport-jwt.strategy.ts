
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { userEntity } from 'src/entities/user.entity';
import { PayloadInterface } from '../interface/payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService,
    @InjectRepository(userEntity)
    private adminRepository: Repository<userEntity>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'nourSecretKey',
    });
  }

  async validate(payload: PayloadInterface) {         
    console.log(payload);
    const user = await this.adminRepository.findOne({username: payload.username});
    if (user) {
      delete user.salt;
      delete user.password;
      return user;
    } else {
      
      throw new UnauthorizedException();
    }
     
 
   
  }
}