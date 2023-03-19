import { CreateProductSerializer } from './create-product.serializer';

describe('CreateProductSerializer', () => {
  it('should create a serializer instance with correct properties', () => {
    const id = 1;
    const name = 'Test Product';
    const slug = 'test-product';
    const price = 9.99;
    const createdAt = new Date();
    const updatedAt = new Date();
    const deletedAt = null;
    const brandId = 2;
    const sellerId = 3;

    const serializer = new CreateProductSerializer();
    serializer.id = id;
    serializer.name = name;
    serializer.slug = slug;
    serializer.price = price;
    serializer.createdAt = createdAt;
    serializer.updatedAt = updatedAt;
    serializer.deletedAt = deletedAt;
    serializer.brandId = brandId;
    serializer.sellerId = sellerId;

    expect(serializer).toBeDefined();
    expect(serializer.id).toBe(id);
    expect(serializer.name).toBe(name);
    expect(serializer.slug).toBe(slug);
    expect(serializer.price).toBe(price);
    expect(serializer.createdAt).toBe(createdAt);
    expect(serializer.updatedAt).toBe(updatedAt);
    expect(serializer.deletedAt).toBe(deletedAt);
    expect(serializer.brandId).toBe(brandId);
    expect(serializer.sellerId).toBe(sellerId);
  });
});
