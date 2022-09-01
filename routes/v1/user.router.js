const userRouter = require('express').Router();
const UserController = require('../../controllers/userController');
const restrict = require('../../middlewares/restrict');

// @ /api/v1/user

userRouter.get('/', restrict, UserController.getUsers);
userRouter.get('/:id', restrict, UserController.getUserById);
userRouter.put('/:id', restrict, UserController.updateUser);
userRouter.delete('/:id', restrict, UserController.deleteUser);

module.exports = userRouter;
