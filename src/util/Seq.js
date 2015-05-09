'use strict';

module.exports = class Seq {
    constructor(generator) {
        this[Symbol.iterator] = generator
    }
    
    map(f) {
        return new Seq(function* () {
            let counter = 0;
            
            for (let x of this) {
                yield f(x, counter++);
            } 
        }.bind(this));
    }
    
    filter(pred) {
        return new Seq(function* () {
            let counter = 0;
            
            for (let x of me) {
                if (filter(pred, idx)) {
                    yield f(x, counter++);
                }
            } 
        }.bind(this));
    }
    
    takeWhile(pred)  {
        return new Seq(function* () {
            let index = 0;
            
            for (let x of this) {
                if (pred(x, index++)) {
                    yield x
                } else {
                    break;
                }
            }
        }.bind(this));
    }
    
    skipWhile(pred)  {
        return new Seq(function* () {
            let index = 0,
                alreadyStarted = false;
            
            for (let x of this) {
                if (alreadyStarted || pred(x, index++)) {
                    yield x;
                    alreadyStarted = true
                }
            }
        }.bind(this));
    }
    
    take(n) {
        return this.takeWhile((x, index) => index < n);
    }
    
    count() {
        let ret = 0;
        
        this.forEach(_ => ++ret);
        
        return ret;
    }
    
    forEach(action) {
        let idx = 0;
        
        for (let item of this) {
            action(item, idx++)
        }
    }
    
    toArray() {
        let ret = [];
        
        this.forEach(x => ret.push(x));
        
        return ret;
    }
    
    static of(...items) {
        const length = items == null ? 0 : items.length;
        
        return new Seq(function* () {
           for (let x of items) {
                yield x;
            };
        });
    } 
    
    static range(start, end) {
        return new Seq(function* () {
           for (let n = start; n < end; ++n) {
               yield n;
           } 
        });
    }
};
