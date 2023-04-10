import { IsNumber, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderRequestDto {
  @Expose()
  @Type(() => Number)
  @ApiProperty()
  clientId: number;
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  supplierId: number;
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  productId: number;
  @Expose()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty()
  discount: number;
  @Expose()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty()
  quantity: number;
}
