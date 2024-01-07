const products_routes = require('../routes/API/v1/products')

module.exports = function(app){
    
    // TODO: add routes here
    app.use('/api/v1/products/', products_routes);
};

