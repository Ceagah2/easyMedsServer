import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export enum FrequencyUnit {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export class CreateMedicationDto {
  @IsString()
  name: string;

  @IsString()
  dosage: string;

  @IsDate()
  startDate: Date;

  @IsNumber()
  frequency: number;

  @IsEnum(FrequencyUnit)
  frequencyUnit: FrequencyUnit;

  @IsUUID()
  userId: string;

  @IsBoolean()
  isControlled: boolean;

  @IsOptional()
  @IsDate()
  prescriptionExpiration?: Date;
}
