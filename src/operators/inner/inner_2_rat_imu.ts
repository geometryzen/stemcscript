import { Imu, is_imu } from "math-expression-atoms";
import { ExtensionEnv, Operator, OperatorBuilder, TFLAGS, TFLAG_DIFF } from "../../env/ExtensionEnv";
import { hash_binop_atom_atom, HASH_IMU, HASH_RAT } from "../../hashing/hash_info";
import { MATH_INNER, MATH_MUL } from "../../runtime/ns_math";
import { Rat } from "../../tree/rat/Rat";
import { Sym } from "../../tree/sym/Sym";
import { Cons, items_to_cons, U } from "../../tree/tree";
import { Cons2 } from "../helpers/Cons2";
import { Function2 } from "../helpers/Function2";
import { is_rat } from "../rat/is_rat";

class Builder implements OperatorBuilder<Cons> {
    create($: ExtensionEnv): Operator<Cons> {
        return new Op($);
    }
}

type LHS = Rat;
type RHS = Imu;
type EXP = Cons2<Sym, LHS, RHS>;

/**
 * Rat | i => Rat * i
 */
class Op extends Function2<LHS, RHS> implements Operator<EXP> {
    readonly #hash: string;
    constructor($: ExtensionEnv) {
        super('inner_2_rat_imu', MATH_INNER, is_rat, is_imu, $);
        this.#hash = hash_binop_atom_atom(MATH_INNER, HASH_RAT, HASH_IMU);
    }
    get hash(): string {
        return this.#hash;
    }
    transform2(opr: Sym, lhs: LHS, rhs: RHS): [TFLAGS, U] {
        return [TFLAG_DIFF, items_to_cons(MATH_MUL.clone(opr.pos, opr.end), lhs, rhs)];
    }
}

export const inner_2_rat_imu = new Builder();
