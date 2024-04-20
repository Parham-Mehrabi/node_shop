import winston from 'winston'
import express from 'express'
import logger from './startup/logger.js'
import db from './startup/db.js'
import router from './startup/router.js'
import getPort from 'get-port'
import esMain from 'es-main'
import authentication from './middleware/authentication.js'

const app = express();

app.use(express.json())                             
app.use(express.urlencoded({ extended: true }))   


// middleware
app.use(authentication)


// load Logger
logger();

// Connect to DataBase
db();

// load the router
router(app);



async function server(port){
    const p = port ? port : await getPort();
    return app.listen(p, () => {winston.info('Listening on port ' + p)})
}

if (esMain(import.meta)){
    const port = process.env.NODE_PORT || 3000;
    server(port)
}


export default server;
