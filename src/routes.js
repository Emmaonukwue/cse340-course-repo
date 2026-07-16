import express from 'express';

import { homePage } from './controllers/index.js';
import { organizationsPage, OrganizationDetailsPage } from './controllers/organizations.js';
import { projectsPage, projectDetailsPage } from './controllers/projects.js';
import { categoriesPage } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);

// Route for organization details page
router.get('/organization/:id', OrganizationDetailsPage);
// Route for project details page
router.get('/project/:id', projectDetailsPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;