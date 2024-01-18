import { create_flt, one, Rat } from "math-expression-atoms";
import { cons, Cons, is_cons, is_singleton, U } from "math-expression-tree";
import { Directive, Extension, ExtensionEnv, TFLAGS, TFLAG_DIFF, TFLAG_HALT, TFLAG_NONE } from "../../env/ExtensionEnv";
import { hash_for_atom } from "../../hashing/hash_info";
import { ExtensionOperatorBuilder } from '../helpers/ExtensionOperatorBuilder';

export function is_rat(p: unknown): p is Rat {
    return p instanceof Rat;
}

function verify_rat(x: Rat): Rat | never {
    if (is_rat(x)) {
        return x;
    }
    else {
        throw new Error();
    }
}

class RatExtension implements Extension<Rat> {
    readonly #hash = hash_for_atom(verify_rat(one));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(private readonly $: ExtensionEnv) {
        // Nothing to see here.
    }
    iscons(): false {
        return false;
    }
    operator(): never {
        throw new Error();
    }
    get hash(): string {
        return this.#hash;
    }
    get name(): string {
        return 'RatExtension';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isKind(arg: U, $: ExtensionEnv): arg is Rat {
        // console.lg(`RatExtension.isKind for ${arg.toString()}`);
        // We must be prepared to handle singleton lists containing a single rat.
        if (is_cons(arg) && is_singleton(arg)) {
            return this.isKind(arg.head, $);
        }
        return arg instanceof Rat;
    }
    subst(expr: Rat, oldExpr: U, newExpr: U): U {
        if (is_rat(oldExpr)) {
            if (expr.equals(oldExpr)) {
                return newExpr;
            }
        }
        return expr;
    }
    toInfixString(rat: Rat): string {
        return rat.toInfixString();
    }
    toLatexString(rat: Rat): string {
        return rat.toInfixString();
    }
    toListString(rat: Rat): string {
        return rat.toListString();
    }
    evaluate(rat: Rat, argList: Cons): [TFLAGS, U] {
        if (is_cons(rat)) {
            throw new Error(`The expr is really a Cons! ${rat}`);
        }
        return this.transform(cons(rat, argList));
    }
    transform(expr: U): [TFLAGS, U] {
        if (expr instanceof Rat) {
            // console.lg(`RatExtension.transform ${expr}`);
            if (this.$.getDirective(Directive.evaluatingAsFloat)) {
                return [TFLAG_DIFF, create_flt(expr.toNumber())];
            }
            else {
                return [TFLAG_HALT, expr];
            }
        }
        return [TFLAG_NONE, expr];
    }
    valueOf(expr: Rat): U {
        return this.transform(expr)[1];
    }
}

export const rat_extension = new ExtensionOperatorBuilder(function ($: ExtensionEnv) {
    return new RatExtension($);
});