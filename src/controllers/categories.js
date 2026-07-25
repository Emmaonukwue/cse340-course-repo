import { getAllCategories, getCategoryById, 
    getCategoriesByProjectId, updateCategoryAssignments, createCategory } from '../models/categories.js';
import { getProjectsByCategoryId, getProjectDetails } from '../models/projects.js';
import { body, validationResult } from 'express-validator';


const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    //console.log(categories);

    const title = 'Service Categories';
    res.render('categories', { title, categories });
};

const categoryDetailsPage = async (req, res) => {
    const categoryId = req.params.id;
    const categoryDetails = await getCategoryById(categoryId);
    const projects = await getProjectsByCategoryId(categoryId);
    const title = 'Category Details';

    res.render('category', { title, categoryDetails, projects });
};

const assignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;

    const projectDetails = await getProjectDetails(projectId);
    const categories = await getAllCategories();
    const assignedCategories = await getCategoriesByProjectId(projectId);

    const title = 'Assign Categories to Project';

    res.render('assign-categories', { title, projectId, projectDetails, categories, assignedCategories });
};

const processAssignCategoriesForm = async (req, res) => {
    const projectId = req.params.projectId;
    const selectedCategoryIds = req.body.categoryIds || [];
    
    // Ensure selectedCategoryIds is an array
    const categoryIdsArray = Array.isArray(selectedCategoryIds) ? selectedCategoryIds : [selectedCategoryIds];
    await updateCategoryAssignments(projectId, categoryIdsArray);
    req.flash('success', 'Categories updated successfully.');
    res.redirect(`/project/${projectId}`);
};

const newCategoryForm = async (req, res) => {
    const title = 'Create New Category';

    res.render('new-category', { title });
};

const processNewCategoryForm = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Loop through validation errors and flash them
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        }); 

        // Redirect back to the new category form
        return res.redirect('/new-category');
    };

    // Extract form data from req.body
    const { name } = req.body;
    // Create the new category in the database
    const newCategoryId = await createCategory(name);
    req.flash('success', 'New category created successfully.');
    res.redirect(`/category/${newCategoryId}`);
};

// Validation rules for creating a new category
const categoryValidation = [
    body('name')
    .trim()
    .isLength({ min: 3, max: 100 }).withMessage('Category name must be between 3 and 100 characters.')
];

export { categoriesPage, categoryDetailsPage, 
    assignCategoriesForm, processAssignCategoriesForm, 
    newCategoryForm, processNewCategoryForm, 
    categoryValidation };