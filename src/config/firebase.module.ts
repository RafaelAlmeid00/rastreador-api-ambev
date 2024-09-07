import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { join } from 'path';

@Module({
  providers: [
    {
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        const serviceAccountPath = join(
          'easytracker-f7b08-firebase-adminsdk-vaqk5-d8fb2cd702.json',
        );
        const serviceAccount = JSON.parse(
          readFileSync(serviceAccountPath, 'utf8'),
        );

        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          databaseURL: serviceAccount.databaseURL,
        });
      },
    },
  ],
  exports: ['FIREBASE_ADMIN'],
})
export class FirebaseModule {}
