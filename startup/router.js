import products_routes from '../routes/API/v1/products_routs.js'
import users_router from '../routes/API/v1/users_routs.js'

export default function(app){
    
    // TODO: add routes here
    app.use('/api/v1/products/', products_routes);
    app.use('/api/v1/users/', users_router);
};

