import {
  Controller,
  Post,
  Get,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvService031129 } from 'src/service/03.11.29.service';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as util from 'util';

// Promisify fs.readFile for use with async/await
const readFile = util.promisify(fs.readFile);

@Controller('03.11.29')
export class CsvController031129 {
  constructor(private readonly csvService: CsvService031129) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(
    @UploadedFile() file: Express.Multer.File,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new BadRequestException('File is missing or invalid');
    }

    const filePath = file.path || path.join('uploads/03.11.29', file.filename);

    if (file.buffer) {
      fs.writeFileSync(filePath, file.buffer);
    } else {
      console.log('File saved to disk:', filePath);
    }

    try {
      const fileContent = file.buffer || (await readFile(filePath));

      const result = await this.csvService.processCsv({
        ...file,
        buffer: fileContent,
      });

      return res.json({
        message: 'CSV successfully processed!',
        timestamp: new Date().toISOString(),
        result,
      });
    } catch (error) {
      throw new BadRequestException(`Error processing CSV: ${error.message}`);
    }
  }

  @Get('data')
  async getData(@Query('date') date: string) {
    try {
      // Optionally use a date parameter if needed
      const result = await this.csvService.getData(date); // Assuming getData() method returns the data array

      return {
        message: 'Data successfully fetched!',
        timestamp: new Date().toISOString(),
        data: result,
      };
    } catch (error) {
      throw new BadRequestException(`Error fetching data: ${error.message}`);
    }
  }
}
