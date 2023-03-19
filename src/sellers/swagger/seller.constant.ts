import { CreateSellerSerializer } from '../serializers/create-seller.serializer';
import { UpdateSellerSerializer } from '../serializers/update-seller.serializer';
import {
  GetSellerResponse,
  Response400Dto,
  Response404Dto,
} from './seller.response';

export const GET_SELLER_OK_RESPONSE = {
  status: 200,
  description: 'Retorna uma lista de vendedores cadastrados.',
  type: GetSellerResponse,
};

export const GET_BY_ID_SELLER_OK_RESPONSE = {
  status: 200,
  description: 'Retorna um vendedor cadastrado.',
  type: GetSellerResponse,
};

export const GET_BY_ID_SELLER_404_RESPONSE = {
  status: 404,
  description: 'Vendedor não encontrado.',
  type: Response404Dto,
};

export const CREATE_SELLER_OK_RESPONSE = {
  status: 201,
  description: 'Cria e retorna um vendedor.',
  type: CreateSellerSerializer,
};

export const CREATE_SELLER_400_RESPONSE = {
  status: 400,
  description: 'Nome do vendedor não deve estar vazio.',
  type: Response400Dto,
};

export const UPDATE_SELLER_OK_RESPONSE = {
  status: 200,
  description: 'Atualiza um vendedor.',
  type: UpdateSellerSerializer,
};

export const UPDATE_SELLER_404_RESPONSE = {
  status: 404,
  description: 'Vendedor não encontrado.',
  type: Response404Dto,
};

export const UPDATE_SELLER_400_RESPONSE = {
  status: 400,
  description: 'Nome do vendedor não deve estar vazio.',
  type: Response400Dto,
};

export const DELETE_SELLER_OK_RESPONSE = {
  status: 200,
  description: 'Exclui um vendedor (soft delete).',
  type: UpdateSellerSerializer,
};

export const DELETE_SELLER_404_RESPONSE = {
  status: 404,
  description: 'Vendedor não encontrado.',
  type: Response404Dto,
};

export const PARAM_ID_SELLER = {
  type: 'string',
  name: 'id',
  description: 'ID do vendedor',
  required: true,
};
