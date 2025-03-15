import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMedicationDto } from 'src/dtos/create-medication.dto';
import { UpdateMedicationDto } from 'src/dtos/update-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMedicationDto) {
    return this.prisma.medication.create({ data });
  }

  async findOne(id: string) {
    return this.prisma.medication.findUnique({ where: { id } });
  }

  async findAll() {
    return this.prisma.medication.findMany();
  }

  async update(id: string, updateMedicationDto: UpdateMedicationDto) {
    return this.prisma.medication.update({
      where: { id },
      data: updateMedicationDto,
    });
  }

  async remove(id: string) {
    return this.prisma.medication.delete({
      where: { id },
    });
  }
}
