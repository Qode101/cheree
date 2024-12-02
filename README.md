# Cheree

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


Here's an updated and more comprehensive README section for running the API and creating a product:

---

## How to Run APIs

### 1. **Start the Server**
Before making any API calls, ensure the server is running. Follow these steps:

1. Install dependencies:  
   ```bash
   npm install
   ```
2. Start the server:  
   ```bash
   npm run dev
   ```
   The API will run on the default port (e.g., `http://localhost:000`) unless otherwise configured.

---

### 2. **Create a Product**
To create a product, use the following API endpoint:

**Endpoint:**  
`POST /products/create`  

**Request Format:**  
- **Headers:**  
  - `Content-Type: multipart/form-data`  

- **Body:**  
  Send a `multipart/form-data` request with the following fields:
  - `name` (string, required): Name of the product.  
  - `price` (number, required): Price of the product.  
  - `description` (string, required): Description of the product.  
  - `category` (string, optional): ID of the category the product belongs to.  
  - `stock` (number, required): Quantity of the product in stock.  
  - `images` (file(s), optional): One or more image files for the product.  

**Example cURL Request:**
```bash
curl -X POST http://localhost:3000/products/create \
-H "Content-Type: multipart/form-data" \
-F "name=Example Product" \
-F "price=100" \
-F "description=A great product" \
-F "category=605c72ddf1f3a024d8a64b8e" \
-F "stock=50" \
-F "images=@/path/to/image1.jpg" \
-F "images=@/path/to/image2.jpg"
```

**Response:**  
On success, the API will return a `201 Created` response with the created product details:
```json
{
  "_id": "648ad5f1f3a024d8a1234567",
  "name": "Example Product",
  "price": 100,
  "description": "A great product",
  "category": "605c72ddf1f3a024d8a64b8e",
  "stock": 50,
  "imageUrls": [
    "https://cloudinary.com/example1.jpg",
    "https://cloudinary.com/example2.jpg"
  ],
  "stockAvailbility": true,
  "date": "2024-11-21T08:00:00.000Z"
}
```
