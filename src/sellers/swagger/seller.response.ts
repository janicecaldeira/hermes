import { ApiProperty } from '@nestjs/swagger';

export class GetSellerResponse {
  @ApiProperty({
    description: 'ID do vendedor.',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nome do vendedor.',
    example: 'Centauro',
  })
  name: string;

  @ApiProperty({
    description: 'Data de criação do vendedor.',
    example: '2023-03-18T22:38:45.996Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Data de atualização do vendedor.',
    example: '2023-03-18T22:38:45.996Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Data de exclusão do vendedor quando aplicável.',
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
