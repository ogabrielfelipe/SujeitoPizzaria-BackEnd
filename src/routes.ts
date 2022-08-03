import {Router} from 'express';
import multer from 'multer';


import { CreateCategoryController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListByCategoryController } from './controllers/product/ListByCategoryController';

import { AuthUserController } from './controllers/user/AuthUserController';
import { CreateUserController } from './controllers/user/CreateUserController'
import { DetailUserController } from './controllers/user/DetailUserController';


import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer'

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoveOrderController } from './controllers/order/RemoveOrderController';
import { AddItemController } from './controllers/order/AddItemController';
import { RemoveItemController } from './controllers/order/RemoveItemController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersDraftFalseController } from './controllers/order/ListOrdersDraftFalseController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"))

//Rotas User
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/userinfo', isAuthenticated, new DetailUserController().handle)


//Rotas Category
router.post('/categories', isAuthenticated, new CreateCategoryController().handle)
router.get('/categories', isAuthenticated, new ListCategoryController().handle)


//Rotas Product
router.post('/products', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/productsbycategory', isAuthenticated,  new ListByCategoryController().handle)


//Rotas Order
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/additem', isAuthenticated, new AddItemController().handle)
router.delete('/order/removeitem', isAuthenticated, new RemoveItemController().handle)

router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrdersDraftFalseController().handle)
router.get('/orders/detail', isAuthenticated, new DetailOrderController().handle)


export { router };