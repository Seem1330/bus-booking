import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { User } from './pages/models/model';
import { AuthService } from './pages/services/auth.service';
import { LoginComponent } from './shared/login/login.component';
import { LoginService } from './shared/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Bus-Booking';
  loggedUser: User = new User();

  constructor(private authService: AuthService, private loginService: LoginService) {
    this.authService.user$.subscribe((user) => {
      this.loggedUser = user ? user : new User();
    });
  }

  onLogin() {
    this.loginService.openLoginModal();
  }


  logOut() {
    this.authService.logout();
  }

}
