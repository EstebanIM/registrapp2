import { Usuario } from 'src/app/interfaces/usuario';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import { AlertController } from '@ionic/angular';
import { InteractionService } from '../../services/interaction.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  handlerMessage = '';
  roleMessage = '';
  uid: string = null
  info: Usuario = {uid:'',
                   username:'',
                   password:'',
                   correo:''};

  constructor(private authService: AuthService,
              private firestoreService: FirestoreService,
              private alertController: AlertController,
              private router:Router,
              private auth: AuthService,
              private interaction: InteractionService,
              private interactionService: InteractionService,
              private rt:Router) {
                this.authService.stateUser().subscribe( res => {
                  console.log('en perfil - estado autenticacion -> ', res);
                  if (res !==null){
                    this.uid=res.uid;
                    this.getInfoUser(this.uid);
                  }
                });
               }

  async ngOnInit() {

  }

    getInfoUser(uid:string) {
      const path = 'Usuarios';
      this.firestoreService.getDoc<Usuario>(path, uid).subscribe( res => {
        if (res !==undefined) {
          this.info = res;
        }
        console.log('datos son ->', res);
      })
    }

    async editAtributo(name: string) {
      const alert = await this.alertController.create({
        header: 'Editar ' + name,
        inputs: [
          {
            name,
            placeholder: 'Ingresa tu ' + name,
          },
        ],
        buttons: [{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.handlerMessage = 'Alerta cancelada';
          },
        },
        {
          text: 'Confirmar',
          role: 'confirm',
          handler: (ev) => {
            console.log('confirm ok ->', ev);
            this.handlerMessage = 'Alerta confirmada';
            this.saveAtributo (name, ev[name])
          },
        },],

      });
  
      await alert.present();
    }

    saveAtributo(name:string, input: any) {
      const path = 'Usuarios';
      const id = this.uid;
      const updateDoc = {
      };
      updateDoc[name] = input
      this.firestoreService.updateDoc(path, id, updateDoc).then( () => {
        this.interactionService.presentToast ('Actualizado con exito')
      })
    }

    cerrarSesion(){
      this.logout();
      this.rt.navigate(['/login']);
    }
  
    async logout()
    {
      this.auth.logout
      this.interaction.presentToast('Logout con exito')
      this.router.navigate(['/login'])
    }

}
