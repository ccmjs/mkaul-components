/**
 * @overview description of the component
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 10.11.18.
 */

export const map_to_count = arg => arg.count;
// same as
//
// export function map_to_count( arg ) {
//   return arg.count;
// }

export const map_to_percent = arg => 100 * arg.count / arg.sum_categories;

export const map_to_cat_sum = arg => arg.delay_sums[arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]);

export const map_to_cat_avg = arg => arg.delay_sums[arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]) / arg.category_counters[arg.result.categories[arg.i]];

export const map_to_cat_max = arg => arg.delay_sums[arg.result.categories[arg.i]] = Math.max( arg.delay_sums[ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );

export const map_to_cat_min = arg => {
  // avoid 0 as minimum
  if ( arg.delay_sums[arg.result.categories[arg.i]] === 0 ) arg.delay_sums[arg.result.categories[arg.i]] = arg.result.timer[arg.i] - arg.result.timer[arg.i-1];
  arg.delay_sums[arg.result.categories[arg.i]] = Math.min( arg.delay_sums[ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
};

export const map_to_sum = arg =>
  arg.delay_sums[arg.i][arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]);

export const map_to_avg = arg => arg.delay_sums[arg.i][arg.result.categories[arg.i]] += (arg.result.timer[arg.i]-arg.result.timer[arg.i-1]) / arg.flat_counters[arg.result.categories[arg.i]];

export const map_to_max = arg => arg.delay_sums[arg.i][arg.result.categories[arg.i]] = Math.max( arg.delay_sums[arg.i][ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );

export const map_to_min = arg => {
  // avoid 0 as minimum
  if ( arg.delay_sums[arg.i][arg.result.categories[arg.i]] === 0 ) arg.delay_sums[arg.i][arg.result.categories[arg.i]] = arg.result.timer[arg.i] - arg.result.timer[arg.i-1];
  arg.delay_sums[arg.i][arg.result.categories[arg.i]] = Math.min( arg.delay_sums[arg.i][ arg.result.categories[arg.i] ], ( arg.result.timer[arg.i] - arg.result.timer[arg.i-1] ) );
};

export const map_to_debugger = arg => {
  debugger;
};

 
 
