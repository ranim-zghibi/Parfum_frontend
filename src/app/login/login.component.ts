import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit {
  erreur: number= 0;

  user = new User();


  constructor(private authService : AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin()
    {
      console.log(this.user);
      let isValidUser: Boolean = this.authService.SignIn(this.user);
      if (isValidUser)
          this.router.navigate(['/']);
      else
         //   alert('Login ou mot de passe incorrecte!');
         this.erreur=1;

    }


}
