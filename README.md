{
	"info": {
		"_postman_id": "2fdaf4c8-4372-4b4e-86a2-97d6b38d5b5c",
		"name": "e-commerce",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "30170877"
	},
	"item": [
		{
			"name": "Category",
			"item": [
				{
					"name": "All Categories",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/categories?page=1&limit=8",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"categories"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "limit",
									"value": "8"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "Category By Id",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/categories/656dfc99c0ce0c314841e553",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"categories",
								"656dfc99c0ce0c314841e553"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create Category",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\":\"Phones\"\r\n    \r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/api/categories",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"categories"
							]
						},
						"description": "Create new Category"
					},
					"response": []
				},
				{
					"name": "Update Category",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\":\"Electronics\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/api/categories/656e12648c4dc53d11c6118f",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"categories",
								"656e12648c4dc53d11c6118f"
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete Category",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/categories/656e0e0e88b22608adddb949",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"categories",
								"656e0e0e88b22608adddb949"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "SubCategory",
			"item": [
				{
					"name": "All SubCategories",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/subcategories?page=1&limit=8",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"subcategories"
							],
							"query": [
								{
									"key": "page",
									"value": "1"
								},
								{
									"key": "limit",
									"value": "8"
								}
							]
						}
					},
					"response": []
				},
				{
					"name": "SubCategory By Id",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/subcategories/657c01f287a6d1c94ed45a6d",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"subcategories",
								"657c01f287a6d1c94ed45a6d"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create SubCategory",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\":\"Smart Home\"\r\n    \r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000//api/categories",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"",
								"api",
								"categories"
							]
						}
					},
					"response": []
				},
				{
					"name": "Update SubCategory",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\":\"Electronics\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/api/subcategories/656e12648c4dc53d11c6118f",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"subcategories",
								"656e12648c4dc53d11c6118f"
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete SubCategory",
					"request": {
						"method": "DELETE",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/subcategories/6594a4087e1c576e50cd8e6a",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"subcategories",
								"6594a4087e1c576e50cd8e6a"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Category_Sub",
			"item": [
				{
					"name": "Get Subcategories of a specific Category",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/categories/656dfcc4c0ce0c314841e558/subcategories",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"categories",
								"656dfcc4c0ce0c314841e558",
								"subcategories"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create Subcategory on Category",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\":\"PHP\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/api/categories/656dfcc4c0ce0c314841e558/subcategories",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"categories",
								"656dfcc4c0ce0c314841e558",
								"subcategories"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Brands",
			"item": [
				{
					"name": "Get All Brands",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/brands",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"brands"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create Brand",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\":\"Nike\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/api/brands",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"brands"
							]
						}
					},
					"response": []
				},
				{
					"name": "Get Specific Brand",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/brands/65c51148c27f7a157680e5d2",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"brands",
								"65c51148c27f7a157680e5d2"
							]
						}
					},
					"response": []
				},
				{
					"name": "Update Brand",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"name\":\"Zara\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/api/brands/65c51148c27f7a157680e5d2",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"brands",
								"65c51148c27f7a157680e5d2"
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete Brand",
					"request": {
						"method": "DELETE",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/api/brands/65c51148c27f7a157680e5d2",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"brands",
								"65c51148c27f7a157680e5d2"
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "Products",
			"item": [
				{
					"name": "Get All Products",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/products",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"products"
							]
						}
					},
					"response": []
				},
				{
					"name": "Create Product",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"title\": \"Mens Cotton Jacket\",\r\n    \"quantity\": 20,\r\n    \"sold\": 75,\r\n    \"price\": 55.99,\r\n    \"description\": \"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.\",\r\n    \"category\": \"656dfcc4c0ce0c314841e558\",\r\n    \"subcategories\":[\"65bddc2fd6fb178da12e9da6\",\"65bddc35d6fb178da12e9da5\"],\r\n    \"imageCover\": \"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg\",\r\n    \"ratingsAverage\": 4.0,\r\n    \"ratingsQuantity\": 70\r\n  }",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/api/product",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"product"
							]
						}
					},
					"response": []
				},
				{
					"name": "Get Specific Product",
					"request": {
						"method": "GET",
						"header": [],
						"url": {
							"raw": "http://localhost:4000/api/products/65c06caf428e46d5d65b1106",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"products",
								"65c06caf428e46d5d65b1106"
							]
						}
					},
					"response": []
				},
				{
					"name": "Update Product",
					"request": {
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/api/products/65c06caf428e46d5d65b1106",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"products",
								"65c06caf428e46d5d65b1106"
							]
						}
					},
					"response": []
				},
				{
					"name": "Delete Product",
					"request": {
						"method": "DELETE",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:4000/api/products/65c06caf428e46d5d65b1106",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "4000",
							"path": [
								"api",
								"products",
								"65c06caf428e46d5d65b1106"
							]
						}
					},
					"response": []
				}
			]
		}
	]
}
