import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        return admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Necessário para preservar as quebras de linha
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          }),
          databaseURL: process.env.FIREBASE_DATABASE_URL,
        });
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
