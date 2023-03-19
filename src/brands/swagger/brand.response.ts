import { ApiProperty } from '@nestjs/swagger';

export class GetBrandResponse {
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
