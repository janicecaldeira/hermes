import { ApiProperty } from '@nestjs/swagger';

export class UpdateSellerSerializer {
  @ApiProperty()
  success: boolean;
}
