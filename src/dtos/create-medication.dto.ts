import { IsDate, IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsString()
  dosage: string;

  @IsDate()
  startDate: Date;

  @IsNumber()
  durationInDays: number;

  @IsUUID()
  userId: string;
}
