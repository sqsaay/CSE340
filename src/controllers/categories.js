import { getAllCategories, getCategoryById, getProjectsByCategoryId, getCategoriesByServiceProjectId, updateCategoryAssignments } from '../models/categories.js';
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

export { categoriesPage, showCategoryDetailsPage, showAssignCategoriesForm, processAssignCategoriesForm };