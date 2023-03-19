import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductSerializer {
  @ApiProperty()
  success: boolean;
}
