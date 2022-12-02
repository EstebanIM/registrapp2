import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from '../../services/auth.service';
import { InteractionService } from '../../services/interaction.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
username: any;
uid: string = null
info: Usuario = {uid:'',
                 username:'',
                 password:'',
                 correo:''};

  constructor(
    private st:Storage, 
    private rt:Router,
    private auth: AuthService,
    private interaction: InteractionService,
    private router:Router,
    private firestoreService: FirestoreService,
  ) {
    this.auth.stateUser().subscribe( res => {
      console.log('en perfil - estado autenticacion -> ', res);
      if (res !==null){
        this.uid=res.uid;
        this.getInfoUser(this.uid);
      }
    });
  }

  ngOnInit() {
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

  getInfoUser(uid:string) {
    const path = 'Usuarios';
    this.firestoreService.getDoc<Usuario>(path, uid).subscribe( res => {
      if (res !==undefined) {
        this.info = res;
      }
    })
  }

}
