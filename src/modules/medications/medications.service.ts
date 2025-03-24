import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateMedicationDto } from 'src/dtos/create-medication.dto';
import { UpdateMedicationDto } from 'src/dtos/update-medication.dto';

@Injectable()
export class MedicationsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMedicationDto: CreateMedicationDto, userId: string) {
    console.log(userId);
    return this.prisma.medication.create({
      data: {
        ...createMedicationDto,
        userId,
      },
    });
  }

  async findOne(id: string, userId: string) {
    const medication = await this.prisma.medication.findUnique({
      where: { id },
    });

    if (!medication) throw new NotFoundException('Medicamento não encontrado');

    if (medication.userId !== userId) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este medicamento',
      );
    }

    return medication;
  }

  async findAll(userId: string) {
    const medications = await this.prisma.medication.findMany({
      where: { userId },
    });
    return medications;
  }

  async update(
    id: string,
    userId: string,
    updateMedicationDto: UpdateMedicationDto,
  ) {
    return this.prisma.medication.update({
      where: { id, userId },
      data: updateMedicationDto,
    });
  }

  async remove(id: string) {
    const medication = await this.prisma.medication.findFirst({
      where: { id },
    });
    console.log('medicacao:', medication);
    if (!medication) {
      throw new NotFoundException('Medication not found');
    }
    await this.prisma.reminder.deleteMany({
      where: { medicationId: medication.id },
    });
    await this.prisma.medication.delete({
      where: { id: medication.id },
    });
    return { message: 'Medication deleted successfully' };
  }
}
