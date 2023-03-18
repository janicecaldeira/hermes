import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateSellerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50, {
    message: 'This name is too long',
  })
  name: string;
}
