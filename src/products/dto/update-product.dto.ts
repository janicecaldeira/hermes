import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDecimal, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(50, {
    message: 'This name is too long',
  })
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDecimal()
  price?: number;
}
