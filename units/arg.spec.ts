import { assert } from "chai";
import { create_script_context, SyntaxKind } from "../index";
import { assert_one_value_execute } from "./assert_one_value_execute";

//
// Using concrete complex numbers to test the handling of the various quadrants.
// https://en.wikipedia.org/wiki/Argument_(complex_analysis) 
//
describe("arg", function () {
    it("arg(0)", function () {
        const lines: string[] = [
            `arg(0)`
        ];
        const sourceText = lines.join('\n');

        const context = create_script_context({});

        const { values } = context.executeScript(sourceText, { syntaxKind: SyntaxKind.Native });
        assert.isArray(values);
        assert.strictEqual(values.length, 1);
        assert.strictEqual(context.renderAsSExpr(values[0]), "undefined");
        context.release();
    });
    it("arg(0.0)", function () {
        const lines: string[] = [
            `arg(0.0)`
        ];
        const sourceText = lines.join('\n');

        const context = create_script_context({});

        const { values } = context.executeScript(sourceText, { syntaxKind: SyntaxKind.Native });
        assert.isArray(values);
        assert.strictEqual(values.length, 1);
        assert.strictEqual(context.renderAsSExpr(values[0]), "undefined");
        context.release();
    });
    it("arg(1)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `arg(1)`
        ];
        const sourceText = lines.join('\n');

        const context = create_script_context({});

        const { values } = context.executeScript(sourceText, { syntaxKind: SyntaxKind.Native });
        assert.isArray(values);
        assert.strictEqual(values.length, 1);
        assert.strictEqual(context.renderAsSExpr(values[0]), "0");
        context.release();
    });
    it("arg(i)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `arg(i)`
        ];
        const sourceText = lines.join('\n');

        const context = create_script_context({});

        const { values } = context.executeScript(sourceText, { syntaxKind: SyntaxKind.Native });
        assert.isArray(values);
        assert.strictEqual(values.length, 1);
        assert.strictEqual(context.renderAsSExpr(values[0]), "pi");
        context.release();
    });
    it("arg(-1+0.1*i)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `arg(-1+0.1*i)`
        ];
        const sourceText = lines.join('\n');

        const context = create_script_context({});

        const { values } = context.executeScript(sourceText, { syntaxKind: SyntaxKind.Native });
        assert.isArray(values);
        assert.strictEqual(values.length, 1);
        assert.strictEqual(context.renderAsSExpr(values[0]), "3.041924...");
        context.release();
    });
    it("arg(-i)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `arg(-i)`
        ];
        const sourceText = lines.join('\n');

        const context = create_script_context({});

        const { values } = context.executeScript(sourceText, { syntaxKind: SyntaxKind.Native });
        assert.isArray(values);
        assert.strictEqual(values.length, 1);
        assert.strictEqual(context.renderAsSExpr(values[0]), "(* -1 pi)");
        context.release();
    });
    it("arg(1+i)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `arg(1+i)`
        ];
        const sourceText = lines.join('\n');

        const context = create_script_context({});

        const { values } = context.executeScript(sourceText, { syntaxKind: SyntaxKind.Native });
        assert.isArray(values);
        assert.strictEqual(values.length, 1);
        assert.strictEqual(context.renderAsSExpr(values[0]), "(* 1/4 pi)");
        context.release();
    });
    it("arg(-1+i)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `arg(-1+i)`
        ];
        const sourceText = lines.join('\n');

        const context = create_script_context({});

        const { values } = context.executeScript(sourceText, { syntaxKind: SyntaxKind.Native });
        assert.isArray(values);
        assert.strictEqual(values.length, 1);
        assert.strictEqual(context.renderAsSExpr(values[0]), "(* 3/4 pi)");
        context.release();
    });
    it("arg(1-i)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `arg(1-i)`
        ];
        const sourceText = lines.join('\n');

        const context = create_script_context({});

        const { values } = context.executeScript(sourceText, { syntaxKind: SyntaxKind.Native });
        assert.isArray(values);
        assert.strictEqual(values.length, 1);
        assert.strictEqual(context.renderAsSExpr(values[0]), "(* -1/4 pi)");
        context.release();
    });
    it("arg(-1-i)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `arg(-1-i)`
        ];
        const sourceText = lines.join('\n');

        const context = create_script_context({});

        const { values } = context.executeScript(sourceText, { syntaxKind: SyntaxKind.Native });
        assert.isArray(values);
        assert.strictEqual(values.length, 1);
        assert.strictEqual(context.renderAsSExpr(values[0]), "(* -3/4 pi)");
        context.release();
    });
});

xdescribe("arg", function () {
    it("arg(a)", function () {
        const lines: string[] = [
            `arg(a)`
        ];
        const engine = create_script_context({
            useCaretForExponentiation: true
        });
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsInfix(actual), "arg(a)");
        engine.release();
    });
    it("arg(a/b)", function () {
        const lines: string[] = [
            `arg(a/b)`
        ];
        const engine = create_script_context({
            useCaretForExponentiation: true
        });
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsInfix(actual), "arg(a)-arg(b)");
        engine.release();
    });
    it("arg(x+i*y)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `arg(x+i*y)`
        ];
        const engine = create_script_context({
            useCaretForExponentiation: true
        });
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsInfix(actual), "arctan(y/x)");
        engine.release();
    });
    it("arg((a+i*b)/(c+i*d))", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `arg((a+i*b)/(c+i*d))`
        ];
        const engine = create_script_context({
            useCaretForExponentiation: true
        });
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsInfix(actual), "arctan(a/b)-arctan(c/d)");
        engine.release();
    });
    // FIXME
    xit("arg(exp(i*pi/3))", function () {
        const lines: string[] = [
            `arg(exp(i*pi/3))`,
        ];
        const engine = create_script_context({
            useDefinitions: true
        });
        const value = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsInfix(value), "1/3*pi");
        engine.release();
    });
});
