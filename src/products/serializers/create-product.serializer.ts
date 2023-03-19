import { ApiProperty } from '@nestjs/swagger';

export class CreateProductSerializer {
  @ApiProperty({
    description: 'ID do produto.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome do produto.',
    example: 'Tênis de corrida',
  })
  name: string;

  @ApiProperty({
    description: 'Slug do produto.',
    example: 'tenis-de-corrida',
  })
  slug: string;

  @ApiProperty({
    description: 'Preço do produto.',
    example: '100.00',
  })
  price: number;

  @ApiProperty({
    description: 'Data de criação do produto.',
    example: '2023-03-18T22:38:45.996Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do produto.',
    example: '2023-03-18T22:38:45.996Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de exclusão do produto quando aplicável.',
    example: null,
  })
  deletedAt: Date | null;

  @ApiProperty({
    description: 'ID da marca do produto.',
    example: 1,
  })
  brandId: number;

  @ApiProperty({
    description: 'ID do vendedor do produto.',
    example: 2,
  })
  sellerId: number;
}
