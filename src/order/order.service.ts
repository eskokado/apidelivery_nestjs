import { Injectable, Logger } from '@nestjs/common';
import { CreateOrderRequestDto } from './dto/create-order-request.dto';
import { SupplierService } from '../supplier/supplier.service';
import { ClientService } from '../client/client.service';
import { ProductService } from '../product/product.service';
import { ZipCodeService } from '../zip-code/zip-code.service';
import { AddressService } from '../address/address.service';
import { StateDelivery } from '../enum/state.delivery';
import { PrismaService } from '../prisma/prisma.service';

interface Client {
  id: number;
  name: string;
  email: string;
}

interface error {
  error: string;
}

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly clientService: SupplierService,
    private readonly supplierService: ProductService,
    private readonly productService: ClientService,
    private readonly zipCodeService: ZipCodeService,
    private readonly addressService: AddressService,
    private readonly stateDelivery: StateDelivery,
  ) {}

  async create(obj: CreateOrderRequestDto) {
    const errors = [];
    const client = await this.clientService.findById(obj.clientId);
    if (client.error) errors.push(client.error);
    const supplier = await this.supplierService.findById(obj.supplierId);
    if (supplier.error) errors.push(supplier.error);
    const product = await this.productService.findById(obj.productId);
    if (product.error) errors.push(product.error);
    const address = await this.addressService.findByClientId(client.id);
    if ('error' in address && address.error) errors.push(address.error);
    const zipCodeAddress = await this.zipCodeService.findZipCode(
      address.zip_code,
    );
    if (zipCodeAddress.error) errors.push(zipCodeAddress.error);
    if (errors.length > 0) {
      return {
        statusCode: 400,
        message: errors,
        error: 'Bad Request',
      };
    }
    try {
      const orderCreated = await this.prisma.order.create({
        data: {
          state_delivery: this.stateDelivery.PENDING.code,
          address_of_delivery_id: address.id,
          supplier_id: supplier.id,
          order_date: new Date(),
          order_items: {
            createMany: {
              data: [
                {
                  discount: obj.discount,
                  quantity: obj.quantity,
                  price: product.price,
                  product_id: product.id,
                },
              ],
            },
          },
        },
      });

      const orderResult = await this.prisma.order.findUnique({
        where: {
          id: orderCreated.id,
        },
        include: {
          suppliers: true,
          addresses: { include: { clients: true } },
          order_items: { include: { products: true } },
        },
      });

      const resultData = JSON.parse(JSON.stringify(orderResult));
      this.logger.log('Order register with success!');
      return resultData;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
