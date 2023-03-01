import { assert } from "chai";
import { create_script_engine } from "../src/runtime/script_engine";
import { assert_one_value_execute } from "./assert_one_value_execute";

describe("Exponentiation", function () {
    it("a**b should parse", function () {
        const lines: string[] = [
            `a**b`
        ];
        const engine = create_script_engine();
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), '(power a b)');
        assert.strictEqual(engine.renderAsInfix(actual), 'a**b');
        engine.release();
    });
    it("a^b should parse", function () {
        const lines: string[] = [
            `a^b`
        ];
        const engine = create_script_engine({ useCaretForExponentiation: false });
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), '(^ a b)');
        assert.strictEqual(engine.renderAsInfix(actual), 'a^b');
        engine.release();
    });
    it("operator should be right-associative", function () {
        const lines: string[] = [
            `a**b**c`
        ];
        const engine = create_script_engine();
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), '(power a (power b c))');
        assert.strictEqual(engine.renderAsInfix(actual), 'a**(b**c)');
        engine.release();
    });
    it("Exponentiation binds more tightly than multiplication", function () {
        const lines: string[] = [
            `a**1/2`
        ];
        const engine = create_script_engine();
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), '(* 1/2 a)');
        assert.strictEqual(engine.renderAsInfix(actual), '1/2*a');
        engine.release();
    });
    it("-1**0 is treated as -(1**0) and so evaluates to -1", function () {
        const lines: string[] = [
            `-1**0`
        ];
        const engine = create_script_engine();
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), "-1");
        assert.strictEqual(engine.renderAsInfix(actual), "-1");
        engine.release();
    });
    it("(-1)**0", function () {
        const lines: string[] = [
            `(-1)**0`
        ];
        const engine = create_script_engine();
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), "1");
        assert.strictEqual(engine.renderAsInfix(actual), "1");
        engine.release();
    });
    it("test A", function () {
        const lines: string[] = [
            `a**1/2 + a**1/2`
        ];
        const engine = create_script_engine();
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), 'a');
        assert.strictEqual(engine.renderAsInfix(actual), 'a');
        engine.release();
    });
    it("test B", function () {
        const lines: string[] = [
            `2**(1/2)`
        ];
        const engine = create_script_engine();
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), '(power 2 1/2)');
        assert.strictEqual(engine.renderAsInfix(actual), '2**(1/2)');
        engine.release();
    });
    it("pre-test C.1", function () {
        const lines: string[] = [
            `3 * 1/2`
        ];
        const engine = create_script_engine();
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), '3/2');
        assert.strictEqual(engine.renderAsInfix(actual), '3/2');
        engine.release();
    });
    it("pre-test C.2", function () {
        const lines: string[] = [
            `3/2-1`
        ];
        const engine = create_script_engine();
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), '1/2');
        assert.strictEqual(engine.renderAsInfix(actual), '1/2');
        engine.release();
    });
    it("test C", function () {
        const lines: string[] = [
            `2**(3/2)`
        ];
        const engine = create_script_engine();
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        // assert.strictEqual(print_list(actual,$), '(power 2 1/2)');
        assert.strictEqual(engine.renderAsInfix(actual), '2*2**(1/2)');
        engine.release();
    });
    it("test D", function () {
        const lines: string[] = [
            `(-2)**(3/2)`
        ];
        const engine = create_script_engine({ useDefinitions: true });
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsInfix(actual), '-2*i*2**(1/2)');
        engine.release();
    });
    it("test E", function () {
        const lines: string[] = [
            `a*a`
        ];
        const engine = create_script_engine({ useDefinitions: true });
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), '(power a 2)');
        assert.strictEqual(engine.renderAsInfix(actual), 'a**2');
        engine.release();
    });
    it("test F", function () {
        const lines: string[] = [
            `a*a*a`
        ];
        const engine = create_script_engine({ useDefinitions: true });
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsSExpr(actual), '(power a 3)');
        assert.strictEqual(engine.renderAsInfix(actual), 'a**3');
        engine.release();
    });
});
