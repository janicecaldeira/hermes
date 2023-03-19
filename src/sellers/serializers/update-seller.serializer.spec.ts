import { UpdateSellerSerializer } from './update-seller.serializer';

describe('UpdateSellerSerializer', () => {
  it('should create a serializer instance with correct properties', () => {
    const success = true;

    const serializer = new UpdateSellerSerializer();
    serializer.success = success;

    expect(serializer).toBeDefined();
    expect(serializer.success).toBe(success);
  });
});
