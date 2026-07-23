import db from './db.js'

const getAllServiceProjects = async () => {
  const query = `
        SELECT project_id, organization_id, title, description, location, project_date
      FROM public.service_project;
    `;

  const result = await db.query(query);

  return result.rows;
}

const getProjectsByOrganizationId = async (organizationId) => {
  const query = `
        SELECT
          project_id,
          organization_id,
          title,
          description,
          location,
          project_date
        FROM service_project
        WHERE organization_id = $1
        ORDER BY project_date;
      `;

  const queryParams = [organizationId];
  const result = await db.query(query, queryParams);

  return result.rows;
};


const getUpcomingProjects = async (number_of_projects = 5) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.project_date AS date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM service_project AS sp
    INNER JOIN public.organization AS o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_date >= CURRENT_DATE
    ORDER BY sp.project_date
    LIMIT $1;
  `;
  const result = await db.query(query, [number_of_projects]);
  return result.rows;
};

const getProjectDetails = async (id) => {
  const query = `
    SELECT
      sp.project_id,
      sp.title,
      sp.description,
      sp.project_date AS date,
      sp.location,
      sp.organization_id,
      o.name AS organization_name
    FROM service_project AS sp
    INNER JOIN public.organization AS o
      ON sp.organization_id = o.organization_id
    WHERE sp.project_id = $1;
  `;
  const result = await db.query(query, [id]);
  return result.rows[0] ?? null;
};

export { getAllServiceProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails };
