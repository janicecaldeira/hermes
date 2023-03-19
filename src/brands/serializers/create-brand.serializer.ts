import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandSerializer {
  @ApiProperty({
    description: 'ID da marca.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome da marca.',
    example: 'Nike',
  })
  name: string;

  @ApiProperty({
    description: 'Data de criação da marca.',
    example: '2023-03-18T22:38:45.996Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização da marca.',
    example: '2023-03-18T22:38:45.996Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de exclusão da marca quando aplicável.',
    example: null,
  })
  deletedAt: Date | null;
}
