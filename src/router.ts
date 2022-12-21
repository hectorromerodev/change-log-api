import { Router } from 'express';
import { body, validationResult, oneOf } from 'express-validator';
import { handleInputErrors } from './middlewares/validations';

const router = Router();

/**
 * @Products
 */

router.get('/product', (req, res) => {
        res.status(200);
        res.json({message: 'Hello product'});
    }); 
router.get('/product/:id', () => {});
router.put('/product/:id', body('name').isString(), handleInputErrors, (req, res) => {
        res.status(200);
        res.json({message: 'put product success'});
    });
router.post('/product', handleInputErrors, (req, res) => {
        res.status(200);
        res.json({message: 'post product success'});
    });
router.delete('/product/:id', () => {});

/**
 * @Updates
 */
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id', 
    body(['title', 'body', 'version']).optional().isString(), 
    body('status').isIn([
        'IN_PROGRESS',
        'SHIPPED',
        'DEPRECATED',
    ]),
    handleInputErrors,
    (req, res) => {
        res.status(200);
        res.json({message: 'post update success'});
    });
router.post('/update', 
    body(['title', 'body']).exists().isString(), 
    handleInputErrors,
    (req, res) => {
        res.status(200);
        res.json({message: 'post update success'});
    });
router.delete('/update/:id', () => {});

/**
 * @UpdatePoints
 */

router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', 
    body(['name', 'description']).optional().isString(),
    handleInputErrors,
    (req, res) => {
        res.status(200);
        res.json({message: 'put updatepoint success'});
    });
router.post('/updatepoint',
    body(['name', 'description','updateId']).exists().isString(),
    handleInputErrors,
    (req, res) => {
        res.status(200);
        res.json({message: 'post updatepoint success'});
    });
router.delete('/updatepoint/:id', () => {});


export default router;
