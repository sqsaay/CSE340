import express from 'express';
import { showUserRegistrationForm, processUserRegistrationForm, showLoginForm, processLoginForm, processLogout, requireLogin, showDashboard, requireRole, showUsersList } from './controllers/users.js';
import { homePage } from './controllers/index.js';
import { organizationsPage, showOrganizationDetailsPage, showNewOrganizationForm, processNewOrganizationForm, organizationValidation, showEditOrganizationForm, processEditOrganizationForm } from './controllers/organizations.js';
import { showProjectsPage, showProjectDetailsPage, showNewProjectForm, showEditProjectForm, processNewProjectForm, processEditProjectForm, projectValidation } from './controllers/projects.js';
import { processAddVolunteer, processRemoveVolunteer, showVolunteeringPage } from './controllers/volunteers.js';
import { categoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation } from './controllers/categories.js';
import { testErrorPage } from './controllers/errors.js';

const router = express.Router();

// Public home route
router.get('/', homePage);

// Organization routes (Public view)
router.get('/organizations', organizationsPage);
router.get('/organization/:id', showOrganizationDetailsPage);

// Admin-only Organization management routes
router.get('/new-organization', requireRole('admin'), showNewOrganizationForm);
router.post('/new-organization', requireRole('admin'), organizationValidation, processNewOrganizationForm);
router.get('/edit-organization/:id', requireRole('admin'), showEditOrganizationForm);
router.post('/edit-organization/:id', requireRole('admin'), organizationValidation, processEditOrganizationForm);

// Project routes (Public view)
router.get('/projects', showProjectsPage);
router.get('/project/:id', showProjectDetailsPage);

// Protected Volunteer routes for projects (Requires logged-in user)
router.get('/volunteering', requireLogin, showVolunteeringPage);
router.post('/project/:id/volunteer', requireLogin, processAddVolunteer);
router.get('/project/:id/volunteer', requireLogin, processAddVolunteer);
router.post('/project/:id/unvolunteer', requireLogin, processRemoveVolunteer);
router.get('/project/:id/unvolunteer', requireLogin, processRemoveVolunteer);
router.post('/volunteer/:id', requireLogin, processAddVolunteer);
router.get('/volunteer/:id', requireLogin, processAddVolunteer);
router.post('/unvolunteer/:id', requireLogin, processRemoveVolunteer);
router.get('/unvolunteer/:id', requireLogin, processRemoveVolunteer);

// Admin-only Project management routes
router.get('/new-project', requireRole('admin'), showNewProjectForm);
router.post('/new-project', requireRole('admin'), projectValidation, processNewProjectForm);
router.get('/edit-project/:id', requireRole('admin'), showEditProjectForm);
router.post('/edit-project/:id', requireRole('admin'), projectValidation, processEditProjectForm);

// Category routes (Public view)
router.get('/categories', categoriesPage);
router.get('/category/:id', showCategoryDetailsPage);

// Admin-only Category management routes
router.get('/new-category', requireRole('admin'), showNewCategoryForm);
router.post('/new-category', requireRole('admin'), categoryValidation, processNewCategoryForm);
router.get('/edit-category/:id', requireRole('admin'), showEditCategoryForm);
router.post('/edit-category/:id', requireRole('admin'), categoryValidation, processEditCategoryForm);

// Admin-only Assign Categories routes
router.get('/project/:projectId/assign-categories', requireRole('admin'), showAssignCategoriesForm);
router.post('/project/:projectId/assign-categories', requireRole('admin'), processAssignCategoriesForm);
router.get('/assign-categories/:projectId', requireRole('admin'), showAssignCategoriesForm);
router.post('/assign-categories/:projectId', requireRole('admin'), processAssignCategoriesForm);

// User registration routes
router.get('/register', showUserRegistrationForm);
router.post('/register', processUserRegistrationForm);

// User login routes
router.get('/login', showLoginForm);
router.post('/login', processLoginForm);
router.get('/logout', processLogout);

// Protected user dashboard route
router.get('/dashboard', requireLogin, showDashboard);

// Admin-only user management route
router.get('/users', requireRole('admin'), showUsersList);

// Error-handling routes
router.get('/test-error', testErrorPage);

export default router;