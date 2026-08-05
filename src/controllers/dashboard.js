import { requireLogin } from "./users.js";

const dashboardPage = (req, res) => {
    const title = 'Dashboard';
    const user = req.session.user;
    res.render('dashboard', { title, user });
};

export { dashboardPage };