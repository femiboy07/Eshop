const User = require('../models/User');




const middlewarePagination = async(model) => {
    return (req, res, next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        try {
            const startIndex = page - 1 * limit;
            const endindex = page * limit;
            const results = {};

            if (startIndex > 0) {
                const previousPage = page - 1;


            }
        } catch {

        }
    }
}