import db from './db.js'
import { formatDate, formatDateForInput } from '../utils/formatters.js';

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
        project.inputDate = formatDateForInput(project.project_date);
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
        project.inputDate = formatDateForInput(project.project_date);
    });

      // Return the first row of the result set, or null if no rows are found
      return result.rows.length > 0 ? result.rows[0] : null;
};

const getProjectsByCategoryId = async (categoryId) => {
    const query = `
        SELECT sp.project_id, sp.organization_id, o.name AS organization_name, sp.title, sp.description, sp.location, sp.project_date
        FROM public.service_project AS sp
        INNER JOIN public.organization AS o
        ON sp.organization_id = o.organization_id
        INNER JOIN public.project_category AS pc
        ON sp.project_id = pc.project_id
        WHERE pc.category_id = $1;
    `;

    const queryParams = [categoryId];
    const result = await db.query(query, queryParams);

    result.rows.forEach(project => {
        project.formattedDate = formatDate(project.project_date);
    });

    return result.rows;
};

const createProject = async (title, description, location, date, organizationId) => {
  const query = `
    INSERT INTO service_project (title, description, location, project_date, organization_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING project_id;
  `;

  const queryParams = [title, description, location, date, organizationId];
  const result = await db.query (query, queryParams);

  if (result.rows.length === 0) {
        throw new Error('Failed to create project');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
        console.log('Created new project with ID:', result.rows[0].project_id);
    }

    return result.rows[0].project_id;
}

const updateProject = async (projectId, title, description, location, date, organizationId) => {
  const query = `
    UPDATE service_project
    SET title = $1, description = $2, location = $3, project_date = $4, organization_id = $5
    WHERE project_id = $6
    RETURNING project_id;
  `;

  const queryParams = [title, description, location, date, organizationId, projectId];
  const result = await db.query(query, queryParams);

  if (result.rows.length === 0) {
      throw new Error('Project not found');
    }

    if (process.env.ENABLE_SQL_LOGGING === 'true') {
      console.log('Updated project with ID:', projectId);
    }

  return result.rows[0].project_id;

}

export {getAllProjects, getProjectsByOrganizationId, 
        getUpcomingProjects, getProjectDetails, 
        getProjectsByCategoryId, createProject, 
        updateProject };