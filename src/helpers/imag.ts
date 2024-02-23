import { ExprContext } from "math-expression-context";
import { Native, native_sym } from "math-expression-native";
import { items_to_cons, U } from "math-expression-tree";

const IMAG = native_sym(Native.imag);

export function imag(arg: U, env: Pick<ExprContext, 'valueOf'>): U {
    const raw = items_to_cons(IMAG, arg);
    try {
        return env.valueOf(raw);
    }
    finally {
        raw.release();
    }
}
