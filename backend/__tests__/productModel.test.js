const mockingoose = require("mockingoose");
const Product = require("../models/product.Model"); // Adjust the path to your Product model

describe("Product Model Test", () => {
  beforeEach(() => {
    mockingoose.resetAll(); // Reset mock data before each test
  });

  test("should set stock availability to false when stock is 0", async () => {
    const productData = {
      name: "Test Product",
      price: 100,
      description: "A sample product",
      category: "63f6f5d67d9e0a0017b89a7b", // Example ObjectId
      stock: 0,
    };

    mockingoose(Product).toReturn(productData, "save");

    const product = new Product(productData);
    await product.save();

    expect(product.stockAvailbility).toBe(false);
  });

  test("should set stock availability to true when stock is greater than 0", async () => {
    const productData = {
      name: "Test Product",
      price: 100,
      description: "A sample product",
      category: "63f6f5d67d9e0a0017b89a7b", // Example ObjectId
      stock: 10,
    };

    mockingoose(Product).toReturn(productData, "save");

    const product = new Product(productData);
    await product.save();

    expect(product.stockAvailbility).toBe(true);
  });

  test("should find product by name using query helper", async () => {
    const mockProduct = {
      _id: "63f6f5d67d9e0a0017b89a7c",
      name: "Sample Product",
      price: 50,
      description: "Mock product for testing",
      category: "63f6f5d67d9e0a0017b89a7b",
      stock: 5,
    };

    // Mock Product.find() with a query helper
    mockingoose(Product).toReturn([mockProduct], "find");

    const products = await Product.find().byName("Sample");
    expect(products).toHaveLength(1);
    expect(products[0].name).toBe("Sample Product");
  });

  test("should validate invalid imageUrl", async () => {
    const invalidProductData = {
      name: "Invalid Product",
      price: 25,
      description: "Product with invalid imageUrl",
      category: "63f6f5d67d9e0a0017b89a7b",
      stock: 10,
      imageUrl: "invalid-url",
    };

    const product = new Product(invalidProductData);

    try {
      await product.validate(); // Trigger validation
    } catch (error) {
      expect(error.errors.imageUrl.message).toBe("Invalid URL");
    }
  });

  test("should validate valid imageUrl", async () => {
    const validProductData = {
      name: "Valid Product",
      price: 25,
      description: "Product with valid imageUrl",
      category: "63f6f5d67d9e0a0017b89a7b",
      stock: 10,
      imageUrl: "https://example.com/image.png",
    };

    const product = new Product(validProductData);

    await expect(product.validate()).resolves.not.toThrow();
  });
});
