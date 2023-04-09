import { IsNumber, IsOptional } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class CreateOrderRequestDto {
  @Expose()
  @Type(() => Number)
  clientId: number;
  @Expose()
  @Type(() => Number)
  @IsNumber()
  supplierId: number;
  @Expose()
  @Type(() => Number)
  @IsNumber()
  productId: number;
  @Expose()
  @Type(() => Number)
  @IsOptional()
  discount: number;
  @Expose()
  @Type(() => Number)
  @IsNumber()
  quantity: number;
}
