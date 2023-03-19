import { UpdateBrandSerializer } from './update-brand.serializer';

describe('UpdateBrandSerializer', () => {
  it('should create a serializer instance with correct properties', () => {
    const success = true;

    const serializer = new UpdateBrandSerializer();
    serializer.success = success;

    expect(serializer).toBeDefined();
    expect(serializer.success).toBe(success);
  });
});
