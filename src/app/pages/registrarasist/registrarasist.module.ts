import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrarasistPageRoutingModule } from './registrarasist-routing.module';
import { RegistrarasistPage } from './registrarasist.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarasistPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegistrarasistPage]
})
export class RegistrarasistPageModule {}
