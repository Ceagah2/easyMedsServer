import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
import { MedicationsService } from './medications.service';

@ApiTags('Medications')
@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) {}

  @Post(':userId')
  @ApiOperation({ summary: 'Cria um novo medicamento para um usuário' })
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
  @ApiParam({
    name: 'userId',
    description: 'ID do usuário que está cadastrando o medicamento',
    example: 'c9f84575....',
  })
  @ApiResponse({ status: 201, description: 'Medicamento criado com sucesso' })
  async create(
    @Param('userId') userId: string,
    @Body() createMedicationDto: CreateMedicationDto,
  ) {
    return this.medicationsService.create(createMedicationDto, userId);
  }

  @Get(':userId/:medicationId')
  @ApiOperation({ summary: 'Busca um medicamento específico de um usuário' })
  @ApiParam({
    name: 'userId',
    description: 'ID do usuário',
    example: 'c9f84575....',
  })
  @ApiParam({
    name: 'medicationId',
    description: 'ID do medicamento',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({ status: 200, description: 'Medicamento encontrado' })
  @ApiResponse({ status: 404, description: 'Medicamento não encontrado' })
  async findOne(
    @Param('userId') userId: string,
    @Param('medicationId') medicationId: string,
  ) {
    return this.medicationsService.findOne(medicationId, userId);
  }

  @Get('/Allmeds')
  @ApiOperation({
    summary: 'Busca todos os medicamentos de um usuário específico',
  })
  @ApiResponse({ status: 200, description: 'Medicamentos encontrados' })
  @ApiResponse({ status: 400, description: 'Erro ao retornar medicamentos' })
  @ApiParam({
    name: 'userId',
    description: 'ID do usuário para buscar os medicamentos',
    example: 'c9f84575....',
  })
  async findAll(@Param('userId') userId: string) {
    return this.medicationsService.findAll(userId);
  }

  @Patch(':userId/:medicationId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @ApiOperation({ summary: 'Atualiza um medicamento de um usuário' })
  @ApiParam({
    name: 'userId',
    description: 'ID do usuário',
    example: 'c9f84575....',
  })
  @ApiParam({
    name: 'medicationId',
    description: 'ID do medicamento',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  async update(
    @Param('userId') userId: string,
    @Param('medicationId') medicationId: string,
    @Body() updateMedicationDto: UpdateMedicationDto,
  ) {
    return this.medicationsService.update(
      medicationId,
      userId,
      updateMedicationDto,
    );
  }

  @Delete(':userId/:medicationId')
  @ApiOperation({ summary: 'Remove um medicamento de um usuário' })
  @ApiParam({
    name: 'medicationId',
    description: 'ID do medicamento',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  async remove(@Param('medicationId') medicationId: string) {
    return this.medicationsService.remove(medicationId);
  }
}
