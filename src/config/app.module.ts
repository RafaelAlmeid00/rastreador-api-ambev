import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { CsvControllerBEES } from 'src/controller/bees.controller';
import { CsvController031120 } from 'src/controller/C03.11.20.controller';
import { CsvController031129 } from 'src/controller/C03.11.29.controller';
import { CsvControllerPCD } from 'src/controller/pcd.controller';
import { CsvServiceBEES } from 'src/service/bees.service';
import { FirebaseService } from 'src/service/firebase.service';
import { CsvServicePCD } from 'src/service/pcd.service';
import { CsvService031120 } from 'src/service/S03.11.20.service';
import { CsvService031129 } from 'src/service/S03.11.29.service';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { FirebaseModule } from './firebase.module';

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
