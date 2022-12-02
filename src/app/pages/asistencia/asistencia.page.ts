
import { Component, OnInit } from '@angular/core';
import { Asignatura } from 'src/app/interfaces/usuario';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  asignaturas: Asignatura[] = [];
  constructor(private firestore: FirestoreService) { 
    this.getAsignatura();
  }

  ngOnInit() {
  }

  getAsignatura() {
    const path = 'Asignaturas/';
    this.firestore.getCollection<Asignatura>(path).subscribe(res => {
      this.asignaturas = res;
     // console.log(res);
      
    });
  }
}
