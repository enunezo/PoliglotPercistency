import { MongoModel } from 'n158/classes';

export class BusLine extends MongoModel {

    constructor (db) {
        super(db, 'busLine', {
            properties: {
                name: { type: 'string' },
                //Bus Stop Id
                from: { type: 'string' },
                //Bus Stop Id
                to: {type: 'string' }
            },
            required: ['name', 'from', 'to']
        }, {});
    }

}