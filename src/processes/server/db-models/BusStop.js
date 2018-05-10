import { MongoModel } from 'n158/classes';

export class BusStop extends MongoModel {

    constructor (db) {
        super(db, 'busStop', {
            properties: {
                name: { type: 'string' },
                // Array of Bus Lines Ids
                busLines: { type: 'array' }
            },
            required: [name]
        }, {});
    }

}