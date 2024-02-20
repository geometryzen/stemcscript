import { is_rat } from "math-expression-atoms";
import { ExprContext } from "math-expression-context";
import { Native, native_sym } from "math-expression-native";
import { items_to_cons, U } from "math-expression-tree";
import { is_boo } from "../operators/boo/is_boo";
import { ProgrammingError } from "../programming/ProgrammingError";

const ISONE = native_sym(Native.isone);

export function isone(arg: U, env: Pick<ExprContext, 'valueOf'>): boolean {
    const raw = items_to_cons(ISONE, arg);
    try {
        const retval = env.valueOf(raw);
        try {
            if (is_boo(retval)) {
                return retval.isTrue();
            }
            else if (is_rat(retval)) {
                return retval.isZero() ? false : true;
            }
            else {
                throw new ProgrammingError(`${retval}`);
            }
        }
        finally {
            retval.release();
        }
    }
    finally {
        raw.release();
    }
}
