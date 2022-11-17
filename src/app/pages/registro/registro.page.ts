import { Usuario } from './../../interfaces/usuario';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from '../../services/interaction.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  onSubmit() {}

  datos: Usuario = {
    uid: null,
    username: null,
    password: null,
    correo: null
  } 
  constructor(private storage: Storage, 
              private router:Router,
              private auth: AuthService,
              private firestore: FirestoreService,
              private interaction: InteractionService,) { }

  ngOnInit() { 
  }
 
  async registrar() {
    console.log('datos -> ', this.datos)
    const res = await this.auth.registrarUser(this.datos).catch( error => {
      this.interaction.closeLoading();
      this.interaction.presentLoading('Registrando...')
      this.interaction.presentToast('Error');
      console.log('error');
    })
    if (res) { 
      console.log('exito');  
      const path = 'Usuarios';
      const id = res.user.uid;
      this.datos.uid = id;
      this.datos.password = null
      await this.firestore.createDoc(this.datos, path, id)
      this.interaction.presentToast('Registro Exitoso')
      this.router.navigate(['tabs/home'])
    }
  }

}
