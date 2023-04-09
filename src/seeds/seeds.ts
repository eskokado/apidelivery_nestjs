import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedOrders(): Promise<void> {
  const client1 = await prisma.client.create({
    data: {
      name: 'Maria Silva',
      email: 'maria@gmail.com',
    },
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'Paulo Silva',
      email: 'paulo@gmail.com',
    },
  });

  const address1 = await prisma.address.create({
    data: {
      number: '300',
      complement: 'Apto 203',
      zip_code: '05577200',
      client_id: client1.id,
    },
  });

  const address2 = await prisma.address.create({
    data: {
      number: '600',
      complement: 'Apto 603',
      zip_code: '05577200',
      client_id: client2.id,
    },
  });
  const supplier = await prisma.supplier.create({
    data: {
      name: 'João Souza',
      email: 'joao@gmail.com',
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: 'Notebook',
      price: 1500.0,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: 'Impressora',
      price: 800.0,
    },
  });

  const product3 = await prisma.product.create({
    data: {
      name: 'Mouse',
      price: 80.0,
    },
  });

  const order1 = await prisma.order.create({
    data: {
      state_delivery: 1,
      address_of_delivery_id: address1?.id,
      supplier_id: supplier.id,
      order_date: new Date(),
      order_items: {
        createMany: {
          data: [
            {
              discount: 0.0,
              quantity: 1,
              price: 2000.0,
              product_id: product1.id,
            },
            {
              discount: 0.0,
              quantity: 1,
              price: 2000.0,
              product_id: product3.id,
            },
            {
              discount: 100.0,
              quantity: 1,
              price: 800.0,
              product_id: product2.id,
            },
          ],
        },
      },
    },
  });

  const order2 = await prisma.order.create({
    data: {
      state_delivery: 1,
      address_of_delivery_id: address2.id,
      supplier_id: supplier.id,
      order_date: new Date(),
      order_items: {
        createMany: {
          data: [
            {
              discount: 0.0,
              quantity: 1,
              price: 2000.0,
              product_id: product1.id,
            },
            {
              discount: 100.0,
              quantity: 1,
              price: 800.0,
              product_id: product2.id,
            },
          ],
        },
      },
    },
  });
}

async function main() {
  console.log('Start seeding...');

  try {
    await seedOrders();
  } catch (error) {
    console.log(error);
  }

  console.log('Seeding completed!');
  process.exit(0);
}

main();
