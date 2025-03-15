import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateReminderDto } from 'src/dtos/create-reminders.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { RemindersService } from './reminders.service';

@ApiTags('Reminders')
@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}
  @ApiOperation({ summary: 'Cria um novo lembrete' })
  @ApiBody({
    description: 'Dados necessários para criar um lembrete',
    type: CreateReminderDto,
    examples: {
      exemplo1: {
        summary: 'Lembrete padrao',
        value: {
          medicationId: '550e8400-e29b-41d4-a716-446655440000',
          time: '2025-03-14T12:00:00Z',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Lembrete criado com sucesso' })
  @Post()
  async create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um lembrete pelo ID' })
  @ApiParam({ name: 'id', description: 'ID do lembrete', example: '1' })
  @ApiResponse({ status: 200, description: 'Lembrete encontrado' })
  @ApiResponse({ status: 404, description: 'Lembrete não encontrado' })
  async findOne(@Param('id') id: string) {
    return this.remindersService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os lembretes' })
  @ApiResponse({ status: 200, description: 'Lembretes encontrados' })
  @ApiResponse({ status: 404, description: 'Erro ao retornar lembrete' })
  async findAll() {
    return this.remindersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um lembrete' })
  async update(
    @Param('id') id: string,
    @Body() updateReminderDto: Partial<CreateReminderDto>,
  ) {
    return this.remindersService.update(id, updateReminderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove um lembrete' })
  async remove(@Param('id') id: string) {
    return this.remindersService.remove(id);
  }
}
