import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientService {
  private readonly logger = new Logger(ClientService.name);
  constructor(private readonly prisma: PrismaService){}

  async findById(id: number): Promise<any> {
    const client = await this.prisma.clients.findUnique({
      where: { id },
    });
    if (!client) {
      const errorMessage = `Client not fount with the ID ${id}`;
      this.logger.error(errorMessage);
      return { error: errorMessage };
    }
    this.logger.log('Customer found successfully!')
    return client;
  }
}
