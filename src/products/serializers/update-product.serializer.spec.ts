import { UpdateProductSerializer } from './update-product.serializer';

describe('UpdateProductSerializer', () => {
  it('should create a serializer instance with correct properties', () => {
    const success = true;

    const serializer = new UpdateProductSerializer();
    serializer.success = success;

    expect(serializer).toBeDefined();
    expect(serializer.success).toBe(success);
  });
});
