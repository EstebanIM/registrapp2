import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { promise, element } from 'protractor';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private authfirebase: AngularFireAuth,) { }

  async ResetPassword(email:string):Promise<void> {
    try{
      return this.authfirebase.sendPasswordResetEmail(email);
    }
    catch(error){console.log(error)}
  }

  login(correo: string, password: string) {
    return this.authfirebase.signInWithEmailAndPassword(correo, password)
  }

  logout() {
    this.authfirebase.signOut();
  }

  registrarUser(datos:Usuario) {
    return this.authfirebase.createUserWithEmailAndPassword(datos.correo, datos.password);

  }

  stateUser() {
    return this.authfirebase.authState
  }

   async getUid() {
    const user = await this.authfirebase.currentUser;
    if (user) {
      return user.uid;
    } else {
      return null;
    }
  }

// async requestPassword(correo: string) {
//   return await this.authfirebase.sendPasswordResetEmail(correo)
// }

}
