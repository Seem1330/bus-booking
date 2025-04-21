import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import * as bootstrap from 'bootstrap';
import { FormsModule } from '@angular/forms';
import { MasterService } from '../../pages/services/master.service';
import { AuthService } from '../../pages/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoginForm: boolean = true;
  loginObj: any = {
    userName: '',
    password: ''
  };
  masterService = inject(MasterService);

  constructor(private loginService: LoginService, private authService: AuthService) { }

  
  ngOnInit(): void {
    this.loginService.loginModal$.subscribe(() => this.showLoginModal());
  }

  showLoginModal() {
    this.loginObj = {
      userName: '',
      password: ''
    };
    const modalElement = document.getElementById('authModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal?.show();
    }
  }

  

  closePopUp() {
    const modalElement = document.getElementById('authModal');
    if (modalElement) {
    modalElement.style.display = 'none';
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal?.hide();
      }
    }
    this.cleanupBackdrop();


  }

  cleanupBackdrop() {
    const backdrops = document?.querySelectorAll('.modal-backdrop');
    backdrops.forEach(backdrop => backdrop.remove());
    // Restore body scroll by removing 'modal-open' class
    document.body.classList.remove('modal-open');
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }


  onLogin() {
    this.masterService.loginUser(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        alert('login success');
        localStorage.setItem('booking-user', JSON.stringify(res.data));
        this.authService.setUser(res.data);
        this.authService.triggerPostLoginAction();
        this.closePopUp();
        
      } else {
        alert(res.message);
      }
    })
  }

  onRegister() {
    console.log('Registering:', this.loginObj);
    this.closePopUp();
  }

  switchForm(isLogin: boolean) {
    this.isLoginForm = isLogin;
  }
}
