import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReminderDto } from 'src/dtos/create-reminders.dto';

@Injectable()
export class RemindersService {
  private readonly logger = new Logger(RemindersService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron('*/5 * * * *')
  async checkReminders() {
    const now = new Date();

    this.logger.log('🔍 Verificando lembretes pendentes...');

    const reminders = await this.prisma.reminder.findMany({
      where: {
        time: { lte: now },
        taken: false,
      },
      include: {
        medication: {
          include: { user: true },
        },
      },
    });

    for (const reminder of reminders) {
      const user = reminder.medication.user;

      if (user.expoPushToken) {
        await this.sendPushNotification(
          user.expoPushToken,
          'Hora do remédio! 💊',
          `Está na hora de tomar ${reminder.medication.name}.`,
        );

        this.logger.log(`✅ Notificação enviada para ${user.id}`);
      } else {
        this.logger.warn(`⚠️ Usuário ${user.id} não tem push token.`);
      }
    }
  }

  async sendPushNotification(token: string, title: string, body: string) {
    try {
      await axios.post('https://exp.host/--/api/v2/push/send', {
        to: token,
        title,
        body,
        sound: 'default',
      });

      this.logger.log(`📩 Notificação enviada para ${token}`);
    } catch (error) {
      this.logger.error(`❌ Erro ao enviar notificação: ${error.message}`);
    }
  }
  async create(data: CreateReminderDto) {
    return this.prisma.reminder.create({ data });
  }

  async findOne(id: string) {
    return this.prisma.reminder.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.reminder.findMany();
  }

  async update(id: string, data: Partial<CreateReminderDto>) {
    return this.prisma.reminder.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.reminder.delete({ where: { id } });
  }
}
