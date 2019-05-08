export {}

Array.prototype.cRandomPop = function () {
    const index = Math.floor(Math.random() * this.length);

    const result = this[index];
    this.splice(index, 1);

    return result;
}
// https://stackoverflow.com/a/43748517
Array.prototype.cRandomChoice = function () {
    const index = Math.floor(Math.random() * this.length);

    return this[index];
}

Array.prototype.cRemove = function <T>(element: T): boolean {
    const index = this.indexOf(element);
    if (index > -1) {
        this.splice(index, 1);
        return true;
    }
    return false;
}

export function deepCopy<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
}
Array.prototype.cRandomChoiceExcept = function (except: any[]): any {
    const copy = deepCopy(this);
    for (const e of except) {
        copy.cRemove(e);
    }
    return copy.cRandomChoice();
}
/**
 * Shuffles the array without mutation
 */
Array.prototype.cShuffle = function () {
    const a = deepCopy(this);
    // tslint:disable-next-line:one-variable-per-declaration
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}