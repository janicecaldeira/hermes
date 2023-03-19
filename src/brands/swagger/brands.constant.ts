import { CreateBrandSerializer } from '../serializers/create-brand.serializer';
import { UpdateBrandSerializer } from '../serializers/update-brand.serializer';
import {
  GetBrandResponse,
  Response400Dto,
  Response404Dto,
  Response409Dto,
} from './brand.response';

export const GET_BRAND_OK_RESPONSE = {
  status: 200,
  description: 'Retorna uma lista de marcas cadastradas.',
  type: GetBrandResponse,
};

export const GET_BY_ID_BRAND_OK_RESPONSE = {
  status: 200,
  description: 'Retorna uma marca cadastrada.',
  type: GetBrandResponse,
};

export const GET_BY_ID_BRAND_404_RESPONSE = {
  status: 404,
  description: 'Brand not found',
  type: Response404Dto,
};

export const CREATE_BRAND_OK_RESPONSE = {
  status: 201,
  description: 'Cria e retorna uma marca.',
  type: CreateBrandSerializer,
};

export const CREATE_BRAND_400_RESPONSE = {
  status: 400,
  description: 'Nome da marca não deve estar vazio.',
  type: Response400Dto,
};

export const CREATE_BRAND_409_RESPONSE = {
  status: 409,
  description: 'Nome da marca tem que ser único.',
  type: Response409Dto,
};

export const UPDATE_BRAND_OK_RESPONSE = {
  status: 200,
  description: 'Atualiza uma marca.',
  type: UpdateBrandSerializer,
};

export const UPDATE_BRAND_400_RESPONSE = {
  status: 400,
  description: 'Nome da marca não deve estar vazio.',
  type: Response400Dto,
};

export const UPDATE_BRAND_404_RESPONSE = {
  status: 404,
  description: 'Marca não encontrada.',
  type: Response404Dto,
};

export const UPDATE_BRAND_409_RESPONSE = {
  status: 409,
  description: 'Nome da marca tem que ser único.',
  type: Response409Dto,
};

export const DELETE_BRAND_OK_RESPONSE = {
  status: 200,
  description: 'Exclui uma marca (soft delete).',
  type: UpdateBrandSerializer,
};

export const DELETE_BRAND_404_RESPONSE = {
  status: 404,
  description: 'Marca não encontrada.',
  type: Response404Dto,
};

export const PARAM_ID_BRAND = {
  type: 'string',
  name: 'id',
  description: 'ID da marca',
  required: true,
};
