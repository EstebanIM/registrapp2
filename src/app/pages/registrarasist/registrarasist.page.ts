import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../interfaces/usuario';
import { FirestoreService } from '../../services/firestore.service';


@Component({
  selector: 'app-registrarasist',
  templateUrl: './registrarasist.page.html',
  styleUrls: ['./registrarasist.page.scss'],
})
export class RegistrarasistPage implements OnInit {

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
    });
  }

}
