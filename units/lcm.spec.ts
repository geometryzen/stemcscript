import assert from 'assert';
import { create_script_context } from "../src/runtime/script_engine";

describe("lcm", function () {
    it("lcm(4,6)", function () {
        console.log("lcm.spec.ts");
        const lines: string[] = [
            `lcm(4,6)`
        ];
        const engine = create_script_context({
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsSExpr(values[0]), "12");
        assert.strictEqual(engine.renderAsInfix(values[0]), "12");
        engine.release();
    });
});
