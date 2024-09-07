import { Injectable } from '@nestjs/common';
import { firestore } from 'firebase-admin';
import * as fastcsv from 'fast-csv';
import { Readable } from 'stream';

@Injectable()
export class CsvServiceBEES {
  private get collectionName(): string {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Format as YYYY-MM-DD
    return `BEES.${formattedDate}`;
  }

  async processCsv(file: Express.Multer.File): Promise<void> {
    if (!file || !file.buffer) {
      throw new Error('File is missing or invalid');
    }

    const csvStream = fastcsv.parse({ headers: true });
    const records = [];

    return new Promise<void>(async (resolve, reject) => {
      csvStream.on('data', (row) => {
        row['dateRegistered'] = new Date().toISOString();
        records.push(row);
      });

      csvStream.on('end', async () => {
        try {
          await this.deleteCollection(this.collectionName); // Delete existing collection
          await this.saveToFirestore(records); // Save new records
          resolve();
        } catch (error) {
          reject(error);
        }
      });

      csvStream.on('error', (error) => {
        reject(error);
      });

      // Convert buffer to readable stream
      const readableStream = Readable.from(file.buffer);
      readableStream.pipe(csvStream);
    });
  }

  private async deleteCollection(
    collectionPath: string,
    batchSize: number = 100,
  ): Promise<void> {
    const db = firestore();
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);

    return new Promise<void>(async (resolve, reject) => {
      try {
        const snapshot = await query.get();

        if (snapshot.empty) {
          resolve(); // No documents to delete
          return;
        }

        const batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        await batch.commit();
        // Recurse if there are more documents to delete
        process.nextTick(() =>
          this.deleteCollection(collectionPath, batchSize)
            .then(resolve)
            .catch(reject),
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  private async saveToFirestore(records: any[]): Promise<void> {
    const db = firestore();
    const batch = db.batch();
    const collectionRef = db.collection(this.collectionName);

    for (const record of records) {
      const docRef = collectionRef.doc();
      batch.set(docRef, record);
    }

    await batch.commit();
  }

  async getData(date: string): Promise<any[]> {
    const collectionPath = `03.11.29.${date}`;
    const db = firestore();
    const collectionRef = db.collection(collectionPath);
    const snapshot = await collectionRef.get();
    console.log(collectionPath);
    console.log(snapshot);
    console.log(collectionRef);
    console.log(snapshot.docs);
    if (snapshot.empty) {
      return []; // No documents found
    }

    const data: any[] = [];
    const headers = [
      'Data',
      'Mapa',
      'Placa',
      'Regiao Entrega',
      'Superv. Rota',
      'Nome Superv. Rota',
      'Motorista',
      'Nome Motorista',
      'Ajudante 1',
      'Nome Ajudante 1',
      'Ajudante 2',
      'Nome Ajudante 2',
    ];

    for (const doc of snapshot.docs) {
      const fileContent =
        doc.data()[
          'Data;Mapa;Placa;Regiao Entrega;Superv. Rota;Nome Superv. Rota;Motorista;Nome Motorista;Ajudante 1;Nome Ajudante 1;Ajudante 2;Nome Ajudante 2;'
        ]; // Adjusted to string
      console.log(fileContent);

      if (!fileContent) {
        continue; // Skip if fileContent is undefined
      }

      const rows = fileContent.split('\n');
      const csvData: any[] = [];

      for (const row of rows) {
        const values = row.split(';');
        const obj: any = {};

        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });

        csvData.push(obj);
      }

      data.push(...csvData);
    }

    return data;
  }
}
