import { Component, OnInit, Input } from '@angular/core';
import { Asignatura, Asistencia, Usuario } from 'src/app/interfaces/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-listaasistencia',
  templateUrl: './listaasistencia.component.html',
  styleUrls: ['./listaasistencia.component.scss'],
})
export class ListaAsistenciaComponent implements OnInit {
  uid = '';
  @Input() asignatura: Asignatura;
  asistencia: Asistencia[];
  info: Usuario = {uid:'',
                 username:'',
                 password:'',
                 correo:''};

  constructor(private firestore: FirestoreService,
              private auth: AuthService,) { 
   this.auth.stateUser().subscribe( res => {
    if (res !==null){
      this.uid=res.uid;
      this.getInfoUser(this.uid);
      this.getAsistencia();
    }
  });
  }
  ngOnInit() {
  }

  getAsistencia() {
    const path = 'Asignaturas/'+this.asignatura.id+'/Asistencia';
    this.firestore.getCollection<Asistencia>(path).subscribe(res => {
      this.asistencia = res;
    });

  }

  getInfoUser(uid:string) {
    const path = 'Usuarios';
    this.firestore.getDoc<Usuario>(path, uid).subscribe( res => {
      if (res !==undefined) {
        this.info = res;
      }
    })
  }

}

