import express from 'express';

import { homePage } from './controllers/index.js';
import { 
    organizationsPage, organizationDetailsPage, 
    newOrganizationForm, processNewOrganizationForm, 
    organizationValidation, editOrganizationForm, 
    processEditOrganizationForm } from './controllers/organizations.js';
import { projectsPage, projectDetailsPage, 
        newProjectForm, processNewProjectForm, 
        projectValidation, processEditProjectForm,
        editProjectForm} from './controllers/projects.js';
import { categoriesPage, categoryDetailsPage, 
    assignCategoriesForm, processAssignCategoriesForm, 
    newCategoryForm, processNewCategoryForm, 
    categoryValidation, editCategoryForm, 
    processEditCategoryForm } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';
import { userRegistrationForm, processUserRegistrationForm, loginForm, 
    processLoginForm, processLogout, requireLogin, requireRole
 } from './controllers/users.js';
 import { dashboardPage } from './controllers/dashboard.js';

const router = express.Router();

router.get('/', homePage);
router.get('/organizations', organizationsPage);
router.get('/projects', projectsPage);
router.get('/categories', categoriesPage);

// Route for organization details page
router.get('/organization/:id', organizationDetailsPage);
// Route for project details page
router.get('/project/:id', projectDetailsPage);
router.get('/category/:id', categoryDetailsPage);

// Route for new organization page
router.get('/new-organization', requireRole('admin'), newOrganizationForm);
// Route to handle new organization form submission
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
// Route to display the edit organization form
router.get('/edit-organization/:id', requireRole('admin'), editOrganizationForm);
// Route to handle edit organization form submission
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Route for new project page
router.get('/new-project', requireRole('admin'), newProjectForm);
// Route to handle new project form submission
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
// Route for edit service project form
router.get('/edit-project/:id', requireRole('admin'), editProjectForm);
// Route to handle edit service project form submission
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// Route for assign categories to project page
router.get('/assign-categories/:projectId', requireRole('admin'), assignCategoriesForm);
// Route to handle the assign categories to project submission
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// Route for new category page
router.get('/new-category', requireRole('admin'), newCategoryForm);
// Route to handle new category form submission
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
// Route for edit category form
router.get('/edit-category/:id', requireRole('admin'), editCategoryForm);
// Route to handle edit category form submission
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// User registration routes
router.get('/register', userRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', loginForm);
router.post('/login', processLoginForm);    
// User logout route
router.get('/logout', processLogout);

// Dashboard route (requires login)
router.get('/dashboard', requireLogin, dashboardPage);

// error-handling routes
router.get('/test-error', testErrorPage);

export default router;