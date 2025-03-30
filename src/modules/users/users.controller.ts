import {
  Body,
  Controller,
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
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({
    description: 'Dados necessários para criar um usuário',
    type: CreateUserDto,
    examples: {
      exemplo1: {
        summary: 'Usuário comum',
        value: {
          name: 'Carlos Silva',
          email: 'carlos@email.com',
          password: '123456',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um usuário pelo ID' })
  @ApiParam({
    name: 'id',
    description: 'ID do usuário',
    example: '550e8400-e29b-41d4-a716-446655240000',
  })
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Busca todos os usuário' })
  @ApiResponse({ status: 200, description: 'Usuários encontrados' })
  @ApiResponse({ status: 404, description: 'Erro ao retornar usuários' })
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Congela um usuário (desativa a conta)' })
  async deactivate(@Param('id') id: string) {
    return this.usersService.deactivateUser(id);
  }

  @Patch(':id/expo-push-token')
  async updateExpoPushToken(
    @Param('id') userId: string,
    @Body('expoPushToken') expoPushToken: string,
  ) {
    return this.usersService.updateExpoPushToken(userId, expoPushToken);
  }
}
