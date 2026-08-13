import { requireLogin } from "./users.js";
import { getProjectVolunteerByUserId } from '../models/projects.js';

const dashboardPage = async (req, res) => {
    const title = 'Dashboard';
    const user = req.session.user;
    const userId = user.user_id;
    const volunteerProjects = await getProjectVolunteerByUserId(userId);
    res.render('dashboard', { title, user, volunteerProjects });
};

export { dashboardPage };