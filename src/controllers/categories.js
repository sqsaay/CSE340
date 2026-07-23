import { getAllCategories, getCategoryById, getProjectsByCategoryId } from '../models/categories.js';

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

export { categoriesPage, showCategoryDetailsPage };