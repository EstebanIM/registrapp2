import { Component, Input, OnInit } from '@angular/core';
import { Asignatura, Usuario } from 'src/app/interfaces/usuario';
import { IonModal } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { AsistenciaPage } from '../../pages/asistencia/asistencia.page';
import { AuthService } from 'src/app/services/auth.service';
import { Asistencia } from '../../interfaces/usuario';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.scss'],
})
export class AsignaturaComponent implements OnInit {
  isModalOpen = false;

  asistencia: Asistencia = {
    fecha: '',
    nombre: '',
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  
  @Input() asignatura: Asignatura;

  usuario: Usuario = {
    uid: '',
    username: '',
    password:'',
    correo:'',
  }


  constructor(private firestore: FirestoreService,
              private interaction: InteractionService,
              private auth: AuthService,
              private rt:Router) { 
    this.auth.stateUser().subscribe(res => {
      if (res !== null) {
        this.usuario.uid = res.uid;
        this.getAsistInfo(this.usuario.uid);
      }
    });
  }
  
  ngOnInit() {
    //console.log(this.asignatura);
  console.log('asistecia', this.asistencia);

  }

  guardarAsignaturas() {
    this.interaction.presentLoading('Registrando...') 
      const path = 'Asignaturas/' + this.asignatura.id + '/Asistencia/';
      this.firestore.createDoc(this.asistencia, path, this.firestore.GetId()).then(res => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Registrado Correctamente')
      }).catch(error => {
      });
 
    }

    getAsistInfo(uid: string) {
      // console.log('getUserInfo');
      const path = 'Usuarios';
      this.firestore.getDoc<Usuario>(path, uid).subscribe(res => {
        if (res !== undefined) {
          this.usuario = res;
          this.asistencia.fecha = new Date();
          this.asistencia.nombre = res.username;
          console.log(res);
          
        }
      });
    }

}
