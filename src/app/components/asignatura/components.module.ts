import { AsignaturaComponent } from './asignatura.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AsignaturaComponent],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports:[AsignaturaComponent],
})
export class ComponentsModule { }
