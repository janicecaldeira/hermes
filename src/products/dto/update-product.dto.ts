import { IsDecimal, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MaxLength(50, {
    message: 'This name is too long',
  })
  name?: string;

  @IsOptional()
  @IsDecimal()
  price?: number;
}
