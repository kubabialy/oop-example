import { HttpException } from '@nestjs/common';
import { Tracker } from './tracker.interface';
import { TrackerRepository } from './tracker.repository';

export class TrackerService {
  constructor(private trackerRepository: TrackerRepository) {}
  findOne(id: string): Tracker | null {
    return this.trackerRepository.findOne(id);
  }
  store(): void {
    this.trackerRepository.store({
      timeStarted: Date.now(),
    });
  }

  markAsDone(id: string): void {
    const tracker = this.trackerRepository.findOne(id);

    if (!tracker) {
      throw new HttpException('Cannot mark as done not existing tracker', 404);
    }

    tracker.timeFinished = Date.now();

    this.trackerRepository.store(tracker);
  }
}
