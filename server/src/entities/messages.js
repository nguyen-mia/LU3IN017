class Messages {
    constructor(db) {
        this.db = {};
        db.messages = new Datastore();
        db.messages.loadDatabase();
    }
}