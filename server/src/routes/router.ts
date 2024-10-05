import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, deleteUser, getProductById, getProducts, updateAvailability, updateProduct } from "../controllers/product.controller";
import { handleInputErrors } from "../middleware";


const router = Router();


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



