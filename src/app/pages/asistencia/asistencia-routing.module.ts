import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { AsistenciaPage } from './asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: AsistenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), ComponentsModule],
  exports: [RouterModule],
})
export class AsistenciaPageRoutingModule {}
