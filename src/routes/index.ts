import { Router } from "express";

import userRoutes from './user.routes'
import dialogRoutes from './dialog.routes'

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/dialog', dialogRoutes);

export default routes;
