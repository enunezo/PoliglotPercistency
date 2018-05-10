import { MongoModel } from 'n158/classes';

export class BusLine extends MongoModel {

    constructor (db) {
        super(db, 'busLine', {
            properties: {
                name: { type: 'string' }
            },
            required: ['name']
        }, {});
    }

}