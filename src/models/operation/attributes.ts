// function setCodePrefix(constructor: Function) {
//   console.log(constructor.prototype)
// }
export const setCodePrefix=(prefix:string)=> {
    return function<T extends { new (...args: any[]) }>(
      originalCtor: T
    ) {
      return class extends originalCtor {
        constructor(..._: any[]) {
          super();
          this.codePrefix = prefix; 
          // this.allowCodeIndex=allowCodeIndex;     
          console.log(this.codePrefix);       
        }
      };
    };

}
