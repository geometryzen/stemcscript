import { assert_rat, create_flt, create_sym, is_blade, is_boo, is_err, is_flt, is_imu, is_sym, one, Rat, Sym, zero } from "math-expression-atoms";
import { ExprContext } from "math-expression-context";
import { Native, native_sym } from "math-expression-native";
import { cons, Cons, is_atom, is_cons, is_singleton, items_to_cons, U } from "math-expression-tree";
import { diagnostic, Diagnostics } from "../../diagnostics/diagnostics";
import { Directive, Extension, ExtensionBuilder, ExtensionEnv, FEATURE, mkbuilder, TFLAGS, TFLAG_DIFF, TFLAG_HALT, TFLAG_NONE } from "../../env/ExtensionEnv";
import { hash_for_atom } from "../../hashing/hash_info";
import { iszero } from "../../helpers/iszero";
import { order_binary } from "../../helpers/order_binary";
import { power_rat_base_rat_expo } from "../../power_rat_base_rat_expo";
import { ProgrammingError } from "../../programming/ProgrammingError";

const ABS = native_sym(Native.abs);
const ADD = native_sym(Native.add);
const GRADE = native_sym(Native.grade);
const ISONE = native_sym(Native.isone);
const ISZERO = native_sym(Native.iszero);
const MUL = native_sym(Native.multiply);
const POW = native_sym(Native.pow);

export function is_rat(p: unknown): p is Rat {
    return p instanceof Rat;
}

export class RatExtension implements Extension<Rat> {
    readonly #hash = hash_for_atom(assert_rat(one));
    constructor() {
        // Nothing to see here.
    }
    phases?: number | undefined;
    dependencies?: FEATURE[] | undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test(atom: Rat, opr: Sym, expr: ExprContext): boolean {
        if (opr.equalsSym(ISONE)) {
            return atom.isOne();
        }
        else if (opr.equalsSym(ISZERO)) {
            return atom.isZero();
        }
        else {
            throw new Error(`${this.name}.test(${atom},${opr}) method not implemented.`);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    binL(lhs: Rat, opr: Sym, rhs: U, env: ExprContext): U {
        // console.lg(`RatExtension.binL ${lhs} ${opr} ${rhs}`);
        if (opr.equalsSym(ADD)) {
            if (is_atom(rhs)) {
                if (is_boo(rhs)) {
                    return diagnostic(Diagnostics.Operator_0_cannot_be_applied_to_types_1_and_2, ADD, create_sym(lhs.type), create_sym(rhs.type));
                }
                else if (is_flt(rhs)) {
                    return create_flt(lhs.toNumber() + rhs.toNumber());
                }
                else if (is_rat(rhs)) {
                    return lhs.add(rhs);
                }
                else if (is_sym(rhs)) {
                    return items_to_cons(ADD, lhs, rhs);
                }
                else if (is_err(rhs)) {
                    return rhs;
                }
            }
        }
        else if (opr.equalsSym(MUL)) {
            // console.lg(`RatExtension.binL ${lhs} ${opr} ${rhs}`);
            if (is_atom(rhs)) {
                if (is_blade(rhs)) {
                    return order_binary(MUL, lhs, rhs, env);
                }
                else if (is_imu(rhs)) {
                    return order_binary(MUL, lhs, rhs, env);
                }
                else if (is_rat(rhs)) {
                    // console.lg(`RatExtension.binL Rat Rat ${lhs} ${opr} ${rhs}`);
                    return lhs.mul(rhs);
                }
                else if (is_sym(rhs)) {
                    return order_binary(MUL, lhs, rhs, env);
                }
            }
        }
        else if (opr.equalsSym(POW)) {
            if (is_atom(rhs)) {
                if (is_rat(rhs)) {
                    return power_rat_base_rat_expo(lhs, rhs, env);
                }
            }
        }
        throw new ProgrammingError(` ${lhs} ${opr} ${rhs}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    binR(rhs: Rat, opr: Sym, lhs: U, expr: ExprContext): U {
        throw new ProgrammingError(` ${lhs} ${opr} ${rhs}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch(target: Rat, opr: Sym, argList: Cons, env: ExprContext): U {
        if (opr.equalsSym(ABS)) {
            return target.abs();
        }
        else if (opr.equalsSym(GRADE)) {
            const head = argList.head;
            try {
                if (iszero(head, env)) {
                    return target;
                }
                else {
                    return zero;
                }
            }
            finally {
                head.release();
            }
        }
        throw new ProgrammingError(`RatExtension.dispatch ${target} ${opr} ${argList} method not implemented.`);
    }
    iscons(): false {
        return false;
    }
    operator(): never {
        throw new ProgrammingError();
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
    toHumanString(rat: Rat): string {
        return rat.toInfixString();
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
    evaluate(rat: Rat, argList: Cons, $: ExtensionEnv): [TFLAGS, U] {
        if (is_cons(rat)) {
            throw new Error(`The expr is really a Cons! ${rat}`);
        }
        return this.transform(cons(rat, argList), $);
    }
    toString(): string {
        return this.name;
    }
    transform(expr: U, $: ExtensionEnv): [TFLAGS, U] {
        if (expr instanceof Rat) {
            // console.lg(`RatExtension.transform ${expr}`);
            if ($.getDirective(Directive.evaluatingAsFloat)) {
                return [TFLAG_DIFF, create_flt(expr.toNumber())];
            }
            else {
                return [TFLAG_HALT, expr];
            }
        }
        return [TFLAG_NONE, expr];
    }
    valueOf(expr: Rat, $: ExtensionEnv): U {
        return this.transform(expr, $)[1];
    }
}

export const rat_extension_builder: ExtensionBuilder<U> = mkbuilder<Rat>(RatExtension);