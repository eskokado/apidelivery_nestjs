import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { PrismaService } from '../prisma/prisma.service';
import { SupplierService } from "../supplier/supplier.service";
import { ClientService } from "../client/client.service";
import { ProductService } from "../product/product.service";

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clientService: SupplierService,
    private readonly supplierService: ProductService,
    private readonly productService: ClientService,
  ) {}

  async create(obj: CreateOrderRequestDto) {
    const errors = [];
    const client = await this.clientService.findById(obj.clientId);
    if (client.error) errors.push(client.error);
    const supplier = await this.supplierService.findById(obj.supplierId);
    if (supplier.error) errors.push(supplier.error);
    const product = await this.productService.findById(obj.productId);
    if (product.error) errors.push(product.error);

    if (errors.length > 0) {
      return {
        statusCode: 400,
        message: errors,
        error: 'Bad Request',
      };
    }
    return obj;
    // this.prisma.orders.create({
    //   data: {},
    // });
  }
}
