var neo4j = require('neo4j-driver').v1;
var q = require('q');

export default (uri, user, password) => {
    var deferred = q.defer();
    var driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    var session = driver.session();
    deferred.resolve(session);
    return deferred.promise;
}