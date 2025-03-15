import { FrequencyUnit } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsString()
  dosage: string;

  @IsDateString()
  startDate: string;

  @IsInt()
  @Min(1)
  frequency: number;

  @IsEnum(FrequencyUnit)
  frequencyUnit: FrequencyUnit;

  @IsBoolean()
  isControlled: boolean;

  @IsUUID()
  userId: string;

  @IsOptional()
  @IsDateString()
  prescriptionExpiration?: string;
}
