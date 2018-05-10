import {ProcessHandler} from 'n158/classes';
import {modelMongoTransaction} from 'n158/http-pipeline-handlers';
import yaml from 'js-yaml';
import path from 'path';
import fs from 'fs';
import { Speaker } from './db-models/Speaker';
import { Conference } from './db-models/Conference';
import { connectMongoDb } from 'n158/services';
import createNeo4jSession from './services/createNeo4jSession';

// Setup process handler settings
var procSettingsPath = path.join(__dirname, './settings.yaml');
var procSettings = yaml.safeLoad(fs.readFileSync(procSettingsPath, 'utf-8'));

// Init process handler
var processHandler = new ProcessHandler(procSettings);

// Setup server port
processHandler.set('httpPort', process.env.PORT || processHandler.get('httpPort'));

// Setup webapp
processHandler.set('demo-webapp', path.join(__dirname, './webapps/home'));

// Setup models
processHandler.set('models/Speaker', Speaker);
processHandler.set('models/Conference', Conference);
processHandler.set('models/BusLine', BusLine);
processHandler.set('models/BusStop', BusStop);

// Setup handlers
processHandler.set('handlers/modelMongoTransaction', modelMongoTransaction);
processHandler.set('demo-handler', (context, next, finish) => {
    finish(200, 'Hello world');
});


// Connect neo4j
createNeo4jSession(
    processHandler.get('neo4jUrl'),
    processHandler.get('neo4jUser'),
    processHandler.get('neo4jPassword')
).then((neo4jSession) => {
    // Set neo4j session
    processHandler.set('neo4jSession', neo4jSession);

    // Connect mongo
    connectMongoDb(
        processHandler.get('dbUrl'),
        processHandler.get('dbName')
    ).then((db) => {
        processHandler.set('db', db);
        // Start servers
        processHandler.startHTTPServers().then((results) => {
            results.forEach((r) => {
                console.log('HTTP Server '+r.serverName+' is running at port '+r.ports.http);
            });
        });
    });
});
