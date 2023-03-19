import { ApiProperty } from '@nestjs/swagger';

export class UpdateBrandSerializer {
  @ApiProperty()
  success: boolean;
}
