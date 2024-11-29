const mockingoose = require("mockingoose");
const Category = require("../models/category.Model"); // Adjust the path to your Category model

describe("Category Model Tests", () => {
  beforeEach(() => {
    mockingoose.resetAll(); // Reset mock data before each test
  });

  test("should find category by name using query helper", async () => {
    const mockCategory = {
      _id: "63f6f5d67d9e0a0017b89a7c",
      name: "Electronics",
      description: "Category for electronic devices",
      imageUrls: "https://example.com/image.png",
      createdAt: new Date(),
    };

    // Mock Category.find() with a query helper
    mockingoose(Category).toReturn([mockCategory], "find");

    const categories = await Category.find().byName("Electronics");
    expect(categories).toHaveLength(1);
    expect(categories[0].name).toBe("Electronics");
  });

  test("should validate valid imageUrls", async () => {
    const validCategory = new Category({
      name: "Furniture",
      description: "Category for furniture",
      imageUrls: "https://example.com/image.png",
    });

    await expect(validCategory.validate()).resolves.not.toThrow();
  });

  test("should invalidate invalid imageUrls", async () => {
    const invalidCategory = new Category({
      name: "Clothing",
      description: "Category for clothing",
      imageUrls: "invalid-url",
    });

    try {
      await invalidCategory.validate(); // Trigger validation
    } catch (error) {
      expect(error.errors.imageUrls.message).toBe("Invalid URL");
    }
  });

  test("should default createdAt to the current date", async () => {
    const categoryData = {
      name: "Books",
      description: "Category for books",
      imageUrls: "https://example.com/image.png",
    };

    mockingoose(Category).toReturn(categoryData, "save");

    const category = new Category(categoryData);
    await category.save();

    expect(category.createdAt).toBeDefined();
  });
});
