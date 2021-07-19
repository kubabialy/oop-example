import { Test, TestingModule } from '@nestjs/testing';
import { TrackerInMemoryRepository } from './storage/tracker.inmemory.repository';
import { TrackerController } from './tracker.controller';
import { TrackerService } from './tracker.service';

describe('TrackerController', () => {
  let trackerController: TrackerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrackerController],
      providers: [
        TrackerService,
        { provide: 'TrackerRepository', useClass: TrackerInMemoryRepository },
      ],
      exports: [TrackerService],
    }).compile();

    trackerController = app.get<TrackerController>(TrackerController);
  });

  describe('GET :id', () => {
    it('should throw error', () => {
      try {
        trackerController.findOne('testRun123');
      } catch (e) {
        expect(e.status).toBe(404);
      }
    });
    it('should return tracker', () => {
      const tracker = trackerController.findOne('testRun123');
      expect(tracker.id).toBe('testRun123');
      expect(tracker.timeStarted).toBe(1626726079671);
      expect(tracker.timeFinished).toBeUndefined();
    });
  });
  describe('POST :id', () => {
    it('should create new tracker', () => {
      const now = Date.now();
      const trackerId = trackerController.store();
      expect(trackerId).toBeDefined();

      const tracker = trackerController.findOne(trackerId);
      expect(tracker.timeStarted).toBeDefined();
      expect(tracker.timeStarted).toBeLessThanOrEqual(now);
      expect(tracker.id).toBe(trackerId);
    });
  });
  describe('POST :id/done', () => {
    it('should mark tracker as done', () => {
      trackerController.markAsDone('testRun123');
      const tracker = trackerController.findOne('testRun123');
      expect(tracker.timeFinished).toBeDefined();
      expect(tracker.timeFinished).toBeGreaterThan(tracker.timeStarted);
    });
  });
});
