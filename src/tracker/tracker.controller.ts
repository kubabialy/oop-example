import {
  Controller,
  Get,
  HttpCode,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { Tracker } from './tracker.interface';
import { TrackerService } from './tracker.service';

@Controller('tracker')
export class TrackerController {
  constructor(private trackerService: TrackerService) {}
  @Get(':id')
  findOne(@Param('id') id: string): Tracker {
    const tracker = this.trackerService.findOne(id);
    if (!tracker) {
      throw new HttpException('Tracker not found', 404);
    }

    return tracker;
  }

  @Post()
  store(): void {
    this.trackerService.store();
  }

  @Post(':id/done')
  @HttpCode(204)
  markAsDone(@Param('id') id: string): void {
    this.trackerService.markAsDone(id);
  }
}
