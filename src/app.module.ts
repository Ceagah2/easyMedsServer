import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { MedicationsModule } from './modules/medications/medications.module';
import { RemindersModule } from './modules/reminders/reminders.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    MedicationsModule,
    RemindersModule,
    AuthModule,
  ],
})
export class AppModule {}
