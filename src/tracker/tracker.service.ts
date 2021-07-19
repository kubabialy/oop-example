import { HttpException, Inject } from '@nestjs/common';
import { Tracker } from './tracker.interface';
import { TrackerRepository } from './tracker.repository';

export class TrackerService {
  constructor(
    @Inject('TrackerRepository') private trackerRepository: TrackerRepository,
  ) {}
  findOne(id: string): Tracker | null {
    return this.trackerRepository.findOne(id);
  }
  store(): string {
    const tracker: Tracker = {
      timeStarted: Date.now(),
    };
    this.trackerRepository.store(tracker);

    return tracker.id!;
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
