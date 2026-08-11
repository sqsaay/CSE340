import { addVolunteerToProject, removeVolunteerFromProject, listProjectsForUser, listVolunteersForProject } from "../models/volunteers.js";

const processAddVolunteer = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user?.user_id;

    if (!userId) {
        req.flash('error', 'You must be logged in to volunteer for a project.');
        return res.redirect('/login');
    }

    try {
        await addVolunteerToProject(projectId, userId);
        req.flash('success', 'You have successfully signed up to volunteer for this project!');
    } catch (error) {
        console.error('Error adding volunteer:', error);
        // Handle duplicate key error gracefully if user clicks twice
        if (error.code === '23505') {
            req.flash('info', 'You are already registered as a volunteer for this project.');
        } else {
            req.flash('error', 'An error occurred while signing up to volunteer.');
        }
    }

    res.redirect(`/project/${projectId}`);
};

const processRemoveVolunteer = async (req, res) => {
    const projectId = req.params.id;
    const userId = req.session.user?.user_id;

    if (!userId) {
        req.flash('error', 'You must be logged in to modify your volunteer status.');
        return res.redirect('/login');
    }

    try {
        await removeVolunteerFromProject(projectId, userId);
        req.flash('success', 'You have been removed from the volunteer list for this project.');
    } catch (error) {
        console.error('Error removing volunteer:', error);
        req.flash('error', 'An error occurred while updating your volunteer status.');
    }

    res.redirect(`/project/${projectId}`);
};

const showVolunteeringPage = async (req, res) => {
    const user = req.session.user;
    let volunteeredProjects = [];
    try {
        volunteeredProjects = await listProjectsForUser(user.user_id);
    } catch (error) {
        console.error('Error fetching volunteered projects:', error);
    }

    res.render('volunteering', {
        title: 'My Volunteering',
        volunteeredProjects
    });
};

export {
    processAddVolunteer,
    processRemoveVolunteer,
    showVolunteeringPage
};

