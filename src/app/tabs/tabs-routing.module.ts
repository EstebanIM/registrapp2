import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule), canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'asistencia',
        loadChildren: () => import('../pages/asistencia/asistencia.module').then(m => m.AsistenciaPageModule), canActivate: [AngularFireAuthGuard]
      },
      {
        path: 'registrarasist',
        loadChildren: () => import('../pages/registrarasist/registrarasist.module').then(m => m.RegistrarasistPageModule), canActivate: [AngularFireAuthGuard]
      },

      {
        path: 'perfil',
        loadChildren: () => import('../pages/perfil/perfil.module').then( m => m.PerfilPageModule), canActivate: [AngularFireAuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
