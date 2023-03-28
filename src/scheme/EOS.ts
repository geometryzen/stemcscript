import { U } from "../tree/tree";

export class EOS implements U {
    name = "EOS";
    contains(needle: U): boolean {
        return needle instanceof EOS;
    }
    equals(other: U): boolean {
        return other instanceof EOS;
    }
    isCons(): boolean {
        return false;
    }
    isNil(): boolean {
        return false;
    }
    pos?: number | undefined;
    end?: number | undefined;
}
