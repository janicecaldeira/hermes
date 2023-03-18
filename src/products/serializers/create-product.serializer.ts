export class CreateProductSerializer {
  id: number;
  name: string;
  slug: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
  brandId: number;
  sellerId: number;
}
