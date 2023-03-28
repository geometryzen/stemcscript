import { U } from "../tree/tree";

export class CommentMarker implements U {
    name = "CommentMarker";
    contains(needle: U): boolean {
        return needle instanceof CommentMarker;
    }
    equals(other: U): boolean {
        return other instanceof CommentMarker;
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
