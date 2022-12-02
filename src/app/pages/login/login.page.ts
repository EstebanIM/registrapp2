import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { InteractionService } from '../../services/interaction.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  

  registrado:Usuario=null;

  usuario={
    password:null,
    correo:null
  }
  constructor(private storage:Storage, private router:Router, 
    private alertController: AlertController,
    private auth: AuthService,
    private interaction: InteractionService,
    private rt:Router) { }

  ngOnInit() {
  }

  onSubmit()
  {
    console.log(this.usuario);
    this.logear();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Acceso Denegado',
      subHeader: 'Usuario y/o Contraseña incorrecta',
      message: 'Reintentar o Recuperar clave',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async logear() {
    this.interaction.presentLoading('Ingresando...')
    const res = await this.auth.login(this.usuario.correo, this.usuario.password).catch( error =>{
      console.log('error');
      this.interaction.closeLoading();
      this.interaction.presentToast('Correo y/o contraseña incorrecta, Reintentar.')
    })
    if (res) {
      console.log('res -> ', res)
      this.interaction.closeLoading();
      this.interaction.presentToast('Ingresado Correctamente')
      this.router.navigate(['tabs/home'])
    }
  }
}
