import { Injectable } from '@angular/core';

@Injectable()
export class FlashMessageService {
  private storage = localStorage;
  private flashMessageKey: string;

  constructor() {
    this.flashMessageKey = 'flashMessage';
  }

  has() {
    const message = this.storage.getItem(this.flashMessageKey);
    return message ? message.length > 0 : false;
  }

  get() {
    const message = this.storage.getItem(this.flashMessageKey);
    this.storage.removeItem(this.flashMessageKey);
    return message;
  }

  set(message) {
    this.storage.setItem(this.flashMessageKey, message);
  }
}
