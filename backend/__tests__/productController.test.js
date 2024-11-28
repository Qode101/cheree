const controller = require("../controllers/productController");
const productModel = require("../models/product.Model");
const { uploadOptimizeImage } = require("../utils/upload");
const { checkIdExists } = require("../utils/utilites");
const { AppError } = require("../utils/tryCatch");

jest.mock("../models/product.Model");
jest.mock("../utils/upload");
jest.mock("../utils/utilites");

describe("product creation", () => {
  it("creates a product with no image and category", async () => {
    // Mock request and response
    const req = {
      body: {
        name: "product1",
        price: 100,
        description: "description",
        stock: 10,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Mock productModel.create
    productModel.create.mockResolvedValue(req.body);

    // Call the controller function
    await controller.createProduct(req, res);

    // Assertions
    expect(productModel.create).toHaveBeenCalledWith(
      expect.objectContaining(req.body)
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining(req.body));
  });

  it("creates a product with image and category", async () => {
    const req = {
      body: {
        name: "product1",
        price: 100,
        description: "description",
        stock: 10,
        category: "category1",
      },
      files: {
        image: {
          tempFilePath: "path",
        },
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Mock dependencies
    checkIdExists.mockResolvedValue(true);
    uploadOptimizeImage.mockResolvedValue("url");
    productModel.create.mockResolvedValue({ ...req.body, imageUrl: "url" });

    // Call the controller function
    await controller.createProduct(req, res);

    // Assertions
    expect(checkIdExists).toHaveBeenCalledWith(
      req.body.category,
      expect.anything()
    );
    expect(uploadOptimizeImage).toHaveBeenCalledWith(
      "path",
      req.body.name.trim()
    );
    expect(productModel.create).toHaveBeenCalledWith(
      expect.objectContaining({
        ...req.body,
        imageUrl: "url",
      })
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "product1",
        price: 100,
        imageUrl: "url",
      })
    );
  });
});

// get product by id
describe("get product by id", () => {
  const product = {
    name: "product1",
    price: 100,
    description: "description",
    stock: 10,
  };
  it("get a product by id", async () => {
    const req = {
      params: {
        id: "product1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    productModel.findById.mockResolvedValue(product);

    await controller.getProduct(req, res);

    expect(productModel.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(product);
  });

  it("return 404 if product not found", async () => {
    const req = {
      params: {
        id: "product1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    productModel.findById.mockRejectedValue(null);

    await controller.getProduct(req, res);

    expect(productModel.findById).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Product not found" });
  });
});

// get product by name
describe("find product by name", () => {
  const product = {
    name: "product1",
    price: 100,
    description: "description",
    stock: 10,
  };
  it("get a product by name", async () => {
    const req = {
      query: {
        name: "product1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    productModel.find = jest.fn(() => ({
      byName: jest.fn().mockResolvedValue(product),
    }));

    await controller.find(req, res);

    expect(productModel.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(product);
  });

  it("returns 404 if product not found", async () => {
    const req = {
      query: {
        name: "product1",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    const next = jest.fn();

    // Mock the custom query helper
    productModel.find = jest.fn(() => ({
      byName: jest.fn().mockResolvedValue(null), // Simulates no product found
    }));

    await controller.find(req, res, next);

    expect(productModel.find).toHaveBeenCalled();
  });
});

// find product by price
describe("find product by price", () => {
  const product = {
    name: "product1",
    price: 100,
    description: "description",
    stock: 10,
  };
  const next = jest.fn();
  it("get a product by price", async () => {
    const req = {
      query: {
        price: 100,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    productModel.find.mockResolvedValue(product);

    await controller.find(req, res);

    expect(productModel.find).toHaveBeenCalledWith(req.query);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(product);
  });

  it("returns 400 if price is not a numver", async () => {
    const req = {
      query: {
        price: "2oob",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Mock the custom query helper
    productModel.find.mockRejectedValue("Invalid price");

    await controller.find(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});

// delete a product
describe("delete a product", () => {
  it("delete a product by id", async () => {
    const req = {
      params: {
        id: "2333332",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    checkIdExists.mockResolvedValue(true);
    productModel.findByIdAndDelete.mockResolvedValue({});

    await controller.deleteProduct(req, res);

    expect(productModel.findByIdAndDelete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Product has been deleted",
    });
  });
});

// update a product
describe("update a product", () => {
  it("update a product category", async () => {
    const req = {
      params: {
        id: "2333332",
      },
      body: {
        category: "category1",
      },
    };
    const updatedProduct = {
      name: "product1",
      price: 100,
      description: "description",
      stock: 10,
      category: "category1",
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    checkIdExists.mockResolvedValue(true);
    productModel.findByIdAndUpdate.mockResolvedValue(updatedProduct);

    await controller.updateProduct(req, res);

    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      req.body,
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedProduct);
  });
  // update a product with stock update
  it("update a product with stock update", async () => {
    const req = {
      params: {
        id: "2333332",
      },
      body: {
        stockUpdate: 10,
      },
    };
    const updatedProduct = {
      name: "product1",
      price: 100,
      description: "description",
      stock: 20,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    checkIdExists.mockResolvedValue(true);
    productModel.findByIdAndUpdate.mockResolvedValue(updatedProduct);

    await controller.updateProduct(req, res);

    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      { $inc: { stock: 10 } }, // Only `$inc` is passed
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedProduct);
  });

  // update poduct image
  it("update a product image", async () => {
    const req = {
      params: {
        id: "2333332",
      },
      body: {
        name: "product1",
        price: 100,
        description: "description",
        stock: 10,
      },
      files: {
        image: {
          tempFilePath: "path",
        },
      },
    };
    const updatedProduct = {
      name: "product1",
      price: 100,
      description: "description",
      stock: 10,
      imageUrl: "url",
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    checkIdExists.mockResolvedValue(true);
    uploadOptimizeImage.mockResolvedValue("url");
    productModel.findByIdAndUpdate.mockResolvedValue(updatedProduct);

    await controller.updateProduct(req, res);

    expect(uploadOptimizeImage).toHaveBeenCalledWith(
      "path",
      req.body.name.trim()
    );
    expect(productModel.findByIdAndUpdate).toHaveBeenCalledWith(
      req.params.id,
      {
        ...req.body,
        imageUrl: "url",
      },
      { new: true }
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedProduct);
  });
});
