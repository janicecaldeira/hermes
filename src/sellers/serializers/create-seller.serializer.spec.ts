import { CreateSellerSerializer } from './create-seller.serializer';

describe('CreateSellerSerializer', () => {
  it('should create a serializer instance with correct properties', () => {
    const id = 1;
    const name = 'Test Seller';
    const createdAt = new Date();
    const updatedAt = new Date();
    const deletedAt = null;

    const serializer = new CreateSellerSerializer();
    serializer.id = id;
    serializer.name = name;
    serializer.createdAt = createdAt;
    serializer.updatedAt = updatedAt;
    serializer.deletedAt = deletedAt;

    expect(serializer).toBeDefined();
    expect(serializer.id).toBe(id);
    expect(serializer.name).toBe(name);
    expect(serializer.createdAt).toBe(createdAt);
    expect(serializer.updatedAt).toBe(updatedAt);
    expect(serializer.deletedAt).toBe(deletedAt);
  });
});
