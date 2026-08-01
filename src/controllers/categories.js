import { body, validationResult } from 'express-validator';
import { getAllCategories, getCategoryById, getProjectsByCategoryId, getCategoriesByServiceProjectId, updateCategoryAssignments, createCategory, updateCategory } from '../models/categories.js';
import { getProjectDetails } from '../models/projects.js';

const categoriesPage = async (req, res) => {
  const categories = await getAllCategories();

  const title = 'Categories';
  res.render('categories', { title, categories });
};

const showCategoryDetailsPage = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);

  if (!category) {
    res.status(404).send('Category not found');
    return;
  }

  const projects = await getProjectsByCategoryId(categoryId);
  const title = category.name;
  res.render('category', { title, category, projects });
};

const showAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;

  const projectDetails = await getProjectDetails(projectId);
  const categories = await getAllCategories();
  const assignedCategories = await getCategoriesByServiceProjectId(projectId);

  const title = 'Assign Categories to Project';

  res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const showNewCategoryForm = async (req, res) => {
  const title = 'Add New Category';
  res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });
    return res.redirect('/new-category');
  }

  const { name } = req.body;

  try {
    await createCategory(name);
    req.flash('success', 'Category created successfully!');
    res.redirect('/categories');
  } catch (error) {
    console.error('Error creating category:', error);
    req.flash('error', 'There was an error creating the category.');
    res.redirect('/new-category');
  }
};

const showEditCategoryForm = async (req, res) => {
  const categoryId = req.params.id;
  const category = await getCategoryById(categoryId);

  if (!category) {
    res.status(404).send('Category not found');
    return;
  }

  const title = 'Edit Category';
  res.render('edit-category', { title, category });
};

const processEditCategoryForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors.array().forEach((error) => {
      req.flash('error', error.msg);
    });
    return res.redirect(`/edit-category/${req.params.id}`);
  }

  const categoryId = req.params.id;
  const { name } = req.body;

  try {
    await updateCategory(categoryId, name);
    req.flash('success', 'Category updated successfully!');
    res.redirect('/categories');
  } catch (error) {
    console.error('Error updating category:', error);
    req.flash('error', 'There was an error updating the category.');
    res.redirect(`/edit-category/${categoryId}`);
  }
};

const processAssignCategoriesForm = async (req, res) => {
  const projectId = req.params.projectId;
  const selectedCategoryIds = req.body.categories || req.body.categoryIds || [];

  const categoryIdsArray = Array.isArray(selectedCategoryIds)
    ? selectedCategoryIds
    : [selectedCategoryIds];

  const normalizedCategoryIds = categoryIdsArray
    .filter(Boolean)
    .map((categoryId) => Number(categoryId));

  try {
    await updateCategoryAssignments(projectId, normalizedCategoryIds);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
  } catch (error) {
    console.error('Error updating categories:', error);
    req.flash('error', 'There was a problem updating the categories.');
    res.redirect(`/project/${projectId}/assign-categories`);
  }
};

const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters')
];

export { categoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm, showNewCategoryForm, processNewCategoryForm, showEditCategoryForm, processEditCategoryForm, categoryValidation };