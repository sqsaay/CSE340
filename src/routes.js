import express from 'express';

import { homePage } from './controllers/index.js';
import { organizationsPage } from './controllers/organizations.js';
import { projecstPage } from './controllers/projects.js';
import { categoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projecstPage);
router.get('/categories', categoriesPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;