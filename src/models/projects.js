import db from './db.js'

const getAllProjects = async() => {
    const query = `
        SELECT sp.project_id, sp.organization_id, o.name AS organization_name, sp.title, sp.description, sp.location, sp.project_date
        FROM public.service_project AS sp
        INNER JOIN public.organization AS o
        ON sp.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    result.rows.forEach(project => {
        project.formattedDate = new Date(project.project_date).toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    });

    return result.rows;
}

export {getAllProjects}