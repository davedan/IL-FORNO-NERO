import { Router } from 'express';
import healthCheck from './health-check.js';
import contact from './contact.js';

const router = Router();

export default () => {
    router.get('/health', healthCheck);
    router.post('/contact', contact);

    return router;
};

