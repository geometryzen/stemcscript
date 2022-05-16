import { CHANGED, ExtensionEnv, Operator, OperatorBuilder, TFLAGS } from "../../env/ExtensionEnv";
import { hash_binop_atom_cons, HASH_SYM } from "../../hashing/hash_info";
import { makeList } from "../../makeList";
import { is_imu } from "../../predicates/is_imu";
import { MATH_MUL, MATH_POW } from "../../runtime/ns_math";
import { Rat } from "../../tree/rat/Rat";
import { Sym } from "../../tree/sym/Sym";
import { Cons, U } from "../../tree/tree";
import { BCons } from "../helpers/BCons";
import { Function2 } from "../helpers/Function2";
import { is_sym } from "../sym/is_sym";

class Builder implements OperatorBuilder<Cons> {
    create($: ExtensionEnv): Operator<Cons> {
        return new Op($);
    }
}

type LHS = Sym;
type RHS = BCons<Sym, Rat, Rat>;
type EXP = BCons<Sym, LHS, RHS>;

/**
 * Sym * Imu => Imu * Sym
 */
class Op extends Function2<LHS, RHS> implements Operator<EXP> {
    readonly hash: string;
    constructor($: ExtensionEnv) {
        super('mul_2_sym_imu', MATH_MUL, is_sym, is_imu, $);
        this.hash = hash_binop_atom_cons(MATH_MUL, HASH_SYM, MATH_POW);
    }
    isScalar(expr: EXP): boolean {
        const $ = this.$;
        return $.isScalar(expr.lhs);
    }
    isVector(expr: EXP): boolean {
        const $ = this.$;
        return $.isVector(expr.lhs);
    }
    transform2(opr: Sym, lhs: Sym, rhs: U): [TFLAGS, U] {
        return [CHANGED, makeList(opr, rhs, lhs)];
    }
}

export const mul_2_sym_imu = new Builder();
