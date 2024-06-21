import { Cons, U } from "@stemcmicro/tree";
import { EnvConfig } from "../../env/EnvConfig";
import { ExtensionEnv, mkbuilder, TFLAG_DIFF, TFLAG_HALT } from "../../env/ExtensionEnv";
import { hash_nonop_cons } from "@stemcmicro/hashing";
import { AND } from "../../runtime/constants";
import { eval_and } from "../../eval_test";
import { FunctionVarArgs } from "../helpers/FunctionVarArgs";

class Op extends FunctionVarArgs<Cons> {
    readonly #hash: string;
    constructor(readonly config: Readonly<EnvConfig>) {
        super("and", AND);
        this.#hash = hash_nonop_cons(this.opr);
    }
    get hash(): string {
        return this.#hash;
    }
    transform(expr: Cons, $: ExtensionEnv): [number, U] {
        const retval = eval_and(expr, $);
        const changed = !retval.equals(expr);
        return [changed ? TFLAG_DIFF : TFLAG_HALT, retval];
    }
}

export const and_varargs = mkbuilder(Op);
