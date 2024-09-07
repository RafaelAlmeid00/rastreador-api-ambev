import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CsvController031120 } from '../controller/C03.11.20.controller';
import { CsvController031129 } from '../controller/C03.11.29.controller';
import { CsvServiceBEES } from '../service/bees.service';
import { FirebaseService } from '../service/firebase.service';
import { CsvService031120 } from '../service/S03.11.20.service';
import { CsvService031129 } from '../service/S03.11.29.service';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { FirebaseModule } from './firebase.module';
import { CsvServicePCD } from '../service/pcd.service';
import { CsvControllerBEES } from '../controller/bees.controller';
import { CsvControllerPCD } from '../controller/pcd.controller';

@Module({
  imports: [
    FirebaseModule,
    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [
    AppController,
    CsvController031129,
    CsvController031120,
    CsvControllerPCD,
    CsvControllerBEES,
  ],
  providers: [
    AppService,
    FirebaseService,
    CsvService031129,
    CsvService031120,
    CsvServicePCD,
    CsvServiceBEES,
  ],
})
export class AppModule {}
