import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { medicamentEntity } from 'src/entities/medicament.entity';
import { UserModule } from 'src/user/user.module';
import { MedicamentController } from './medicament.controller';
import { MedicamentService } from './medicament.service';

@Module({
  controllers: [MedicamentController],
  providers: [MedicamentService],
  exports: [MedicamentService],
  imports: [UserModule,TypeOrmModule.forFeature([medicamentEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
secret: 'nourSecretKey',
signOptions: {
  expiresIn: 3600
}
 })]
})
export class MedicamentModule {}
