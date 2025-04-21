
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUser = new BehaviorSubject<User | null>(null);
  private postLoginActionTrigger = new Subject<void>();

  // Observable to subscribe to user changes
  user$ = this.currentUser.asObservable();

  // Observable for post-login actions (like booking)
  loginCall$ = this.postLoginActionTrigger.asObservable();

  constructor() {
    const savedUser = localStorage.getItem('booking-user');
    if (savedUser) {
      this.currentUser.next(JSON.parse(savedUser));
    }
  }

  setUser(user: User): void {
    localStorage.setItem('booking-user', JSON.stringify(user));
    this.currentUser.next(user);
    this.triggerPostLoginAction(); // Automatically retry logic here
  }

  getUser(): User | null {
    return this.currentUser.getValue();
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  logout(): void {
    localStorage.removeItem('booking-user');
    this.currentUser.next(null);
  }

  // 👇 Triggers something like retrying booking
  triggerPostLoginAction(): void {
    this.postLoginActionTrigger.next();
  }
}
