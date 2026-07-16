import { getAllProjects } from '../models/projects.js';
import { getProjectDetails } from '../models/projects.js';
import { getUpcomingProjects } from '../models/projects.js';

const NUMBER_OF_UPCOMING_PROJECTS = 5;

const projectsPage = async (req, res) => {
    const projects = await getUpcomingProjects(NUMBER_OF_UPCOMING_PROJECTS);
    //console.log(projects);

    const title = 'Service Projects';
    res.render('projects', { title, projects });
};

const projectDetailsPage = async (req, res) => {
    const projectId = req.params.id;
    const projectDetails = await getProjectDetails(projectId);
    const title = 'Project Details';

    res.render('project', { title, projectDetails });
};

export { projectsPage, projectDetailsPage };