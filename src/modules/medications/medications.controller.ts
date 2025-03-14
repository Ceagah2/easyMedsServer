import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMedicationDto } from 'src/dtos/create-medication.dto';

import { MedicationsService } from './medications.service';

@ApiTags('Medications')
@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo medicamento' })
  @ApiBody({
    description: 'Dados necessários para criar um usuário',
    type: CreateMedicationDto,
    examples: {
      exemplo1: {
        summary: 'Medicamento comum',
        value: {
          name: 'Dipirona monoidratada',
          dosage: '500mg',
          startDate: '2025-03-14T12:00:00Z',
          frequency: 3,
          frequencyUnit: 'DAILY',
          isControlled: false,
          prescriptionExpiration: null,
          userId: '550e8400-e29b-41d4-a716-446655440000',
        },
      },
      exemplo2: {
        summary: 'Medicamento controlado',
        value: {
          name: 'Cloridrato de Tramadol',
          dosage: '100mg',
          startDate: '2025-03-14T12:00:00Z',
          frequency: 3,
          frequencyUnit: 'DAILY',
          isControlled: true,
          prescriptionExpiration: '2025-04-14T12:00:00Z',
          userId: '550e8400-e29b-41d4-a716-446655440000',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  async create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um medicamento pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do medicamento',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({ status: 200, description: 'Medicamento encontrado' })
  @ApiResponse({ status: 404, description: 'Medicamento não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(id);
  }
}
