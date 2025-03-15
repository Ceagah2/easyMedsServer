import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMedicationDto } from 'src/dtos/create-medication.dto';

import { UpdateMedicationDto } from 'src/dtos/update-medication.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { MedicationsService } from './medications.service';

@ApiTags('Medications')
@Controller('medications')
@UseGuards(JwtAuthGuard)
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo medicamento' })
  @ApiBody({
    description: 'Dados necessários para criar um medicamento',
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
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Medicamento criado com sucesso' })
  async create(@Body() createMedicationDto: CreateMedicationDto, @Req() req) {
    const userId = req.user.id || '';
    return this.medicationsService.create({ ...createMedicationDto, userId });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um medicamento pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do medicamento',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({ status: 200, description: 'Medicamento encontrado' })
  @ApiResponse({ status: 401, description: 'Token invalido ou ausente' })
  @ApiResponse({ status: 404, description: 'Medicamento não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os medicamentos cadastrados' })
  @ApiResponse({ status: 200, description: 'Medicamentos encontrados' })
  @ApiResponse({ status: 400, description: 'Erro ao retornar medicamentos' })
  async findAll() {
    return this.medicationsService.findAll();
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Atualiza um medicamento pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do medicamento',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  async update(
    @Param('id') id: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ) {
    return this.medicationsService.update(id, updateMedicationDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Remove um medicamento pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do medicamento',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  async remove(@Param('id') id: string) {
    return this.medicationsService.remove(id);
  }
}
