import { getAllCategories } from '../models/categories.js';

const categoriesPage = async (req, res) => {
    const categories = await getAllCategories();
    //console.log(categories);

    const title = 'Service Categories';
    res.render('categories', { title, categories });
};

export { categoriesPage };