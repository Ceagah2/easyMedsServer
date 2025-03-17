import {
  Body,
  Controller,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/dtos/login.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth-guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Autentica um usuário e retorna tokens' })
  @ApiBody({
    description: 'Credenciais do usuário',
    type: LoginDto,
    examples: {
      exemplo1: {
        summary: 'Usuário válido',
        value: {
          email: 'usuario@email.com',
          password: 'senhaSegura123',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Usuário autenticado com sucesso' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    return this.authService.login({
      ...user,
      refreshToken: user.refreshToken || '',
    });
  }

  @Post('refresh')
  @ApiOperation({ summary: 'Gera um novo access token usando refresh token' })
  @ApiBody({
    description: 'Refresh token do usuário',
    schema: {
      type: 'object',
      properties: {
        refreshToken: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Novo access token gerado com sucesso',
  })
  @ApiResponse({ status: 401, description: 'Refresh token inválido' })
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refreshAccessToken(refreshToken);
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Logout do usuário' })
  @ApiBody({
    description: 'Requer um token JWT válido no header Authorization',
    examples: {
      exemplo: {
        summary: 'Logout de um usuário autenticado',
        value: {
          id: '26435fae-e16e-4f00-8e7a-0f33b196c346',
          refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Logout realizado com sucesso' })
  @ApiResponse({ status: 401, description: 'Usuário não autenticado' })
  async logout(@Req() req) {
    return this.authService.logout(req.user.id);
  }
}
