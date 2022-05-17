import { assert } from "chai";
import { print_expr, print_list } from "../src/print";
import { createSymEngine } from "../src/runtime/symengine";
import { assert_one_value_execute } from "./assert_one_value_execute";

describe("canon", function () {
    xit("Multiplication should not hide the need to transform to canonical form", function () {
        const lines: string[] = [
            `autofactor=0`,
            `implicate=0`,
            `a*(b^c)`,
        ];
        const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        // assert.strictEqual(print_list(value, $), "???");
        assert.strictEqual(print_expr(value, $), "10*a|b*c-10*a|c*b+5*b^c*a");
        engine.release();
    });
    xit("Multiplication should not hide the need to transform to canonical form", function () {
        const lines: string[] = [
            `autofactor=0`,
            `implicate=0`,
            `5*a*(b^c)`,
        ];
        const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        // assert.strictEqual(print_list(value, $), "???");
        assert.strictEqual(print_expr(value, $), "10*a|b*c-10*a|c*b+5*b^c*a");
        engine.release();
    });
});

describe("canon", function () {
    describe("mul_2_inner_2_vector_vector_vector", function () {
        it("(a|b)*c", function () {
            const lines: string[] = [
                `(a|b)*c`
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(* (| a b) c)');
            assert.strictEqual(print_expr(expr, $), 'a|b*c');
            engine.release();
        });
        it("c*(a|b)", function () {
            const lines: string[] = [
                `c*(a|b)`
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(* (| a b) c)');
            assert.strictEqual(print_expr(expr, $), 'a|b*c');
            engine.release();
        });
        it("c*(b|a)", function () {
            const lines: string[] = [
                `c*(b|a)`
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(* (| a b) c)');
            assert.strictEqual(print_expr(expr, $), 'a|b*c');
            engine.release();
        });
        it("(c|b)*a", function () {
            const lines: string[] = [
                `(c|b)*a`
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(* (| b c) a)');
            assert.strictEqual(print_expr(expr, $), 'b|c*a');
            engine.release();
        });
        it("a*(c|b)", function () {
            const lines: string[] = [
                `a*(c|b)`
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(* (| b c) a)');
            assert.strictEqual(print_expr(expr, $), 'b|c*a');
            engine.release();
        });
        it("a*(b|c)", function () {
            const lines: string[] = [
                `a*(b|c)`
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(* (| b c) a)');
            assert.strictEqual(print_expr(expr, $), 'b|c*a');
            engine.release();
        });
        it("(c|a)*b", function () {
            const lines: string[] = [
                `(c|a)*b`
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(* (| a c) b)');
            assert.strictEqual(print_expr(expr, $), 'a|c*b');
            engine.release();
        });
        it("b*(c|a)", function () {
            const lines: string[] = [
                `b*(c|a)`
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(* (| a c) b)');
            assert.strictEqual(print_expr(expr, $), 'a|c*b');
            engine.release();
        });
        it("b*(a|c)", function () {
            const lines: string[] = [
                `b*(a|c)`
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(* (| a c) b)');
            assert.strictEqual(print_expr(expr, $), 'a|c*b');
            engine.release();
        });
    });
    describe("add_2_mul_2_inner_2_sym_sym_sym_mul_2_inner_2_sym_sym_sym", function () {
        it("(a|b)*c+(a|c)*b", function () {
            const lines: string[] = [
                `(a|b)*c+(a|c)*b`
            ];
            const engine = createSymEngine({
                dependencies: ['Vector'],
                treatAsVectors: ['a', 'b', 'c']
            });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(+ (* (| a c) b) (* (| a b) c))');
            assert.strictEqual(print_expr(expr, $), 'a|c*b+a|b*c');
            engine.release();
        });
        xit("(a|c)*b+(a|b)*c", function () {
            const lines: string[] = [
                `(a|c)*b+(a|b)*c`
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const expr = assert_one_value_execute(lines.join('\n'), engine);
            assert.strictEqual(print_list(expr, $), '(+ (* (| a c) b) (* (| a b) c))');
            assert.strictEqual(print_expr(expr, $), 'a|b*c+a|c*b');
            engine.release();
        });
    });
    describe("a*(b^c)", function () {
        xit("should be transformed to canonical form", function () {
            const lines: string[] = [
                `a*(b^c)`,
            ];
            const engine = createSymEngine({ treatAsVectors: ['a', 'b', 'c'] });
            const $ = engine.$;
            const value = assert_one_value_execute(lines.join('\n'), engine);
            // assert.strictEqual($.toListString(value), "(* (| n n) a)");
            assert.strictEqual(print_expr(value, $), "2*a|b*c-2*a|c*b+b^c*a");
            engine.release();
        });
    });
});
