import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Delivery Nestjs')
    .setDescription(
      'A API criada possui os seguintes requisitos:\n' +
        '\n' +
        'Criar a entrega de um item.\n' +
        'Procurar pela entrega de um item específico.\n' +
        'Procurar entregas por destinatário ou por remetente.\n' +
        'Atualizar o estado como entregue.\n' +
        'Cancelar uma entrega.\n' +
        'Consumir uma outra API REST já existente para buscar dados, como bairro, rua e geolocalização, a partir de CEP e número informados.\n' +
        'Fluxo de Autenticação usando bearer token ou outro método de segurança.\n' +
        'Documentação usando o Swagger.\n' +
        'Essa API permite gerenciar entregas de itens, permitindo a criação, consulta e atualização do status de entrega, bem como a busca por entregas por destinatário ou remetente. Além disso, ela consome uma API externa para buscar informações adicionais sobre os endereços de entrega.\n' +
        '\n' +
        'A segurança da API é garantida por um fluxo de autenticação, que requer o uso de um token de autenticação válido para acessar os recursos protegidos.\n' +
        '\n' +
        'A documentação da API é fornecida pelo Swagger, facilitando o uso e a compreensão dos recursos disponíveis na API.\n' +
        '\n' +
        'A api tem dois usuários POJO como username: user ou admin e senha: user ou admin',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: '*',
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}

bootstrap();
