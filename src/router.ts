import { Router } from 'express';
import { body, validationResult, oneOf } from 'express-validator';
import { handleInputErrors } from './middlewares/validations';
import { createProduct, deleteProduct, getOneProduct, getProducts, updateProduct } from './handlers/product';
import { createUpdate, deleteUpdate, getOneUpdate, getUpdates, updateUpdate } from './handlers/update';
import errorHandler from './handlers/errorHandler';

const router = Router();

/**
 * @Products
 */

router.get('/product', getProducts )
router.get('/product/:id', getOneProduct);
router.put('/product/:id', body('name').isString(), handleInputErrors, updateProduct);
router.post('/product', body("name").isString(), handleInputErrors, createProduct);
router.delete('/product/:id', deleteProduct);

/**
 * @Updates
 */
router.get('/update', getUpdates);
router.get('/update/:id',getOneUpdate);
router.put('/update/:id', 
    body(['title', 'body', 'version']).optional().isString(), 
    body('status').isIn([
        'IN_PROGRESS',
        'SHIPPED',
        'DEPRECATED',
    ]).optional(),
    handleInputErrors,
    updateUpdate);
router.post('/update', 
    body(['title', 'body', 'productId']).exists().isString(),
    handleInputErrors,
    createUpdate);
router.delete('/update/:id',deleteUpdate);

/**
 * @UpdatePoints
 */

// Point
router.get('/updatepoint', getUpdates);
router.get('/updatepoint/:id', getOneUpdate);
router.put('/updatepoint/:id', 
    body(['name', 'description']).optional().isString(),
    handleInputErrors,
    updateUpdate);
router.post('/updatepoint',
    body(['name', 'description','updateId']).exists().isString(),
    handleInputErrors,
    createUpdate);
router.delete('/updatepoint/:id', deleteUpdate);

router.use(errorHandler)

export default router;
