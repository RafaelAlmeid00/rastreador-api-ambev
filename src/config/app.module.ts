import { Module } from '@nestjs/common';
import { AppService } from '../service/app.service';
import { AppController } from '../controller/app.controller';
import { FirebaseModule } from './firebase.module';
import { CsvController031129 } from 'src/controller/03.11.29.controller';
import { CsvService031129 } from 'src/service/03.11.29.service';
import { MulterModule } from '@nestjs/platform-express';
import { CsvController031120 } from 'src/controller/03.11.20.controller';
import { CsvService031120 } from 'src/service/03.11.20.service';
import { CsvControllerPCD } from 'src/controller/PCD.controller';
import { CsvServicePCD } from 'src/service/PCD.service.';
import { CsvControllerBEES } from 'src/controller/BEES.controller';
import { CsvServiceBEES } from 'src/service/BEES.service.';
import { FirebaseService } from 'src/service/firebase.service';

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
