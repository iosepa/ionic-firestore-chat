import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { take, map, tap } from 'rxjs/operators';

export interface UserCredentials {
  displayName?: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User = null;
  displayName = '';

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.afAuth.authState.subscribe(res => {
      this.user = res;
      if (this.user) {
        this.db.collection('users', ref => ref.where('email', '==', this.user.email)).snapshotChanges().pipe(
          take(1),
          map(actions => actions.map(a => {
            const data = a.payload.doc.data();
            this.displayName = data['displayName'];
          }))
        ).subscribe();
      }
    })
  }

  signUp(credentials: UserCredentials) {
    //console.log(credentials.displayName)
    return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then((data) => {
        return this.db.doc(`users/${data.user.uid}`).set({
          displayName: credentials.displayName,
          email: data.user.email,
          created: firebase.firestore.FieldValue.serverTimestamp()
        });
      });
  }

  isdisplayNameAvailable(name) {
    return this.db.collection('users', ref => ref.where('displayName', '==', name).limit(1)).valueChanges().pipe(
      take(1),
      map(user => {
        return user;
      })
    );
  }

  signIn(credentials: UserCredentials) {
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  resetPw(email) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  updateUser(displayName) {
    return this.db.doc(`users/${this.currentUserId}`).update({
      displayName
    });
  }

  get authenticated(): boolean {
    return this.user !== null;
  }

  get currentUser(): any {
    return this.authenticated ? this.user : null;
  }

  get currentUserId(): string {
    console.log("checking id" + this.user)
    return this.authenticated ? this.user.uid : '';
  }
}
