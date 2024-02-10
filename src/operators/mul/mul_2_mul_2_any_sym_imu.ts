import { Imu, is_imu } from "math-expression-atoms";
import { ExtensionEnv, Operator, OperatorBuilder, SIGN_GT, TFLAGS, TFLAG_DIFF, TFLAG_NONE } from "../../env/ExtensionEnv";
import { hash_binop_cons_atom, HASH_IMU } from "../../hashing/hash_info";
import { MATH_MUL } from "../../runtime/ns_math";
import { Sym } from "../../tree/sym/Sym";
import { Cons, is_cons, items_to_cons, U } from "../../tree/tree";
import { and } from "../helpers/and";
import { Cons2 } from "../helpers/Cons2";
import { Function2 } from "../helpers/Function2";
import { is_mul_2_any_sym } from "./is_mul_2_any_sym";

class Builder implements OperatorBuilder<Cons> {
    create($: ExtensionEnv): Operator<Cons> {
        return new Op($);
    }
}

type LL = U;
type LR = Sym;
type LHS = Cons2<Sym, LL, LR>;
type RHS = Imu;
type EXP = Cons2<Sym, LHS, RHS>;

/**
 * (X * a) * i => (X * i) * a or (X * a) * i, consistent with compare_factors
 */
class Op extends Function2<LHS, RHS> implements Operator<EXP> {
    readonly #hash: string;
    constructor($: ExtensionEnv) {
        super('mul_2_mul_2_any_sym_imu', MATH_MUL, and(is_cons, is_mul_2_any_sym), is_imu, $);
        this.#hash = hash_binop_cons_atom(MATH_MUL, MATH_MUL, HASH_IMU);
    }
    get hash(): string {
        return this.#hash;
    }
    transform2(opr: Sym, lhs: LHS, rhs: RHS, orig: EXP): [TFLAGS, U] {
        const $ = this.$;
        const X = lhs.lhs;
        const a = lhs.rhs;
        const i = rhs;
        switch ($.compareFn(opr)(a, i)) {
            case SIGN_GT: {
                const Xi = $.valueOf(items_to_cons(MATH_MUL, X, i));
                const Xia = $.valueOf(items_to_cons(MATH_MUL, Xi, a));
                return [TFLAG_DIFF, Xia];
            }
            default: {
                return [TFLAG_NONE, orig];
            }
        }
    }
}

export const mul_2_mul_2_any_sym_imu = new Builder();
