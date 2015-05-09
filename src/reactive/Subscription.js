export default class Subscription {
    constructor(onClose, onRequest) {
        this._onClose = onClose;
        this._onRequest = onRequest;
    }
    
    close() {
        this._onClose;
    }
    
    request(n) {
        this._onRequest(n);
    }
}