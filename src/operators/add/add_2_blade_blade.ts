import { ExtensionEnv, Operator, OperatorBuilder, SIGN_EQ, SIGN_GT, TFLAGS, TFLAG_DIFF, TFLAG_HALT } from "../../env/ExtensionEnv";
import { hash_binop_atom_atom, HASH_BLADE } from "../../hashing/hash_info";
import { MATH_ADD, MATH_MUL } from "../../runtime/ns_math";
import { two } from "../../tree/rat/Rat";
import { Sym } from "../../tree/sym/Sym";
import { Cons, items_to_cons, U } from "../../tree/tree";
import { Blade } from "../../tree/vec/Blade";
import { compare_blade_blade } from "../blade/blade_extension";
import { is_blade } from "../blade/is_blade";
import { BCons } from "../helpers/BCons";
import { Function2X } from "../helpers/Function2X";

type LHS = Blade;
type RHS = Blade;
type EXP = BCons<Sym, LHS, RHS>;

class Builder implements OperatorBuilder<Cons> {
    create($: ExtensionEnv): Operator<Cons> {
        return new Op($);
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function cross(lhs: LHS, rhs: RHS): boolean {
    return true;
}

/**
 * Blade + Blade
 */
class Op extends Function2X<LHS, RHS> implements Operator<EXP> {
    readonly hash: string;
    constructor($: ExtensionEnv) {
        super('add_2_blade_blade', MATH_ADD, is_blade, is_blade, cross, $);
        this.hash = hash_binop_atom_atom(MATH_ADD, HASH_BLADE, HASH_BLADE);
    }
    transform2(opr: Sym, lhs: LHS, rhs: LHS, expr: EXP): [TFLAGS, U] {
        // const $ = this.$;
        // console.lg(this.name, decodeMode($.getMode()), render_as_infix(expr, $));
        switch (compare_blade_blade(lhs, rhs)) {
            case SIGN_GT: {
                return [TFLAG_DIFF, items_to_cons(opr, rhs, lhs)];
            }
            case SIGN_EQ: {
                return [TFLAG_DIFF, items_to_cons(MATH_MUL, two, lhs)];
            }
            default: {
                return [TFLAG_HALT, expr];
            }
        }
    }
}

export const add_2_blade_blade = new Builder();
