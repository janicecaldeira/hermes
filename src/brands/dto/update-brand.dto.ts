import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateBrandDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'This name is too long',
  })
  name: string;
}
