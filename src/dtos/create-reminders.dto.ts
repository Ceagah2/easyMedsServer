import { IsDate, IsUUID } from 'class-validator';

export class CreateReminderDto {
  @IsUUID()
  medicationId: string;

  @IsDate()
  time: Date;
}
