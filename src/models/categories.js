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

const getCategoriesByServiceProjectId = async (projectId) => {
  try {
    const query = `
      SELECT c.category_id, c.name
      FROM public.category AS c
      INNER JOIN public.project_category AS pc
        ON c.category_id = pc.category_id
      WHERE pc.project_id = $1
      ORDER BY c.name;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
  } catch (err) {
    console.error('Error fetching assigned categories for project:', err);
    throw new Error('Could not retrieve assigned categories');
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
const assignCategoryToProject = async (categoryId, projectId) => {
  const query = `
        INSERT INTO project_category (category_id, project_id)
        VALUES ($1, $2);
    `;

  await db.query(query, [categoryId, projectId]);
}

const updateCategoryAssignments = async (projectId, categoryIds) => {
  // First, remove existing category assignments for the project
  const deleteQuery = `
        DELETE FROM project_category
        WHERE project_id = $1;
    `;
  await db.query(deleteQuery, [projectId]);

  // Next, add the new category assignments
  for (const categoryId of categoryIds) {
    await assignCategoryToProject(categoryId, projectId);
  }
}

export { getAllCategories, getCategoryById, getCategoriesByProjectId, getCategoriesByServiceProjectId, getProjectsByCategoryId, assignCategoryToProject, updateCategoryAssignments };
