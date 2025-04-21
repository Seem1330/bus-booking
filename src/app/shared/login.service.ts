// login.service.ts
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import  * as bootstrap from 'bootstrap';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private loginModalSubject = new Subject<void>();
  loginModal$ = this.loginModalSubject.asObservable();


// Use this ONLY to notify other components
triggerLoginModal() {
  this.loginModalSubject.next();
}

// Use this ONLY to open the modal
openLoginModal() {
  const modalElement = document.getElementById('authModal');
  if (modalElement) {
    const modal = new bootstrap.Modal(modalElement);
    modal?.show();
  }
}
  
}