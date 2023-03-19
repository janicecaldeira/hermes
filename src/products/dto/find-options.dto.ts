import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class FindOptions {
  @ApiPropertyOptional({
    example: 'Tênis',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    example: 'Nike',
  })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiPropertyOptional({
    example: 'Centauro',
  })
  @IsOptional()
  @IsString()
  seller?: string;

  @ApiPropertyOptional({
    example: '100',
  })
  @ValidateIf((o) => o.priceEnd !== null && o.priceEnd !== undefined)
  @IsDefined()
  @IsNumberString()
  priceStart?: string;

  @ApiPropertyOptional({
    example: '200',
  })
  @IsNumberString()
  @ValidateIf((o) => o.priceStart !== null && o.priceStart !== undefined)
  @IsDefined()
  @IsNumberString()
  priceEnd?: string;
}
