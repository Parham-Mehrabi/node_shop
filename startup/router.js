import products_routes from '../routes/API/v1/products_routs.js';
import users_router from '../routes/API/v1/users_routs.js';
import auth_routes from '../routes/API/v1/auth_routes.js';

export default function(app){
    
    app.use('/api/v1/products/', products_routes);
    app.use('/api/v1/users/', users_router);
    app.use('/api/v1/auth/', auth_routes);
};

