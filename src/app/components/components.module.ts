import { AsignaturaComponent } from './asignatura/asignatura.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListaAsistenciaComponent } from './listaasistencia/listaasistencia.component';

@NgModule({
  declarations: [AsignaturaComponent, ListaAsistenciaComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[AsignaturaComponent, ListaAsistenciaComponent],
})
export class ComponentsModule { }
