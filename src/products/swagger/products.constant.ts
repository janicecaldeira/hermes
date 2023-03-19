import { CreateProductSerializer } from '../serializers/create-product.serializer';
import { UpdateProductSerializer } from '../serializers/update-product.serializer';
import {
  GetProductResponse,
  Response400Dto,
  Response404Dto,
  Response409Dto,
} from './product.response';

export const GET_PRODUCT_OK_RESPONSE = {
  status: 200,
  description:
    'Retorna uma lista de produtos cadastrados. Permite filtrar por parâmetros.',
  type: GetProductResponse,
};

export const GET_BY_SLUG_PRODUCT_OK_RESPONSE = {
  status: 200,
  description: 'Retorna um produto cadastrado.',
  type: GetProductResponse,
};

export const GET_BY_SLUG_PRODUCT_404_RESPONSE = {
  status: 404,
  description: 'Produto não encontrado.',
  type: Response404Dto,
};

export const GET_BY_ID_PRODUCT_OK_RESPONSE = {
  status: 200,
  description: 'Retorna um produto cadastrado.',
  type: GetProductResponse,
};

export const GET_BY_ID_PRODUCT_404_RESPONSE = {
  status: 404,
  description: 'Produto não encontrado.',
  type: Response404Dto,
};

export const CREATE_PRODUCT_OK_RESPONSE = {
  status: 201,
  description: 'Cria e retorna um produto.',
  type: CreateProductSerializer,
};

export const CREATE_PRODUCT_400_RESPONSE = {
  status: 400,
  description: 'Nome do produto não deve estar vazio.',
  type: Response400Dto,
};

export const CREATE_PRODUCT_409_RESPONSE = {
  status: 409,
  description: 'Nome do produto tem que ser único.',
  type: Response409Dto,
};

export const UPDATE_PRODUCT_OK_RESPONSE = {
  status: 200,
  description: 'Atualiza um produto.',
  type: UpdateProductSerializer,
};

export const UPDATE_PRODUCT_400_RESPONSE = {
  status: 400,
  description: 'Nome do produto não deve estar vazio.',
  type: Response400Dto,
};

export const UPDATE_PRODUCT_404_RESPONSE = {
  status: 404,
  description: 'Produto não encontrado.',
  type: Response404Dto,
};

export const UPDATE_PRODUCT_409_RESPONSE = {
  status: 409,
  description: 'Nome do produto tem que ser único.',
  type: Response409Dto,
};

export const DELETE_PRODUCT_OK_RESPONSE = {
  status: 200,
  description: 'Exclui um produto (soft delete).',
  type: UpdateProductSerializer,
};

export const DELETE_PRODUCT_404_RESPONSE = {
  status: 404,
  description: 'Produto não encontrado.',
  type: Response404Dto,
};

export const PARAM_SLUG_PRODUCT = {
  type: 'string',
  name: 'slug',
  description: 'Slug do produto',
  required: true,
};

export const PARAM_ID_PRODUCT = {
  type: 'string',
  name: 'id',
  description: 'ID do produto',
  required: true,
};
