import { MongoModel } from 'n158/classes';

export class Speaker extends MongoModel {

    constructor (db) {
        super(db, 'speaker', {
            properties: {
                name: { type: 'string' }
            },
            required: ['name']
        }, {});
    }

}