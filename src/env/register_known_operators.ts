import { hash_binop_cons_atom, HASH_BLADE, HASH_FLT, HASH_RAT, HASH_SYM } from '../hashing/hash_info';
import { abs_any } from '../operators/abs/abs_any';
import { abs_rat } from '../operators/abs/abs_rat';
import { abs_sym_real } from '../operators/abs/abs_sym_real';
import { MATH_ABS } from '../operators/abs/MATH_ABS';
import { add_2_add_2_any_any_any } from '../operators/add/add_2_add_2_any_any_any';
import { add_2_add_2_any_any_any_factorize_rhs } from '../operators/add/add_2_add_2_any_any_any_factorize_rhs';
import { add_2_add_2_any_imag_real } from '../operators/add/add_2_add_2_any_imag_real';
import { add_2_add_2_rat_mul_2_rat_any_add_2_rat_any } from '../operators/add/add_2_add_2_any_mul_2_rat_any_add_2_rat_any';
import { add_2_add_2_any_mul_2_rat_sym_mul_2_rat_sym } from '../operators/add/add_2_add_2_any_mul_2_rat_sym_mul_2_rat_sym';
import { add_2_add_2_any_mul_2_rat_sym } from '../operators/add/add_2_add_2_any_sym_mul_2_rat_sym';
import { add_2_add_2_sym_sym_sym } from '../operators/add/add_2_add_2_sym_sym_sym';
import { add_2_add_2_sym_xxx_xxx } from '../operators/add/add_2_add_2_sym_xxx_xxx';
import { add_2_any_add } from '../operators/add/add_2_any_add';
import { add_2_any_add_2_any_any } from '../operators/add/add_2_any_add_2_any_any';
import { add_2_any_any } from '../operators/add/add_2_any_any';
import { add_2_any_any_factorize_rhs } from '../operators/add/add_2_any_any_factorize_rhs';
import { add_2_any_any_zero_sum } from '../operators/add/add_2_any_any_zero_sum';
import { add_2_any_mul_2_rat_any } from '../operators/add/add_2_any_mul_2_rat_any';
import { add_2_assoc_lhs_canonical_ordering } from '../operators/add/add_2_assoc_lhs_canonical_ordering';
import { add_2_assoc_lhs_factorize_blades } from '../operators/add/add_2_assoc_lhs_factorize_blades';
import { add_2_assoc_rhs_canonical_ordering } from '../operators/add/add_2_assoc_rhs_canonical_ordering';
import { add_2_blade_blade } from '../operators/add/add_2_blade_blade';
import { add_2_blade_mul_2_rat_blade } from '../operators/add/add_2_blade_mul_2_rat_blade';
import { add_2_canonical_ordering } from '../operators/add/add_2_canonical_ordering';
import { add_2_cons_rat } from '../operators/add/add_2_cons_rat';
import { add_2_flt_flt } from '../operators/add/add_2_flt_flt';
import { add_2_flt_rat } from '../operators/add/add_2_flt_rat';
import { add_2_flt_uom } from '../operators/add/add_2_flt_uom';
import { add_2_imag_real } from '../operators/add/add_2_imag_real';
import { add_2_imu_flt } from '../operators/add/add_2_imu_flt';
import { add_2_mul_2_any_blade_mul_2_any_blade } from '../operators/add/add_2_mul_2_any_blade_mul_2_any_blade';
import { add_2_mul_2_any_imu_sym } from '../operators/add/add_2_mul_2_any_imu_sym';
import { add_2_mul_2_any_vector_mul_2_any_vector } from '../operators/add/add_2_mul_2_any_vector_mul_2_any_vector';
import { add_2_mul_2_inner_2_sym_sym_sym_mul_2_sym_outer_2_sym_sym } from '../operators/add/add_2_mul_2_inner_sym_sym_sym_mul_2_sym_outer_2_sym_sym';
import { add_2_mul_2_rat_anX_anX } from '../operators/add/add_2_mul_2_rat_anX_anX';
import { add_2_mul_2_rat_inner_2_sym_sym_outer_2_sym_sym } from '../operators/add/add_2_mul_2_rat_inner_2_sym_sym_outer_2_sym_sym';
import { add_2_mul_2_rat_X_mul_2_rat_X } from '../operators/add/add_2_mul_2_rat_X_mul_2_rat_X';
import { add_2_mul_2_rat_zzz_aaa } from '../operators/add/add_2_mul_2_rat_zzz_aaa';
import { add_2_pow_2_any_any_mul_2_any_any } from '../operators/add/add_2_pow_2_any_any_mul_2_any_any';
import { add_2_rat_blade } from '../operators/add/add_2_rat_blade';
import { add_2_rat_cons } from '../operators/add/add_2_rat_cons';
import { add_2_rat_flt } from '../operators/add/add_2_rat_flt';
import { add_2_rat_rat } from '../operators/add/add_2_rat_rat';
import { add_2_rat_sym } from '../operators/add/add_2_rat_sym';
import { add_2_rat_uom } from '../operators/add/add_2_rat_uom';
import { add_2_sym_mul_2_sym_rat } from '../operators/add/add_2_sym_mul_2_sym_rat';
import { add_2_sym_rat } from '../operators/add/add_2_sym_rat';
import { add_2_sym_sym } from '../operators/add/add_2_sym_sym';
import { add_2_uom_flt } from '../operators/add/add_2_uom_flt';
import { add_2_uom_rat } from '../operators/add/add_2_uom_rat';
import { add_2_xxx_mul_2_rm1_xxx } from '../operators/add/add_2_xxx_mul_2_rm1_xxx';
import { add_2_zzz_mul_2_rat_aaa } from '../operators/add/add_2_zzz_mul_2_rat_aaa';
import { algebra_2_tensor_tensor } from '../operators/algebra/algebra_2_mat_mat';
import { assign_any_any } from '../operators/assign/assign_any_any';
import { assign_sym_any } from '../operators/assign/assign_sym_any';
import { is_blade, vec } from '../operators/blade/BladeExtension';
import { boo } from '../operators/boo/BooExtension';
import { ceiling_any } from '../operators/ceiling/ceiling_any';
import { ceiling_flt } from '../operators/ceiling/ceiling_flt';
import { ceiling_rat } from '../operators/ceiling/ceiling_rat';
import { conj_any } from '../operators/conj/conj_any';
import { conj_blade } from '../operators/conj/conj_blade';
import { conj_flt } from '../operators/conj/conj_flt';
import { conj_imaginary_unit } from '../operators/conj/conj_imag';
import { conj_inner } from '../operators/conj/conj_inner';
import { conj_rat } from '../operators/conj/conj_rat';
import { conj_sym } from '../operators/conj/conj_sym';
import { cons } from '../operators/cons/ConsExtension';
import { cos_add_2_any_any } from '../operators/cos/cos_add_2_any_any';
import { cos_any } from '../operators/cos/cos_any';
import { cos_sym } from '../operators/cos/cos_sym';
import { cross_add_2_any_any_any } from '../operators/cross/cross_add_2_any_any_any';
import { cross_any_add_2_any_any } from '../operators/cross/cross_any_add_2_any_any';
import { cross_any_any } from '../operators/cross/cross_any_any';
import { cross_any_mul_2_scalar_any } from '../operators/cross/cross_any_mul_2_scalar_any';
import { cross_blade_blade } from '../operators/cross/cross_blade_blade';
import { cross_mul_2_scalar_any_any } from '../operators/cross/cross_mul_2_scalar_any_any';
import { factorize_lhs_distrib } from '../operators/distrib/factorize_lhs_distrib';
import { inner_lhs_distrib_over_add_expand } from '../operators/distrib/inner_lhs_distrib_over_add_expand';
import { inner_rhs_distrib_over_add_expand } from '../operators/distrib/inner_rhs_distrib_over_add_expand';
import { lco_2_add_2_any_any_any } from '../operators/distrib/lco_2_add_2_any_any_any';
import { lco_2_any_add_2_any_any } from '../operators/distrib/lco_2_any_add_2_any_any';
import { mul_lhs_distrib_over_add_expand } from '../operators/distrib/mul_lhs_distrib_over_add_expand';
import { mul_rhs_distrib_over_add_expand } from '../operators/distrib/mul_rhs_distrib_over_add_expand';
import { mul_rhs_distrib_over_add_factor } from '../operators/distrib/mul_rhs_distrib_over_add_factor';
import { outer_2_add_2_any_any_any } from '../operators/distrib/outer_2_add_2_any_any_any';
import { outer_2_any_add_2_any_any } from '../operators/distrib/outer_2_any_add_2_any_any';
import { rco_2_add_2_any_any_any } from '../operators/distrib/rco_2_add_2_any_any_any';
import { rco_2_any_add_2_any_any } from '../operators/distrib/rco_2_any_add_2_any_any';
import { error } from '../operators/err/ErrExtension';
import { exp_any } from '../operators/exp/exp_any';
import { exp_flt } from '../operators/exp/exp_flt';
import { exp_rat } from '../operators/exp/exp_rat';
import { MATH_EXP } from '../operators/exp/MATH_EXP';
import { factorize_ab_minus_two_a_dot_b } from '../operators/factorize/factorize_ab_minus_two_a_dot_b';
import { factorize_geometric_product_add } from '../operators/factorize/factorize_geometric_product_add';
import { factorize_geometric_product_lhs_assoc } from '../operators/factorize/factorize_geometric_product_lhs_assoc';
import { factorize_geometric_product_sub } from '../operators/factorize/factorize_geometric_product_sub';
import { float_cons } from '../operators/float/float_cons';
import { float_flt } from '../operators/float/float_flt';
import { float_mul_2_flt_sym } from '../operators/float/float_mul_2_flt_sym';
import { float_rat } from '../operators/float/float_rat';
import { float_sym } from '../operators/float/float_sym';
import { float_sym_pi } from '../operators/float/float_sym_pi';
import { flt_builder, is_flt } from '../operators/flt/FltExtension';
import { heterogenous_canonical_order } from '../operators/helpers/heterogenous_canonical_order';
import { heterogenous_canonical_order_lhs_assoc } from '../operators/helpers/heterogenous_canonical_order_lhs_assoc';
import { hyp } from '../operators/hyp/HypExtension';
import { index_2_any_any } from '../operators/index/index_2_any_any';
import { index_2_mat_rat } from '../operators/index/index_2_mat_rat';
import { inner } from '../operators/inner/inner';
import { inner_2_any_any } from '../operators/inner/inner_2_any_any';
import { inner_2_any_imu } from '../operators/inner/inner_2_any_imu';
import { inner_2_imu_any } from '../operators/inner/inner_2_imu_any';
import { inner_2_imu_imu } from '../operators/inner/inner_2_imu_imu';
import { inner_2_imu_rat } from '../operators/inner/inner_2_imu_rat';
import { inner_2_mul_2_scalar_vector_vector } from '../operators/inner/inner_2_mul_2_scalar_vector_vector';
import { inner_2_num_num } from '../operators/inner/inner_2_num_num';
import { inner_2_rat_imu } from '../operators/inner/inner_2_rat_imu';
import { inner_2_rat_sym } from '../operators/inner/inner_2_rat_sym';
import { inner_2_sym_sym } from '../operators/inner/inner_2_sym_sym';
import { inner_2_vector_mul_2_scalar_vector } from '../operators/inner/inner_2_vector_mul_2_scalar_vector';
import { inner_2_vec_scalar } from '../operators/inner/inner_2_vec_scalar';
import { inner_2_vec_vec } from '../operators/inner/inner_2_vec_vec';
import { iszero_any } from '../operators/iszero/iszero_any';
import { iszero_rat } from '../operators/iszero/iszero_rat';
import { lco_2_any_any } from '../operators/lco/lco_2_any_any';
import { lco_2_any_mul_2_scalar_any } from '../operators/lco/lco_2_any_mul_2_scalar_any';
import { lco_2_blade_blade } from '../operators/lco/lco_2_blade_blade';
import { lco_2_mul_2_scalar_any_any } from '../operators/lco/lco_2_mul_2_scalar_any_any';
import { associate_right_mul_2_mul_2_any_any_any } from '../operators/mul/associate_right_mul_2_mul_2_any_any_any';
import { canonicalize_mul_2_mul_2_sym_sym_sym } from '../operators/mul/canonicalize_mul_2_mul_2_sym_sym_sym';
import { canonicalize_mul_2_sym_mul_2_sym_sym } from '../operators/mul/canonicalize_mul_2_sym_mul_2_sym_sym';
import { implicate_mul_2_mul_2_any_any_any } from '../operators/mul/implicate_mul_2_mul_2_any_any_any';
import { implicate_mul_2_mul_2_sym_sym_sym } from '../operators/mul/implicate_mul_2_mul_2_sym_sym_sym';
import { implicate_mul_2_sym_mul_2_sym_sym } from '../operators/mul/implicate_mul_2_sym_mul_2_sym_sym';
import { mul_2_any_any } from '../operators/mul/mul_2_any_any';
import { mul_2_any_mul } from '../operators/mul/mul_2_any_mul';
import { mul_2_any_mul_2_any_any } from '../operators/mul/mul_2_any_mul_2_any_any';
import { mul_2_blade_blade } from '../operators/mul/mul_2_blade_blade';
import { mul_2_blade_flt } from '../operators/mul/mul_2_blade_flt';
import { mul_2_blade_rat } from '../operators/mul/mul_2_blade_rat';
import { mul_2_blade_sym } from '../operators/mul/mul_2_blade_sym';
import { mul_2_cons_rat } from '../operators/mul/mul_2_cons_rat';
import { mul_2_flt_flt } from '../operators/mul/mul_2_flt_flt';
import { mul_2_flt_imu } from '../operators/mul/mul_2_flt_imu';
import { mul_2_flt_mul_2_flt_any } from '../operators/mul/mul_2_flt_mul_2_flt_any';
import { mul_2_flt_rat } from '../operators/mul/mul_2_flt_rat';
import { mul_2_flt_uom } from '../operators/mul/mul_2_flt_uom';
import { mul_2_imu_any } from '../operators/mul/mul_2_imu_any';
import { mul_2_mul_2_aaa_bbb_bbb } from '../operators/mul/mul_2_mul_2_aaa_bbb_bbb';
import { mul_2_mul_2_any_blade_blade } from '../operators/mul/mul_2_mul_2_any_blade_blade';
import { mul_2_mul_2_any_imu_imu } from '../operators/mul/mul_2_mul_2_any_imu_imu';
import { mul_2_mul_2_any_imu_sym } from '../operators/mul/mul_2_mul_2_any_imu_sym';
import { mul_2_mul_2_any_sym_imu } from '../operators/mul/mul_2_mul_2_any_sym_imu';
import { mul_2_mul_2_any_sym_mul_2_imu_sym } from '../operators/mul/mul_2_mul_2_any_sym_mul_2_imu_sym';
import { mul_2_mul_2_any_sym_sym } from '../operators/mul/mul_2_mul_2_any_sym_sym';
import { mul_2_mul_2_num_any_rat } from '../operators/mul/mul_2_mul_2_num_any_rat';
import { mul_2_mul_2_rat_any_mul_2_rat_any } from '../operators/mul/mul_2_mul_2_rat_any_mul_2_rat_any';
import { mul_2_mul_2_rat_sym_sym } from '../operators/mul/mul_2_mul_2_rat_sym_sym';
import { mul_2_mul_2_sym_imu_sym } from '../operators/mul/mul_2_mul_2_sym_imu_sym';
import { mul_2_one_any } from '../operators/mul/mul_2_one_any';
import { mul_2_pow_2_xxx_any_pow_2_xxx_any } from '../operators/mul/mul_2_pow_2_xxx_any_pow_2_xxx_any';
import { mul_2_pow_2_xxx_rat_xxx } from '../operators/mul/mul_2_pow_2_xxx_rat_xxx';
import { mul_2_pow_2_zzz_rat_aaa } from '../operators/mul/mul_2_pow_2_zzz_rat_aaa';
import { mul_2_rat_any } from '../operators/mul/mul_2_rat_any';
import { mul_2_rat_blade } from '../operators/mul/mul_2_rat_blade';
import { mul_2_rat_flt } from '../operators/mul/mul_2_rat_flt';
import { mul_2_rat_mul_2_rat_any } from '../operators/mul/mul_2_rat_mul_2_rat_any';
import { mul_2_rat_mul_2_sym_sym } from '../operators/mul/mul_2_rat_mul_2_sym_sym';
import { mul_2_rat_rat } from '../operators/mul/mul_2_rat_rat';
import { mul_2_rat_sym } from '../operators/mul/mul_2_rat_sym';
import { mul_2_scalar_blade } from '../operators/mul/mul_2_scalar_blade';
import { mul_2_scalar_mul_2_scalar_any } from '../operators/mul/mul_2_scalar_mul_2_scalar_any';
import { mul_2_sym_add_2_sym_sym } from '../operators/mul/mul_2_sym_add_2_sym_sym';
import { mul_2_sym_blade } from '../operators/mul/mul_2_sym_blade';
import { mul_2_sym_flt } from '../operators/mul/mul_2_sym_flt';
import { mul_2_sym_imu } from '../operators/mul/mul_2_sym_imu';
import { mul_2_sym_inner_2_sym_sym } from '../operators/mul/mul_2_sym_inner_2_sym_sym';
import { mul_2_sym_mul_2_rat_any } from '../operators/mul/mul_2_sym_mul_2_rat_any';
import { mul_2_sym_num } from '../operators/mul/mul_2_sym_num';
import { mul_2_sym_pow_2_sym_two } from '../operators/mul/mul_2_sym_pow_2_sym_two';
import { mul_2_sym_rat } from '../operators/mul/mul_2_sym_rat';
import { mul_2_sym_sym } from '../operators/mul/mul_2_sym_sym';
import { mul_2_sym_sym_general } from '../operators/mul/mul_2_sym_sym_general';
import { mul_2_uom_flt } from '../operators/mul/mul_2_uom_flt';
import { mul_2_uom_rat } from '../operators/mul/mul_2_uom_rat';
import { mul_2_uom_uom } from '../operators/mul/mul_2_uom_uom';
import { mul_2_zzz_pow_2_aaa_rat } from '../operators/mul/mul_2_zzz_pow_2_aaa_rat';
import { nil } from '../operators/nil/NilExtension';
import { outer_2_any_any } from '../operators/outer/outer_2_any_any';
import { outer_2_any_mul_2_scalar_any } from '../operators/outer/outer_2_any_mul_2_scalar_any';
import { outer_2_blade_blade } from '../operators/outer/outer_2_blade_blade';
import { outer_2_mul_2_scalar_any_any } from '../operators/outer/outer_2_mul_2_scalar_any_any';
import { outer_2_sym_outer_2_sym_sym } from '../operators/outer/outer_2_sym_outer_2_sym_sym';
import { outer_2_sym_sym } from '../operators/outer/outer_2_sym_sym';
import { pow } from '../operators/pow/pow';
import { pow_2_any_any } from '../operators/pow/pow_2_any_any';
import { pow_2_any_rat } from '../operators/pow/pow_2_any_rat';
import { pow_2_cons_rat } from '../operators/pow/pow_2_cons_rat';
import { pow_2_flt_rat } from '../operators/pow/pow_2_flt_rat';
import { pow_2_pow_2_any_any_any } from '../operators/pow/pow_2_pow_2_any_any_any';
import { pow_2_rat_mul_2_rat_rat } from '../operators/pow/pow_2_rat_mul_2_rat_rat';
import { pow_2_rat_rat } from '../operators/pow/pow_2_rat_rat';
import { pow_2_sym_rat } from '../operators/pow/pow_2_sym_rat';
import { pow_2_uom_rat } from '../operators/pow/pow_2_uom_rat';
import { pow_2_e_any } from '../operators/pow/pow_e_any';
import { pred_any } from '../operators/pred/pred_any';
import { pred_rat } from '../operators/pred/pred_rat';
import { printlist_1_any } from '../operators/printlist/printlist_1_any';
import { printlist_keyword } from '../operators/printlist/printlist_keyword';
import { is_rat, rat } from '../operators/rat/RatExtension';
import { rco_2_any_any } from '../operators/rco/rco_2_any_any';
import { rco_2_any_mul_2_scalar_any } from '../operators/rco/rco_2_any_mul_2_scalar_any';
import { rco_2_blade_blade } from '../operators/rco/rco_2_blade_blade';
import { rco_2_mul_2_scalar_any_any } from '../operators/rco/rco_2_mul_2_scalar_any_any';
import { script_last_0 } from '../operators/script_last/script_last';
import { simplify_mul_2_blade_mul_2_blade_any } from '../operators/simplify/simplify_mul_2_blade_mul_2_blade_any';
import { sin_add_2_any_any } from '../operators/sin/sin_add_2_any_any';
import { sin_any } from '../operators/sin/sin_any';
import { sin_mul_2_rat_any } from '../operators/sin/sin_mul_2_rat_any';
import { sin_sym } from '../operators/sin/sin_sym';
import { MATH_SQRT } from '../operators/sqrt/MATH_SQRT';
import { sqrt_1_any } from '../operators/sqrt/sqrt_1_any';
import { sqrt_1_rat } from '../operators/sqrt/sqrt_1_rat';
import { str } from '../operators/str/StrExtension';
import { succ_any } from '../operators/succ/succ_any';
import { succ_rat } from '../operators/succ/succ_rat';
import { is_sym } from '../operators/sym/is_sym';
import { sym } from '../operators/sym/SymExtension';
import { sym_math_add } from '../operators/sym/sym_math_add';
import { sym_math_mul } from '../operators/sym/sym_math_mul';
import { sym_math_pi } from '../operators/sym/sym_math_pi';
import { sym_math_pow } from '../operators/sym/sym_math_pow';
import { tau } from '../operators/tau/tau';
import { mat } from '../operators/tensor/TensorExtension';
import { testeq_sym_rat } from '../operators/testeq/testeq_sym_rat';
import { testgt_mul_2_any_any_rat } from '../operators/testgt/testgt_mul_2_any_any_rat';
import { testgt_rat_rat } from '../operators/testgt/testgt_rat_rat';
import { testgt_sym_rat } from '../operators/testgt/testgt_sym_rat';
import { testlt_mul_2_any_any_rat } from '../operators/testlt/testlt_mul_2_any_any_rat';
import { testlt_rat_rat } from '../operators/testlt/testlt_rat_rat';
import { testlt_sym_rat } from '../operators/testlt/testlt_sym_rat';
import { add_2_mul_2_cos_sin_mul_2_cos_sin_factoring } from '../operators/trig/add_2_mul_2_cos_sin_mul_2_cos_sin_factoring';
import { add_2_mul_2_cos_sin_mul_2_cos_sin_ordering } from '../operators/trig/add_2_mul_2_cos_sin_mul_2_cos_sin_ordering';
import { add_2_mul_2_cos_sin_mul_2_mul_2_rat_cos_sin_factoring } from '../operators/trig/add_2_mul_2_cos_sin_mul_2_mul_2_rat_cos_sin_factoring';
import { add_2_mul_2_cos_sin_mul_2_mul_2_rat_cos_sin_ordering } from '../operators/trig/add_2_mul_2_cos_sin_mul_2_mul_2_rat_cos_sin_ordering';
import { add_2_mul_2_cos_sin_mul_2_mul_2_rat_sin_cos } from '../operators/trig/add_2_mul_2_cos_sin_mul_2_mul_2_rat_sin_cos';
import { add_2_mul_2_rat_cos_sin_mul_2_mul_2_cos_sin_factoring } from '../operators/trig/add_2_mul_2_rat_cos_sin_mul_2_mul_2_cos_sin_factoring';
import { add_2_mul_2_sin_cos_mul_2_cos_sin } from '../operators/trig/add_2_mul_2_sin_cos_mul_2_cos_sin';
import { add_2_mul_2_sin_cos_mul_2_mul_2_rat_cos_sin } from '../operators/trig/add_2_mul_2_sin_cos_mul_2_mul_2_rat_cos_sin';
import { add_2_mul_2_sin_cos_mul_2_rat_mul_2_cos_sin } from '../operators/trig/add_2_mul_2_sin_cos_mul_2_rat_mul_2_cos_sin';
import { mul_2_sin_cos } from '../operators/trig/mul_2_sin_cos';
import { typeof_any } from '../operators/typeof/typeof_any';
import { typeof_mat } from '../operators/typeof/typeof_mat';
import { typeof_blade } from '../operators/typeof/typeof_vec';
import { is_uom, uom } from '../operators/uom/UomExtension';
import { uom_1_str } from '../operators/uom/uom_1_str';
import { MATH_ADD, MATH_LCO, MATH_MUL, MATH_OUTER, MATH_RCO, MATH_TAU } from '../runtime/ns_math';
import { SymEngineOptions } from '../runtime/symengine';
import { one, zero } from '../tree/rat/Rat';
import { ExtensionEnv } from "./ExtensionEnv";


