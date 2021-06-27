import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AddPatientDto } from 'src/DTO/patient/addPatient';
import { updatePatientDto } from 'src/DTO/patient/updatePatient';
import { patientEntity } from 'src/entities/patient.entity';
import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { PatientService } from './patient.service';

@Controller('patient')
export class PatientController {


    constructor(private patientService: PatientService) {
    }
  
    
    @Get()
    @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<patientEntity[]> {
       return this.patientService.getPatient(user);
    }


    @Get('medecin')
    @UseGuards(JwtAuthGuard)
     getParMedecin( 
       @User() user
      ): Promise<patientEntity[]> {
    return this.patientService.getPatientByMedcin(user);
     }


     @Get('infirmier')
     @UseGuards(JwtAuthGuard)
      getParInfirmier( 
        @User() user
       ): Promise<patientEntity[]> {
     return this.patientService.getPatientByInfirmier(user);
      }



    @Get(':id')
    @UseGuards(JwtAuthGuard)
    async getPatientById(
      @Param('id') id: string, @User() user
    ): Promise<patientEntity>{
      const patient = await this.patientService.getById(id,user);

      if (patient)
         return patient;
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    addPatient(
      @Body() patientData:AddPatientDto , @User() user
    ){
      return this.patientService.addPatient(patientData, user);
    }


    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updatePatient(
    @Param('id') id : string,
    @Body() newPatient: updatePatientDto , @User() user
      ): Promise<patientEntity> {
      return this.patientService.putPatient(id, newPatient,user);
    }


    @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async SoftdeletePatient(
    @Param('id') id: string,
    @User() user
  ) {
    return this.patientService.softDeletePatient(id, user);
  }

  @Get('recover/:id')
  @UseGuards(JwtAuthGuard)
  async restorePatient(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.patientService.restorePatient(id, user);
  }
}
