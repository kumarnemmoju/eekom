import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserCommunicationService {
  userNameChanged = new EventEmitter<string | null>();

  updateUserName(userName: string) {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem('User Name', userName);
    }
    this.userNameChanged.emit(userName);
  }

  clearUserName() {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem('User Name');
    }
    this.userNameChanged.emit(null);
  }

  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.error('localStorage is not available');
      return false;
    }
  }
}
