# Medicine Management System

## Overview

This project is a Medicine Management System built with Node.js, Express, MongoDB, and EJS. It allows users to create, read, update, and delete medicine records, along with features for searching, filtering, sorting, caching, and image uploads.

## Features

- **CRUD Operations**:Create, read, update, and delete medicine records.

- **Search and Filtering**: Search medicines by name and filter by manufacturer, price range, and quantity range.

- **Sorting**: Sort medicines by name, price, and quantity.

- **Caching**: Cache medicine records to improve performance.

- **Image Upload**: Upload and display images for medicines.

## API Endpoints

### Medicines

#### Get All Medicines

- #### URL: '/medicines'
- #### Method: GET
- #### Query Parameters:

  - **search (optional)**: Search term to filter medicines by name.

  - **manufacturer (optional)**: Filter by manufacturer.

  - **sortByName (optional)**: Sort by name (name:asc or name:desc).

  - **sortByPrice (optional)**: Sort by price (price:asc or price:desc).

  - **sortByQuantity (optional)**: Sort by quantity (quantity:asc or quantity:desc).

### Create Medicine

- #### URL: /medicines
- #### Method: POST
- #### Form Data:

  - **name**: Name of the medicine.

  - **price**: Price of the medicine.

  - **discountPrice** (optional): Discounted price of the medicine.

  - **quantity**: Quantity of the medicine.

  - **manufacturer**: Manufacturer of the medicine.

  - **imageUrl** (optional): Image file of the medicine.

### Show Create Medicine Form

- #### URL: /medicines/new
- #### Method: GET

### Get Medicine by ID

- #### URL: /medicines/:id
- #### Method: GET
- #### URL Parameters:
  - **id**: ID of the medicine.

### Show Edit Medicine Form

- #### URL: /medicines/:id/edit
- #### Method: GET
- #### URL Parameters:
  - **id**: ID of the medicine.

### Update Medicine

- #### URL: /medicines/:id
- #### Method: PUT
- #### Form Data:

  - **name**: Name of the medicine.

  - **price**: Price of the medicine.

  - **discountPrice** (optional): Discounted price of the medicine.

  - **quantity**: Quantity of the medicine.

  - **manufacturer**: Manufacturer of the medicine.

  - **imageUrl** (optional): Image file of the medicine.

  - **existingImageUrl** (if no new image is uploaded).

### Delete Medicine

- #### URL: /medicines/:id
- #### Method: DELETE
- #### URL Parameters:
  - **id**: ID of the medicine.

## How to Run the Project

### Prerequisites

- #### Node.js
- #### MongoDB
- #### npm

Run the server:

npm start
Open your browser and navigate to:

http://localhost:3000

## Installation

Clone the repository

```bash
   git clone https://github.com/your-username/medicine-management.git
   cd medicine-management
   npm install

```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

PORT=3000

MONGO_URI=your_mongodb_connection_string

## Run Locally

Start the server

```bash
  npm start
```

Open the browser and navigate to

```bash
  http://localhost:3000
```

## Deployment

The project is deployed on Render. You can access it https://medicine-management.onrender.com

# Thank You
