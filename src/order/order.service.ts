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
    const viaCepData = zipCodeAddress;
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
          via_cep_data: viaCepData,
        },
      });
      const resultData = await this.findOrderById(orderCreated.id);

      this.logger.log('Order register with success!');
      return resultData;
    } catch (err) {
      this.logger.error(err);
    }
  }

  async updateOrderStatusToDelivered(id: number) {
    try {
      const orderDelivered = await this.prisma.order.update({
        data: {
          state_delivery: this.stateDelivery.DELIVERED.code,
        },
        where: {
          id,
        },
      });
      if (!orderDelivered) {
        const errorMessage = `Order not fount with the ID ${id}`;
        this.logger.error(errorMessage);
        return { error: errorMessage };
      }

      const resultData = await this.findOrderById(orderDelivered.id);

      this.logger.log('Update status with success!');
      return resultData;
    } catch (err) {
      this.logger.error('Unable to update status');
    }
  }

  async updateOrderStatusToCancelled(id: number) {
    try {
      const orderCanceled = await this.prisma.order.update({
        data: {
          state_delivery: this.stateDelivery.CANCELED.code,
        },
        where: {
          id,
        },
      });
      if (!orderCanceled) {
        const errorMessage = `Order not fount with the ID ${id}`;
        this.logger.error(errorMessage);
        return { error: errorMessage };
      }

      const resultData = await this.findOrderById(orderCanceled.id);

      this.logger.log('Update status with success!');
      return resultData;
    } catch (err) {
      this.logger.error('Unable to update status');
    }
  }

  async findOrderById(id: number) {
    const orderResult = await this.prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        suppliers: true,
        addresses: { include: { clients: true } },
        order_items: { include: { products: true } },
      },
    });
    this.logger.log(`id: ${id} - ${orderResult}`);
    if (!orderResult) {
      const errorMessage = `Order not fount with the ID ${id}`;
      this.logger.error(errorMessage);
      return { error: errorMessage };
    }

    const resultData = orderResult;
    resultData['state_delivery'] = this.stateDelivery.toEnum(
      resultData['state_delivery'],
    );
    resultData['via_cep_data'] = JSON.parse(resultData['via_cep_data']);
    return resultData;
  }

  async findOrdersByTerm(term: string) {
    const orderResult = await this.prisma.order.findMany({
      where: {
        OR: [
          {
            suppliers: {
              name: {
                contains: term,
              },
            },
          },
          {
            addresses: {
              clients: {
                name: {
                  contains: term,
                },
              },
            },
          },
        ],
      },
      include: {
        suppliers: true,
        addresses: { include: { clients: true } },
        order_items: { include: { products: true } },
      },
    });
    this.logger.log(`Term: ${term} - ${orderResult}`);

    const resultData = orderResult;
    resultData.map((rd) => {
      rd['state_delivery'] = this.stateDelivery.toEnum(rd['state_delivery']);
      rd['via_cep_data'] = JSON.parse(rd['via_cep_data']);
    });

    return resultData;
  }
}
