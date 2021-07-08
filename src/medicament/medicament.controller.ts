import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';
import { AddMedicamenttDto } from 'src/DTO/medicament/addMedicament';
import { updateMedicamentDto } from 'src/DTO/medicament/updateMedicament';
import { medicamentEntity } from 'src/entities/medicament.entity';
//import { JwtAuthGuard } from 'src/user/guards/jwt-auth.guard';
import { MedicamentService } from './medicament.service';

@Controller('medicament')
export class MedicamentController {

    constructor(private medicamentService: MedicamentService) {
    }
  
    
    @Get()
   // @UseGuards(JwtAuthGuard)
    getAll( 
      @User() user
    ): Promise<medicamentEntity[]> {
       return this.medicamentService.getMedicament(user);
    }

 



    @Get(':id')
   // @UseGuards(JwtAuthGuard)
    async getMedicamentById(
      @Param('id') id: string, @User() user
    ): Promise<medicamentEntity>{
      const medicament = await this.medicamentService.getById(id,user);

      if (medicament)
         return medicament;
    }


    @Post()
   // @UseGuards(JwtAuthGuard)
    addMedicament(
      @Body() medicammentData:AddMedicamenttDto , @User() user
    ){
      return this.medicamentService.addMedicament(medicammentData, user);
    }


    @Put(':id')
    //@UseGuards(JwtAuthGuard)
    updateMedicament(
    @Param('id') id : string,
    @Body() newMedicament: updateMedicamentDto , @User() user
      ): Promise<medicamentEntity> {
      return this.medicamentService.putMedicament(id, newMedicament,user);
    }


    @Delete(':id')
 // @UseGuards(JwtAuthGuard)
  async SoftdeleteMedicament(
    @Param('id') id: string,
    @User() user
  ) {
    return this.medicamentService.softDeleteMedicament(id, user);
  }

  @Get('recover/:id')
 // @UseGuards(JwtAuthGuard)
  async restoreMedicament(
    @Param('id') id: string,
    @User() user
  ) {
    return await this.medicamentService.restoreMedicament(id, user);
  }




}
