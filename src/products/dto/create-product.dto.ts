import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'This name is too long',
  })
  name: string;

  @ApiPropertyOptional({ default: '0' })
  @IsOptional()
  @IsDecimal()
  price?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  brandId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sellerId: number;
}
