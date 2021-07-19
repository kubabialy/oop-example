import { Tracker } from './tracker.interface';

export interface TrackerRepository {
  store(tracker: Tracker): void;
  findOne(id: string): Tracker | null;
}
