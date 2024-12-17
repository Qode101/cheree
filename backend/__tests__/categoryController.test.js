const {
  createCategory,
  getCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");
const { uploadOptimizeImage } = require("../utils/upload");
const categoryModel = require("../models/category.Model");

jest.mock("../utils/upload");
jest.mock("../models/category.Model");

describe("Create category", () => {
  // test with no image
  it("create a category with no image", async () => {
    const req = {
      body: {
        name: "test",
        description: "test",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const category = {
      name: "test",
      description: "test",
    };

    categoryModel.create.mockResolvedValue(category);

    await createCategory(req, res); // Call the actual createCategory function

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(category);
    expect(uploadOptimizeImage).not.toHaveBeenCalled();
    expect(categoryModel.create).toHaveBeenCalled();
  });
  it("create a category", async () => {
    const req = {
      body: {
        name: "test",
        description: "test",
      },
      files: {
        image: {
          tempFilePath: "test",
        },
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const category = {
      name: "test",
      description: "test",
      imageUrl: "test",
    };

    categoryModel.create.mockResolvedValue(category);
    uploadOptimizeImage.mockResolvedValue("test");

    await createCategory(req, res); // Call the actual createCategory function

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(category);
    expect(uploadOptimizeImage).toHaveBeenCalledWith("test");
    expect(categoryModel.create).toHaveBeenCalled();
  });
});

// test get category by id
describe("Get category by id", () => {
  // test with valid id
  it("get category by id", async () => {
    const req = {
      params: {
        id: "test",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const category = {
      name: "test",
      description: "test",
    };

    categoryModel.findById.mockResolvedValue(category);

    await getCategory(req, res); // Call the actual getCategory function

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(category);
    expect(categoryModel.findById).toHaveBeenCalled();
  });

  it("get category by id with invalid id", async () => {
    const req = {
      params: {
        id: "test",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    categoryModel.findById.mockResolvedValue(null);

    await getCategory(req, res); // Call the actual getCategory function

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Category not found" });
    expect(categoryModel.findById).toHaveBeenCalled();
  });
});

describe("Update category", () => {
  it("should update a category with image optimization", async () => {
    const req = {
      params: { id: "123" },
      body: {
        name: "Updated Name",
        description: "Updated Description",
      },
      files: {
        image: {
          tempFilePath: "path/to/image.jpg",
        },
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const updatedCategory = {
      _id: "123",
      name: "Updated Name",
      description: "Updated Description",
      imageUrl: "optimized-image-url",
    };

    categoryModel.findByIdAndUpdate.mockResolvedValue(updatedCategory);
    uploadOptimizeImage.mockResolvedValue("optimized-image-url");

    await updateCategory(req, res);

    expect(uploadOptimizeImage).toHaveBeenCalledWith("path/to/image.jpg");
    expect(categoryModel.findByIdAndUpdate).toHaveBeenCalledWith(
      "123",
      {
        name: "Updated Name",
        description: "Updated Description",
        imageUrl: "optimized-image-url",
      },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedCategory);
  });

  it("should return 404 if category not found", async () => {
    const req = {
      params: { id: "123" },
      body: {
        name: "Updated Name",
        description: "Updated Description",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    categoryModel.findByIdAndUpdate.mockResolvedValue(null);

    await updateCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Category not found" });
  });
});

describe("Delete category", () => {
  it("should delete a category successfully", async () => {
    const req = {
      params: { id: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    categoryModel.findByIdAndDelete.mockResolvedValue(true);

    await deleteCategory(req, res);

    expect(categoryModel.findByIdAndDelete).toHaveBeenCalledWith("123");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Category has been deleted",
    });
  });

  it("should handle errors during deletion", async () => {
    const req = {
      params: { id: "123" },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    categoryModel.findByIdAndDelete.mockRejectedValue(
      new Error("Deletion error")
    );

    await deleteCategory(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Deletion error" });
  });
});
