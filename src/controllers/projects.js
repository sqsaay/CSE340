import { getAllServiceProjects } from '../models/projects.js';
const projecstPage = async (req, res) => {
    const projects = await getAllServiceProjects();
    const title = 'Projects';
    res.render('projects', { title, projects });
};

export { projecstPage};