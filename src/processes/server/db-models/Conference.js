import { MongoModel } from 'n158/classes';

export class Conference extends MongoModel {

    constructor (db) {
        super(db, 'conference', {
            properties: {
                name: { type: 'string' },
                date: { type: 'string' }
            },
            required: ['name', 'date']
        }, {});
    }

}