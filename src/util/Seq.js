export default class Seq {
    constructor(generator) {
        this.generator = generator
    }
    
    map(f) {
        return new Seq(function* () {
            let counter = 0;
            let items = this.generator();
            
            for (let x of items) {
                yield f(x, counter++);
            } 
        });
    }
    
    take(n) {
        return new Seq(function* () {
           if (n >=0) {
               let counter = 0;
               
               for (let x of this.generator()) {
                   yield x;
                   
                   if (counter >= n) {
                       break;
                   }
               }
           }
       });
    }
    
    forEach(action) {
        let idx = 0;
        
        for (let item of this.generator()) {
            action(item, idx++)
        }
    }
    
    static of(...items) {
        const length = items == null ? 0 : items.length;
        
        return new Seq(function* () {
            let counter = 0;
            
            while (counter < length) {
                yield items[counter++];
            };
        });
    }    
};