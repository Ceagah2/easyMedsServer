import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReminderDto } from 'src/dtos/create-reminders.dto';

@Injectable()
export class RemindersService {
  constructor(private readonly prisma: PrismaService) {}

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