/**
 * Registers the Operator extension(s) with the environment.
 */
export function register_known_operators(version: 1 | 2 | 3, options: SymEngineOptions | undefined, $: ExtensionEnv) {

    $.setAssocL(MATH_ADD, true);
    $.setAssocL(MATH_MUL, true);
    $.setAssocL(MATH_LCO, true);
    $.setAssocL(MATH_RCO, true);
    $.setAssocL(MATH_OUTER, true);
    if (options) {
        if (Array.isArray(options.assocs)) {
            for (const assoc of options.assocs) {
                switch (assoc.dir) {
                    case 'L': {
                        $.setAssocL(assoc.sym, true);
                        break;
                    }
                    case 'R': {
                        $.setAssocR(assoc.sym, true);
                        break;
                    }
                }
            }
        }
    }

    $.defineOperator(mul_rhs_distrib_over_add_expand);
    $.defineOperator(mul_lhs_distrib_over_add_expand);

    $.defineOperator(mul_rhs_distrib_over_add_factor);

    $.defineOperator(factorize_lhs_distrib('factorize LHS distrib (*,+)', MATH_MUL, MATH_ADD));

    $.defineOperator(inner_rhs_distrib_over_add_expand);
    $.defineOperator(inner_lhs_distrib_over_add_expand);

    $.defineOperator(factorize_geometric_product_add);
    $.defineOperator(factorize_geometric_product_sub);
    $.defineOperator(factorize_ab_minus_two_a_dot_b);
    $.defineOperator(factorize_geometric_product_lhs_assoc);

    $.defineOperator(add_2_add_2_rat_mul_2_rat_any_add_2_rat_any);
    $.defineOperator(add_2_add_2_any_mul_2_rat_sym_mul_2_rat_sym);
    $.defineOperator(add_2_add_2_any_mul_2_rat_sym);

    $.defineOperator(add_2_flt_flt);
    $.defineOperator(add_2_flt_rat);
    $.defineOperator(add_2_flt_uom);
    $.defineOperator(add_2_rat_blade);
    $.defineOperator(add_2_rat_uom);
    $.defineOperator(add_2_rat_flt);
    $.defineOperator(add_2_rat_rat);
    $.defineOperator(add_2_rat_sym);
    $.defineOperator(add_2_rat_cons);
    $.defineOperator(add_2_uom_flt);
    $.defineOperator(add_2_uom_rat);

    // Missing add_sym_flt
    // Missing add_sym_rat
    $.defineOperator(add_2_sym_rat);
    $.defineOperator(add_2_cons_rat);
    $.defineOperator(add_2_xxx_mul_2_rm1_xxx);
    $.defineOperator(add_2_any_mul_2_rat_any);
    $.defineOperator(add_2_blade_mul_2_rat_blade);
    $.defineOperator(add_2_zzz_mul_2_rat_aaa);
    $.defineOperator(add_2_add_2_sym_xxx_xxx);
    $.defineOperator(add_2_add_2_sym_sym_sym);
    $.defineOperator(add_2_add_2_any_imag_real);
    $.defineOperator(add_2_canonical_ordering);
    $.defineOperator(add_2_add_2_any_any_any_factorize_rhs);
    $.defineOperator(add_2_assoc_lhs_canonical_ordering);
    $.defineOperator(add_2_assoc_rhs_canonical_ordering);
    $.defineOperator(add_2_assoc_lhs_factorize_blades);
    $.defineOperator(add_2_add_2_any_any_any);

    $.defineOperator(add_2_mul_2_rat_X_mul_2_rat_X);
    $.defineOperator(add_2_mul_2_rat_anX_anX);
    $.defineOperator(add_2_mul_2_rat_zzz_aaa);
    $.defineOperator(add_2_mul_2_any_imu_sym);
    $.defineOperator(add_2_mul_2_sin_cos_mul_2_cos_sin);
    $.defineOperator(add_2_mul_2_cos_sin_mul_2_cos_sin_ordering);
    $.defineOperator(add_2_mul_2_cos_sin_mul_2_cos_sin_factoring);
    $.defineOperator(add_2_mul_2_sin_cos_mul_2_mul_2_rat_cos_sin);
    $.defineOperator(add_2_mul_2_sin_cos_mul_2_rat_mul_2_cos_sin);
    $.defineOperator(add_2_mul_2_cos_sin_mul_2_mul_2_rat_sin_cos);
    $.defineOperator(add_2_mul_2_cos_sin_mul_2_mul_2_rat_cos_sin_ordering);
    $.defineOperator(add_2_mul_2_cos_sin_mul_2_mul_2_rat_cos_sin_factoring);
    $.defineOperator(add_2_mul_2_rat_cos_sin_mul_2_mul_2_cos_sin_factoring);
    $.defineOperator(add_2_mul_2_any_blade_mul_2_any_blade);
    $.defineOperator(add_2_mul_2_any_vector_mul_2_any_vector);
    $.defineOperator(add_2_pow_2_any_any_mul_2_any_any);
    $.defineOperator(add_2_any_add_2_any_any);
    $.defineOperator(add_2_any_add);
    $.defineOperator(add_2_sym_sym);
    $.defineOperator(add_2_sym_mul_2_sym_rat);
    $.defineOperator(add_2_blade_blade);
    $.defineOperator(add_2_mul_2_rat_inner_2_sym_sym_outer_2_sym_sym);
    $.defineOperator(add_2_mul_2_inner_2_sym_sym_sym_mul_2_sym_outer_2_sym_sym);
    $.defineOperator(add_2_imag_real);
    $.defineOperator(add_2_imu_flt);
    $.defineOperator(add_2_any_any_zero_sum);
    $.defineOperator(add_2_any_any_factorize_rhs);
    $.defineOperator(add_2_any_any);

    $.defineAssociative(MATH_ADD, zero);
    $.defineAssociative(MATH_MUL, one);

    $.defineOperator(pow_2_pow_2_any_any_any);
    $.defineOperator(pow_2_e_any);
    $.defineOperator(pow_2_sym_rat);
    $.defineOperator(pow_2_rat_rat);
    $.defineOperator(pow_2_rat_mul_2_rat_rat);
    $.defineOperator(pow_2_flt_rat);
    $.defineOperator(pow_2_uom_rat);
    $.defineOperator(pow_2_cons_rat);
    $.defineOperator(pow_2_any_rat);
    $.defineOperator(pow_2_any_any);
    $.defineOperator(pow);

    $.defineOperator(mul_2_sym_blade);
    $.defineOperator(mul_2_one_any);
    // $.defineOperator(mul_cons_sym);

    $.defineOperator(mul_2_flt_flt);
    $.defineOperator(mul_2_flt_rat);
    $.defineOperator(mul_2_flt_imu);
    $.defineOperator(mul_2_flt_uom);
    $.defineOperator(mul_2_flt_mul_2_flt_any);
    $.defineOperator(mul_2_imu_any);

    $.defineOperator(mul_2_rat_blade);
    $.defineOperator(mul_2_rat_flt);
    $.defineOperator(mul_2_rat_rat);
    $.defineOperator(mul_2_rat_sym);
    $.defineOperator(mul_2_rat_mul_2_rat_any);
    $.defineOperator(mul_2_rat_mul_2_sym_sym);
    $.defineOperator(mul_2_rat_any);
    $.defineOperator(mul_2_mul_2_rat_any_mul_2_rat_any);
    $.defineOperator(mul_2_scalar_mul_2_scalar_any);

    $.defineOperator(simplify_mul_2_blade_mul_2_blade_any);

    $.defineOperator(mul_2_mul_2_aaa_bbb_bbb);
    $.defineOperator(canonicalize_mul_2_mul_2_sym_sym_sym);
    $.defineOperator(implicate_mul_2_mul_2_sym_sym_sym);

    // The following is only used for right-associating.
    $.defineOperator(mul_2_mul_2_rat_sym_sym);
    $.defineOperator(mul_2_mul_2_sym_imu_sym);
    $.defineOperator(mul_2_mul_2_any_imu_sym);

    $.defineOperator(mul_2_mul_2_num_any_rat);
    $.defineOperator(mul_2_mul_2_any_imu_imu);
    $.defineOperator(mul_2_mul_2_any_blade_blade);
    $.defineOperator(mul_2_mul_2_any_sym_imu);
    $.defineOperator(mul_2_mul_2_any_sym_sym);
    $.defineOperator(mul_2_mul_2_any_sym_mul_2_imu_sym);
    // Notice how we need three operators in order to provide canonical ordering.
    // TODO: DRY the duplication of hash specification and matching guard functions.
    $.defineOperator(heterogenous_canonical_order_lhs_assoc('HCOLA Flt * Uom', hash_binop_cons_atom(MATH_MUL, MATH_MUL, HASH_FLT), MATH_MUL, is_flt, is_uom));
    $.defineOperator(heterogenous_canonical_order_lhs_assoc('HCOLA Rat * Uom', hash_binop_cons_atom(MATH_MUL, MATH_MUL, HASH_RAT), MATH_MUL, is_flt, is_uom));
    $.defineOperator(heterogenous_canonical_order_lhs_assoc('HCOLA Sym * Blade', hash_binop_cons_atom(MATH_MUL, MATH_MUL, HASH_SYM), MATH_MUL, is_sym, is_blade));
    $.defineOperator(heterogenous_canonical_order_lhs_assoc('HCOLA Sym * Uom', hash_binop_cons_atom(MATH_MUL, MATH_MUL, HASH_SYM), MATH_MUL, is_sym, is_uom));
    $.defineOperator(heterogenous_canonical_order_lhs_assoc('HCOLA Blade * Uom', hash_binop_cons_atom(MATH_MUL, MATH_MUL, HASH_BLADE), MATH_MUL, is_blade, is_uom));
    $.defineOperator(associate_right_mul_2_mul_2_any_any_any);
    $.defineOperator(implicate_mul_2_mul_2_any_any_any);
    $.defineOperator(mul_2_pow_2_xxx_rat_xxx);
    // $.defineOperator(mul_2_outer_2_sym_sym_sym);
    $.defineOperator(mul_2_zzz_pow_2_aaa_rat);
    $.defineOperator(mul_2_sym_add_2_sym_sym);
    $.defineOperator(mul_2_sym_inner_2_sym_sym);
    // Disable because it is a very strong canonicalizer.
    // $.defineOperator(mul_2_sym_outer_2_sym_sym);
    $.defineOperator(canonicalize_mul_2_sym_mul_2_sym_sym);
    $.defineOperator(implicate_mul_2_sym_mul_2_sym_sym);
    $.defineOperator(mul_2_sym_mul_2_rat_any);
    $.defineOperator(mul_2_sym_pow_2_sym_two);
    $.defineOperator(mul_2_sym_flt);
    $.defineOperator(mul_2_sym_rat);
    $.defineOperator(mul_2_sym_num);
    $.defineOperator(mul_2_sym_sym_general);
    $.defineOperator(mul_2_sym_sym);
    $.defineOperator(mul_2_sym_imu);
    $.defineOperator(mul_2_pow_2_zzz_rat_aaa);
    $.defineOperator(mul_2_pow_2_xxx_any_pow_2_xxx_any);
    $.defineOperator(mul_2_any_mul_2_any_any);
    $.defineOperator(mul_2_any_mul);

    // TODO: Notice that this transformer is not being found because Num is not recognized in hashing...
    $.defineOperator(heterogenous_canonical_order('HCO: Flt * Uom', '(* Uom Flt)', MATH_MUL, is_flt, is_uom));
    $.defineOperator(heterogenous_canonical_order('HCO: Rat * Uom', '(* Uom Rat)', MATH_MUL, is_rat, is_uom));
    $.defineOperator(heterogenous_canonical_order('HCO: Sym * Blade', '(* Blade Sym)', MATH_MUL, is_sym, is_blade));
    $.defineOperator(heterogenous_canonical_order('HCO: Sym * Uom', '(* Uom Sym)', MATH_MUL, is_sym, is_uom));
    $.defineOperator(heterogenous_canonical_order('HCO: Blade * Uom', '(* Uom Blade)', MATH_MUL, is_blade, is_uom));
    $.defineOperator(mul_2_uom_rat);
    $.defineOperator(mul_2_uom_flt);
    $.defineOperator(mul_2_uom_uom);

    $.defineOperator(mul_2_blade_flt);
    $.defineOperator(mul_2_blade_rat);
    $.defineOperator(mul_2_blade_sym);
    $.defineOperator(mul_2_blade_blade);
    $.defineOperator(mul_2_scalar_blade);
    $.defineOperator(mul_2_sin_cos);
    $.defineOperator(mul_2_any_any);
    $.defineOperator(mul_2_cons_rat);

    $.defineOperator(conj_inner);
    $.defineOperator(conj_sym);
    $.defineOperator(conj_rat);
    $.defineOperator(conj_flt);
    $.defineOperator(conj_imaginary_unit);
    $.defineOperator(conj_blade);
    $.defineOperator(conj_any);

    $.defineOperator(inner_2_num_num);
    $.defineOperator(inner_2_rat_imu);
    $.defineOperator(inner_2_rat_sym);
    $.defineOperator(inner_2_imu_rat);
    $.defineOperator(inner_2_imu_imu);
    $.defineOperator(inner_2_imu_any);
    $.defineOperator(inner_2_sym_sym);
    $.defineOperator(inner_2_vec_scalar);
    $.defineOperator(inner_2_vec_vec);
    $.defineOperator(inner_2_mul_2_scalar_vector_vector);
    $.defineOperator(inner_2_vector_mul_2_scalar_vector);
    $.defineOperator(inner_2_any_imu);
    $.defineOperator(inner_2_any_any);
    $.defineOperator(inner);

    $.defineOperator(lco_2_blade_blade);
    $.defineOperator(lco_2_add_2_any_any_any);
    $.defineOperator(lco_2_mul_2_scalar_any_any);
    $.defineOperator(lco_2_any_add_2_any_any);
    $.defineOperator(lco_2_any_mul_2_scalar_any);
    $.defineOperator(lco_2_any_any);

    $.defineOperator(outer_2_blade_blade);
    $.defineOperator(outer_2_add_2_any_any_any);
    $.defineOperator(outer_2_mul_2_scalar_any_any);
    // $.defineOperator(outer_2_sym_sym_vector_antisymmetry);
    // $.defineOperator(outer_2_sym_sym_vector_to_geometric);
    $.defineOperator(outer_2_sym_sym);
    $.defineOperator(outer_2_sym_outer_2_sym_sym);
    $.defineOperator(outer_2_any_add_2_any_any);
    $.defineOperator(outer_2_any_mul_2_scalar_any);
    $.defineOperator(outer_2_any_any);

    $.defineOperator(rco_2_blade_blade);
    $.defineOperator(rco_2_add_2_any_any_any);
    $.defineOperator(rco_2_mul_2_scalar_any_any);
    $.defineOperator(rco_2_any_add_2_any_any);
    $.defineOperator(rco_2_any_mul_2_scalar_any);
    $.defineOperator(rco_2_any_any);

    $.defineOperator(boo);
    $.defineOperator(rat);
    $.defineOperator(flt_builder);
    $.defineOperator(str);

    $.defineOperator(abs_rat);
    $.defineOperator(abs_sym_real);
    $.defineOperator(abs_any);
    $.setCost(MATH_ABS, 4);

    $.defineOperator(algebra_2_tensor_tensor);

    $.defineOperator(assign_sym_any);
    $.defineOperator(assign_any_any);

    $.defineOperator(ceiling_flt);
    $.defineOperator(ceiling_rat);
    $.defineOperator(ceiling_any);

    $.defineOperator(cos_add_2_any_any);
    $.defineOperator(cos_sym);
    $.defineOperator(cos_any);

    $.defineOperator(cross_blade_blade);
    // Linearity Laws
    $.defineOperator(cross_mul_2_scalar_any_any);
    $.defineOperator(cross_any_mul_2_scalar_any);
    // Distribution Laws of cross over addition.
    $.defineOperator(cross_add_2_any_any_any);
    $.defineOperator(cross_any_add_2_any_any);
    $.defineOperator(cross_any_any);

    $.defineOperator(exp_flt);
    $.defineOperator(exp_rat);
    $.defineOperator(exp_any);
    $.setCost(MATH_EXP, 2);

    $.defineOperator(float_mul_2_flt_sym);
    $.defineOperator(float_cons);
    $.defineOperator(float_sym_pi);
    $.defineOperator(float_sym);
    $.defineOperator(float_flt);
    $.defineOperator(float_rat);

    $.defineOperator(index_2_mat_rat);
    $.defineOperator(index_2_any_any);

    $.defineOperator(iszero_rat);
    $.defineOperator(iszero_any);

    $.defineOperator(pred_rat);
    $.defineOperator(pred_any);

    $.defineOperator(printlist_1_any);
    $.defineOperator(printlist_keyword);

    $.defineOperator(script_last_0);

    $.defineOperator(succ_rat);
    $.defineOperator(succ_any);

    $.defineOperator(sin_add_2_any_any);
    $.defineOperator(sin_sym);
    $.defineOperator(sin_mul_2_rat_any);
    $.defineOperator(sin_any);

    $.defineOperator(sqrt_1_rat);
    $.defineOperator(sqrt_1_any);
    $.setCost(MATH_SQRT, 2);

    $.defineOperator(typeof_mat);
    $.defineOperator(typeof_blade);
    $.defineOperator(typeof_any);

    $.defineOperator(tau);
    $.setCost(MATH_TAU, 3);

    $.defineOperator(testeq_sym_rat);

    $.defineOperator(testlt_rat_rat);
    $.defineOperator(testlt_sym_rat);
    $.defineOperator(testlt_mul_2_any_any_rat);

    $.defineOperator(testgt_rat_rat);
    $.defineOperator(testgt_sym_rat);
    $.defineOperator(testgt_mul_2_any_any_rat);

    $.defineOperator(sym_math_add);
    $.defineOperator(sym_math_mul);
    $.defineOperator(sym_math_pow);
    $.defineOperator(sym_math_pi);

    $.defineOperator(sym);
    $.defineOperator(mat);
    $.defineOperator(vec);
    $.defineOperator(uom);
    $.defineOperator(hyp);
    $.defineOperator(error);

    $.defineOperator(uom_1_str);

    // NIL is implemented as an empty Cons, so it has to be defined before the generic Cons operator.
    $.defineOperator(nil);

    // There is no fallback. We migrate everything.
    $.defineOperator(cons);
}
