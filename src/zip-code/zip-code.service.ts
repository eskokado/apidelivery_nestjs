import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ZipCodeService {
  private readonly logger = new Logger(ZipCodeService.name);

  async findZipCode(zipCode: string): Promise<any> {
    const result = await axios.get(`https://viacep.com.br/ws/${zipCode}/json`);
    this.logger.log(`zip code: ${zipCode} - ${result}`);
    if (!result) {
      const errorMessage = `Address not fount with the zip code ${zipCode}`;
      this.logger.error(errorMessage);
      return { error: errorMessage };
    }
    this.logger.log('Address found successfully!');
    return result;
  }
}
