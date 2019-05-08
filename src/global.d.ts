export { }; // Fixes compile error
declare global {
    type Primitive = string | number | boolean;
    type Maybe<T> = T | null;
    interface Dictionary<T> {
        [key: string]: T;
    }
    // tslint:disable-next-line:interface-name
    interface Array<T> {
        cRandomChoice(): T;
        cRandomPop(): T;
        cRandomChoiceExcept(except: T[]): T;
        cRemove(element: T): boolean;
        cShuffle(): Array<T>;
    }
}
