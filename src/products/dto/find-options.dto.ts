import {
  IsDefined,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class FindOptions {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  seller?: string;

  @ValidateIf((o) => o.priceEnd !== null && o.priceEnd !== undefined)
  @IsDefined()
  @IsNumberString()
  priceStart?: string;

  @IsNumberString()
  @ValidateIf((o) => o.priceStart !== null && o.priceStart !== undefined)
  @IsDefined()
  @IsNumberString()
  priceEnd?: string;
}
