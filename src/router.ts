import { Router } from 'express';

const router = Router();

/**
 * @Products
 */

router.get('/product', (req, res) => {
    res.status(200);
    res.json({message: 'Hello product'});
});
router.get('/product/:id', () => {});
router.put('/product/:id', () => {});
router.post('/product', () => {});
router.delete('/product/:id', () => {});

/**
 * @Updates
 */

router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put('/update/:id', () => {});
router.post('/update', () => {});
router.delete('/update/:id', () => {});


/**
 * @UpdatePoints
 */

router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});
router.put('/updatepoint/:id', () => {});
router.post('/updatepoint', () => {});
router.delete('/updatepoint/:id', () => {});


export default router;
