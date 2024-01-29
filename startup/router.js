const products_routes = require('../routes/API/v1/products_routs')
const users_router = require('../routes/API/v1/users_routs')

module.exports = function(app){
    
    // TODO: add routes here
    app.use('/api/v1/products/', products_routes);
    app.use('/api/v1/users/', users_router);
};

