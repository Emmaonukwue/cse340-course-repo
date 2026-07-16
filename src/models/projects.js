import db from './db.js'
import { formatDate } from '../utils/formatters.js';

const getAllProjects = async() => {
    const query = `
        SELECT sp.project_id, sp.organization_id, o.name AS organization_name, sp.title, sp.description, sp.location, sp.project_date
        FROM public.service_project AS sp
        INNER JOIN public.organization AS o
        ON sp.organization_id = o.organization_id;
    `;

    const result = await db.query(query);

    result.rows.forEach(project => {
        project.formattedDate = formatDate(project.project_date);
    });

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

const getUpcomingProjects = async (number_of_projects) => {
    const query = `
        SELECT sp.project_id, sp.organization_id, o.name AS organization_name, sp.title, sp.description, sp.location, sp.project_date
        FROM public.service_project AS sp
        INNER JOIN public.organization AS o
        ON sp.organization_id = o.organization_id
        ORDER BY sp.project_date
        LIMIT $1;
      `;
      
      const queryParams = [number_of_projects];
      const result = await db.query(query, queryParams);

      result.rows.forEach(project => {
        project.formattedDate = formatDate(project.project_date);
    });

      return result.rows;
};

const getProjectDetails = async (projectId) => {
      const query = `
      SELECT sp.project_id, sp.organization_id, o.name AS organization_name, sp.title, sp.description, sp.location, sp.project_date
        FROM public.service_project AS sp
        INNER JOIN public.organization AS o
        ON sp.organization_id = o.organization_id
      WHERE sp.project_id = $1;
    `;

      const queryParams = [projectId];
      const result = await db.query(query, queryParams);

      result.rows.forEach(project => {
        project.formattedDate = formatDate(project.project_date);
    });

      // Return the first row of the result set, or null if no rows are found
      return result.rows.length > 0 ? result.rows[0] : null;
};

export {getAllProjects, getProjectsByOrganizationId, getUpcomingProjects, getProjectDetails}