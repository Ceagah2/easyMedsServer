import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMedicationDto } from 'src/dtos/create-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMedicationDto) {
    return this.prisma.medication.create({ data });
  }

  async findOne(id: string) {
    return this.prisma.medication.findUnique({ where: { id } });
  }
}
