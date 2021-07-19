import { Module } from '@nestjs/common';
import { TrackerInMemoryRepository } from './storage/tracker.inmemory.repository';
import { TrackerController } from './tracker.controller';
import { TrackerService } from './tracker.service';

@Module({
  controllers: [TrackerController],
  providers: [
    TrackerService,
    { provide: 'TrackerRepository', useClass: TrackerInMemoryRepository },
  ],
  exports: [TrackerService],
})
export class TrackerModule {}
