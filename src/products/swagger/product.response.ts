import { ApiProperty } from '@nestjs/swagger';

import { BrandEntity } from '@/common/database/entities/brand.entity';
import { SellerEntity } from '@/common/database/entities/seller.entity';

export class GetProductResponse {
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
    description: 'ID da marca do produto.',
    example: 1,
  })
  brandId: number;

  @ApiProperty({
    description: 'Marca associada ao produto.',
    example: 1,
  })
  brand: BrandEntity;

  @ApiProperty({
    description: 'ID do vendedor do produto.',
    example: 2,
  })
  sellerId: number;

  @ApiProperty({
    description: 'Vendedor associado ao produto.',
    example: 2,
  })
  seller: SellerEntity;

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
}

export class Response404Dto {
  @ApiProperty({
    example: '404',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Not found',
  })
  message: string;
}

export class Response400Dto {
  @ApiProperty({
    example: '400',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Name should not be empty',
  })
  message: string;

  @ApiProperty({
    example: 'Bad Request',
  })
  error: string;
}

export class Response409Dto {
  @ApiProperty({
    example: '409',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Name already exists',
  })
  message: string;

  @ApiProperty({
    example: 'Conflict',
  })
  error: string;
}
