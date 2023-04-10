import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface error {
  error: string;
}

@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(private readonly prisma: PrismaService) {}

  async findByClientId(clienteId: number): Promise<any> {
    const address = this.prisma.address.findFirst({
      where: { client_id: clienteId },
    });
    this.logger.log(`client id: ${clienteId} - ${address}`);
    if (!address) {
      const errorMessage = `Address not fount with the client ID ${clienteId}`;
      this.logger.error(errorMessage);
      return { error: errorMessage };
    }
    this.logger.log('Address found successfully!');
    return address;
  }
}
