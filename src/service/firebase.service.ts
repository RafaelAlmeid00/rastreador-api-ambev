import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  constructor(
    @Inject('FIREBASE_ADMIN') private readonly firebaseAdmin: admin.app.App,
  ) {}

  async getUser(uid: string) {
    return this.firebaseAdmin.auth().getUser(uid);
  }

  async createUser(email: string, password: string) {
    return this.firebaseAdmin.auth().createUser({ email, password });
  }
}
