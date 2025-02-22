import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteUser, getProductById, getProducts, updateAvailability, updateProduct } from "../controllers/product.controller";
import { handleInputErrors } from "../middleware";


const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Product ID
 *           example: 1
 *         name:
 *           type: string
 *           description: Product name
 *           example: "Monitor 42 pulgadas"
 *         price:
 *           type: number
 *           description: Product price
 *           example: 299
 *         availability:
 *           type: boolean
 *           description: Product availability
 *           example: true
 */

/**
*@swagger
* /api/products:
*      get:
*          summary: Get a list of products
*          tags:
*               - Products
*          description: Return a list of products
*          responses: 
*               200:
*                   description: Successful response
*                   content:
*                      application/json:
*                         schema:
*                             type: array
*                             items: 
*                               $ref: '#/components/schemas/Product'
* 
* 
* 
* 
*/

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get a product by id
 *     tags:
 *       - Products
 *     description: Return a product based on its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/products/{id}:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     description: Returns a new product
 *     requestBody: 
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          example: "Monitor LCD 42 pulgadas"
 *                      price:
 *                          type: number
 *                          example: 299
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Bad request - Invalid input data
 * 
 */

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     tags:
 *       - Products
 *     description: Returns the updated product
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody: 
 *          required: true
 *          content:
 *             application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      name:
 *                          type: string
 *                          example: "Monitor LCD 42 pulgadas"
 *                      price:
 *                          type: number
 *                          example: 299
 *                      availability:
 *                          type: boolean
 *                          example: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request - Invalid ID or input data
 */

/**
 * @swagger 
 *  /api/products/{id}:
 *   patch:
 *     summary: Update a product availabilty
 *     tags:
 *       - Products
 *     description: Returns the updated product availability
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request - Invalid ID
 */

/**
 * @swagger 
 *  /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags:
 *       - Products
 *     description: Returns a message indicating that the product was deleted
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Product ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               value: "Product deleted successfully"
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request - Invalid ID
 */


router.get('/', getProducts);

router.get('/:id',
    param('id').isInt().withMessage('Not valid ID'),
    handleInputErrors,
    getProductById);

router.put('/:id',
    param('id').isInt().withMessage('Not valid ID'),
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .custom(value => value > 0).withMessage('Price must be greater than 0')
        .notEmpty().withMessage('Price is required'),
    body('availability')
        .isBoolean().withMessage('Availability must be a boolean'),
    handleInputErrors,
    updateProduct);

router.patch('/:id',
    param('id').isInt().withMessage('Not valid ID'),
    handleInputErrors,
    updateAvailability);

router.post('/',
    // Validacion con express
    body('name')
        .notEmpty().withMessage('Name is required'),
    body('price')
        .isNumeric().withMessage('Price must be a number')
        .custom(value => value > 0).withMessage('Price must be greater than 0')
        .notEmpty().withMessage('Price is required'),
    handleInputErrors,
    createProduct)

router.delete('/:id',
    param('id').isInt().withMessage('Not valid ID'),
    handleInputErrors,
    deleteUser);

export default router;



