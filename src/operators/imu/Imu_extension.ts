
import { create_int, imu, Imu, negOne, one, Sym } from "math-expression-atoms";
import { ExprContext } from "math-expression-context";
import { Native, native_sym } from "math-expression-native";
import { cons, Cons, is_atom, items_to_cons, U } from "math-expression-tree";
import { Extension, FEATURE, mkbuilder, TFLAGS, TFLAG_HALT } from "../../env/ExtensionEnv";
import { HASH_IMU } from "../../hashing/hash_info";
import { order_binary } from "../../helpers/order_binary";
import { ProgrammingError } from "../../programming/ProgrammingError";
import { MATH_IMU } from "../../runtime/ns_math";
import { half, two } from "../../tree/rat/Rat";
import { is_rat } from "../rat/rat_extension";
import { is_sym } from "../sym/is_sym";

const ISZERO = native_sym(Native.iszero);
const MUL = native_sym(Native.multiply);
const POW = native_sym(Native.pow);
const negImu = items_to_cons(MUL, create_int(-1), imu);

function divide(numer: U, denom: U, env: ExprContext): U {
    const rhs = items_to_cons(POW, denom, negOne);
    const ratio = items_to_cons(MUL, numer, rhs);
    return env.valueOf(ratio);
}

class ImuExtension implements Extension<Imu> {
    constructor() {
        // Nothing to see here.
    }
    phases?: number | undefined;
    dependencies?: FEATURE[] | undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    binL(lhs: Imu, opr: Sym, rhs: U, _: ExprContext): U {
        if (opr.equalsSym(MUL)) {
            if (is_atom(rhs)) {
                if (is_rat(rhs)) {
                    return order_binary(MUL, lhs, rhs, _);
                }
                else if (is_sym(rhs)) {
                    return order_binary(MUL, lhs, rhs, _);
                }
            }
        }
        else if (opr.equalsSym(POW)) {
            if (is_atom(rhs)) {
                if (is_rat(rhs)) {
                    if (rhs.isEven()) {
                        const n = rhs.mul(half);
                        if (n.isEven()) {
                            return one;
                        }
                        else {
                            return negOne;
                        }
                    }
                    else if (rhs.isOdd()) {
                        const n = rhs.succ().mul(half);
                        if (n.isEven()) {
                            return negImu;
                        }
                        else {
                            return imu;
                        }
                    }
                    else {
                        const a = rhs.numer();
                        const b = rhs.denom();
                        const twoB = items_to_cons(MUL, two, b);
                        const expo = divide(a, twoB, _);
                        const retval = items_to_cons(POW, negOne, expo);
                        return _.valueOf(retval);
                    }
                }
            }
        }
        throw new ProgrammingError(` ${lhs} ${opr} ${rhs}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    binR(rhs: Imu, opr: Sym, lhs: U, env: ExprContext): U {
        throw new ProgrammingError(` ${lhs} ${opr} ${rhs}`);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch(expr: Imu, opr: Sym, argList: Cons, env: ExprContext): U {
        throw new Error("Method not implemented.");
    }
    test(expr: Imu, opr: Sym): boolean {
        if (opr.equalsSym(ISZERO)) {
            return false;
        }
        throw new Error(`ImuExtension.test ${opr} method not implemented.`);
    }
    iscons(): false {
        return false;
    }
    operator(): never {
        throw new Error();
    }
    get hash(): string {
        return HASH_IMU;
    }
    get name(): string {
        return 'ImuExtension';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isKind(expr: U): expr is Imu {
        return imu.equals(expr);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isnil(expr: Cons): boolean {
        return false;
    }
    subst(expr: Imu, oldExpr: U, newExpr: U): U {
        if (expr.equals(oldExpr)) {
            return newExpr;
        }
        else {
            return expr;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toHumanString(expr: Imu): string {
        return 'i';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toInfixString(expr: Imu): string {
        return 'i';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toLatexString(expr: Imu): string {
        return '\\imath';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toListString(expr: Imu, $: ExprContext): string {
        return $.getSymbolPrintName(MATH_IMU);
    }
    toString(): string {
        return this.name;
    }
    evaluate(expr: Imu, argList: Cons): [TFLAGS, U] {
        // console.lg(this.name, "evaluate");
        return [TFLAG_HALT, cons(expr, argList)];
    }
    transform(expr: Imu): [TFLAGS, U] {
        // console.lg(this.name, "transform");
        return [TFLAG_HALT, this.valueOf(expr)];
    }
    valueOf(expr: Imu): U {
        // console.lg(this.name, "valueOf");
        // It seems as though we could respond to requests to convert the imaginary unit
        // into either clock or polar form at this level, but in the case of polar that
        // would lead to infinite recursion of i => exp(1/2*i*pi) => exp(1/2*exp(1/2*i*pi)*pi).
        // Or would it? The exp function, acting on a product is already in polar form and so
        // recursion should terminate. 
        // console.lg("clock?", this.$.getDirective(Directive.complexAsClock));
        // console.lg("polar?", this.$.getDirective(Directive.complexAsPolar));
        return expr;
    }
}

export const imu_extension_builder = mkbuilder(ImuExtension);
