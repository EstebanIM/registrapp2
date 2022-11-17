import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  createDoc(data: any, path: string, id: string)
  {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data)
  }

  getDoc<tipo>(path: string, id: string)
  {
    const collection = this.firestore.collection(path);
    return collection.doc<tipo>(id).valueChanges();
  }

  deleteDoc(path: string, id: string){
    const collection = this.firestore.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(path: string, id: string, data: any){
  const collection = this.firestore.collection(path);
  return collection.doc(id).update(data);
}

getCollection<tipo>(path: string) {
  const collection = this.firestore.collection<tipo>(path);
  return collection.valueChanges();
}

GetId(){
  return this.firestore.createId();
}

}