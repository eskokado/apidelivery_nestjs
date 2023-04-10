import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StateDelivery } from "../enum/state.delivery";

@Injectable()
export class ProductService {
  private readonly logger = new Logger(ProductService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly stateDelivery: StateDelivery,
  ) {}

  async findById(id: number): Promise<any> {
    const product = await this.prisma.product.findFirst({
      where: { id },
    });
    this.logger.log(`id: ${id} - ${product}`);
    if (!product) {
      const errorMessage = `Product not fount with the ID ${id}`;
      this.logger.error(errorMessage);
      return { error: errorMessage };
    }
    this.logger.log('Product found successfully!');
    return product;
  }

  async findOrderItemsByProductId(productId: number) {
    try {
      const result = await this.prisma.orderItem.findMany({
        where: {
          products: {
            id: productId,
          },
        },
        include: {
          products: true,
          orders: {
            include: {
              suppliers: true,
              addresses: {
                include: {
                  clients: true,
                },
              },
            },
          },
        },
      });

      const filteredResult = result.map((item) => ({
        discount: item.discount,
        price: item.price,
        quantity: item.quantity,
        order_id: item.order_id,
        product: item.products,
        orders: {
          id: item.orders.id,
          order_date: item.orders.order_date,
          state_delivery: this.stateDelivery.toEnum(item.orders.state_delivery),
          address_of_delivery: item.orders.addresses,
          supplier: item.orders.suppliers,
        },
      }));
      return filteredResult;

      this.logger.log('Order register with success!');
    } catch (err) {
      this.logger.error(err);
    }
  }
}
