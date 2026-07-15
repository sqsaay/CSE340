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

export { getAllCategories };
