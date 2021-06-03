import { Router } from "express";

import userRoutes from './user.routes'
import dialogRoutes from './dialog.routes'

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/dialogs', dialogRoutes);

export default routes;
