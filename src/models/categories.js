import db from './db.js';

const getAllCategories = async () => {
  try {
    const query = `
      SELECT category_id, name
      FROM public.category;
    `;
    const result = await db.query(query);
    return result.rows; // array of { category_id, name }
  } catch (err) {
    console.error('Error fetching categories:', err);
    throw new Error('Could not retrieve categories');
  }
};

const getCategoryById = async (categoryId) => {
  try {
    const query = `
      SELECT category_id, name
      FROM category
      WHERE category_id = $1;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows[0] ?? null;
  } catch (err) {
    console.error('Error fetching category by id:', err);
    throw new Error('Could not retrieve category');
  }
};

const getCategoriesByProjectId = async (projectId) => {
  try {
    const query = `
      SELECT c.category_id, c.name
      FROM category AS c
      INNER JOIN project_category AS pc
        ON c.category_id = pc.category_id
      WHERE pc.project_id = $1
      ORDER BY c.name;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching categories for project:', err);
    throw new Error('Could not retrieve project categories');
  }
};

const getProjectsByCategoryId = async (categoryId) => {
  try {
    const query = `
      SELECT sp.project_id, sp.organization_id, sp.title, sp.description, sp.location, sp.project_date
      FROM public.service_project AS sp
      INNER JOIN project_category AS pc
        ON sp.project_id = pc.project_id
      WHERE pc.category_id = $1
      ORDER BY sp.project_date;
    `;
    const result = await db.query(query, [categoryId]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching projects for category:', err);
    throw new Error('Could not retrieve category projects');
  }
};

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getProjectsByCategoryId };
