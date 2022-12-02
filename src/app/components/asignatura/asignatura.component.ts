import { Component, Input, OnInit } from '@angular/core';
import { Asignatura, Usuario } from 'src/app/interfaces/usuario';
import { IonModal } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { AsistenciaPage } from '../../pages/asistencia/asistencia.page';
import { AuthService } from 'src/app/services/auth.service';
import { Asistencia } from '../../interfaces/usuario';
import { InteractionService } from 'src/app/services/interaction.service';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';


@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.scss'],
})
export class AsignaturaComponent implements OnInit {
  isModalOpen = false;

  asistencia: Asistencia = {
    id: '',
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
              private rt:Router,
              private barcodeScanner: BarcodeScanner,) { 
    this.auth.stateUser().subscribe(res => {
      if (res !== null) {
        this.usuario.uid = res.uid;
        this.getAsistInfo(this.usuario.uid);
        
      }
    });

  }
  

  ngOnInit() {
  }

  guardarAsignaturas() {
    this.interaction.presentLoading('Registrando...') 
      const path = 'Asignaturas/' + this.asignatura.id + '/Asistencia/';
      let actual: Date = new Date();
      this.asistencia.fecha = actual;
      this.firestore.createDoc(this.asistencia, path, this.firestore.GetId()).then(res => {
        this.interaction.closeLoading();
        this.interaction.presentToast('Registrado Correctamente')
        
      }).catch(error => {
      });
 
    }

    getAsistInfo(uid: string) {
      const path = 'Usuarios';
      this.firestore.getDoc<Usuario>(path, uid).subscribe(res => {
        if (res !== undefined) {
          this.usuario = res;
          this.asistencia.nombre = res.username;
        }
      });
    }

    scan()
  {
    this.barcodeScanner.scan().then(barcodeData => {
     }).catch(err => {
         console.log('Error', err);
     });
  }
}


