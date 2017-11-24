import { Observable } from 'rxjs/Observable';
import { TestBed } from '@angular/core/testing';

import { FlashMessageService } from './flash.service';

describe('FlashMessageService', () => {

    let service: FlashMessageService;
    const expectedMessage = 'Test Message';

    beforeEach(() => {
        const bed = TestBed.configureTestingModule({
            providers: [
              FlashMessageService,
            ],
        });
        service = bed.get(FlashMessageService);
        service.set('Test Message');
    });

    it('should have message as expected', () => {
      const isMessage = service.has();
      expect(isMessage).toEqual(true);
    });

    it('should get message as expected', () => {
      const message = service.get();
      expect(message).toEqual(expectedMessage);
    });

    it('should remove message after it has been read', () => {
      let isMessage = service.has();
      expect(isMessage).toEqual(true);

      service.get();

      isMessage = service.has();
      expect(isMessage).toEqual(false);
    });
});
