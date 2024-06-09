import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FileService {
  createFile(file) {
    try {
      // const fileNew = file.originalname;
      const fileNew = 'opiop9';
      console.log('fileNew', fileNew);

    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


}
