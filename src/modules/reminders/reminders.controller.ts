import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReminderDto } from 'src/dtos/create-reminders.dto';
import { RemindersService } from './reminders.service';

@Controller('reminders')
export class RemindersController {
  constructor(private readonly remindersService: RemindersService) {}

  @Post()
  async create(@Body() createReminderDto: CreateReminderDto) {
    return this.remindersService.create(createReminderDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.remindersService.findOne(id);
  }
}
