import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMedicationDto } from 'src/dtos/create-medication.dto';
import { MedicationsService } from './medications.service';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  async create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(id);
  }
}
