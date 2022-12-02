import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  providers: [AuthService],
})
export class ForgotPasswordPage implements OnInit {
  usuario={
    password:null,
    correo:null
  }
  userEmail = new FormControl ('');
  constructor(private AuthService:AuthService,
              private Router:Router) { }

  ngOnInit() {
  }

  async onReset() {
    try {
      const correo = this.userEmail.value;
      await this.AuthService.ResetPassword(correo);
      window.alert('Correo eviado, revisa ibbox')
      this.Router.navigate(['/login'])
    }
    catch (error){
      console.log(error)
    }

  }

}
