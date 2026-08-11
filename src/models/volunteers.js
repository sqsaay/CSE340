import db from './db.js';

// Add a volunteer to a project
const addVolunteerToProject = async (projectId, userId) => {
    const query = `
        INSERT INTO user_projects (project_id, user_id)
        VALUES ($1, $2)
        RETURNING user_project_id;
    `;
    const result = await db.query(query, [projectId, userId]);
    return result.rows[0];
};

// Remove a volunteer from a project
const removeVolunteerFromProject = async (projectId, userId) => {
    const query = `
        DELETE FROM user_projects
        WHERE project_id = $1 AND user_id = $2;
    `;
    const result = await db.query(query, [projectId, userId]);
    return result.rowCount;
};

// List all projects a user has volunteered for
const listProjectsForUser = async (userId) => {
    const query = `
        SELECT p.project_id, p.title, p.description, p.location, p.project_date, p.organization_id
        FROM user_projects up
        JOIN service_project p ON up.project_id = p.project_id
        WHERE up.user_id = $1;
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
};

// List all volunteers for a project
const listVolunteersForProject = async (projectId) => {
    const query = `
        SELECT u.user_id, u.name, u.email
        FROM user_projects up
        JOIN users u ON up.user_id = u.user_id
        WHERE up.project_id = $1;
    `;
    const result = await db.query(query, [projectId]);
    return result.rows;
};

export { addVolunteerToProject, removeVolunteerFromProject, listProjectsForUser, listVolunteersForProject };

