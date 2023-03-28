import { U } from "../tree/tree";

/**
 * The parser requires a mutable for of Cons.
 */
export class Pair implements U {
    constructor(public car: U, public cdr: U) {

    }
    name = "Pair";
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    contains(needle: U): boolean {
        throw new Error("Method not implemented.");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    equals(other: U): boolean {
        throw new Error("Method not implemented.");
    }
    isCons(): boolean {
        throw new Error("Method not implemented.");
    }
    isNil(): boolean {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        return `Pair(${this.car} ${this.cdr})`;
    }
    pos?: number | undefined;
    end?: number | undefined;

}