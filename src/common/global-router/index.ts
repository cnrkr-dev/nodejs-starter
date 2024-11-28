import { Router } from 'express';
import { AppRoutes } from '../../apps';

const router = Router();

router.use('/', AppRoutes);

export default router;
