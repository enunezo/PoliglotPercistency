import { MongoModel } from 'n158/classes';
import { deferResponse } from 'n158/services';

export class BusStop extends MongoModel {

    constructor (db) {
        super(db, 'busStop', {
            properties: {
                name: { type: 'string' },
                // Array of Bus Lines Ids
                busLines: { type: 'array' }
            },
            required: ['name']
        }, {});
    }

    registerIncludingNeo4j (data, neo4jSession) {
        console.log('neo4jSession', neo4jSession);
        
        // neo4jSession
        neo4jSession.run(
            CREATE (bussStop.name, { id: busStop._id })

        ).then(function (result) {
            console.log('Neo4j Result', result)
            // result.records.forEach(function (record) {
            //     console.log(record.get('name'));
            // });
        }).catch(function (error) {
            console.log(error);
        });
        
        data.busLines = [];
        return super.register(data);
    }

    addBusLine (busStopId,  busLineId) {
        var deferred = deferResponse();
        super.findById(busStopId).then((bussStop) => {
            bussStop.busLines.push(busLineId);
            super.update(busStopId, bussStop).then((busStop) => {
                deferred.resolve(busStop);
            }).catch(deferred.reject);
        }).catch(deferred.reject);
        return deferred.promise;
    }

}