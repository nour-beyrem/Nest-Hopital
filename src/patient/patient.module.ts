import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { patientEntity } from 'src/entities/patient.entity';
import { UserModule } from 'src/user/user.module';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService],
  imports: [UserModule,TypeOrmModule.forFeature([patientEntity]), PassportModule.register({defaultStrategy: 'jwt'}),JwtModule.register({
secret: 'nourSecretKey',
signOptions: {
  expiresIn: 3600
}
 })]
})
export class PatientModule {}
