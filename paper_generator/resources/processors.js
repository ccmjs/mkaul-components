/**
 * @overview external processors for own statistics and plots
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 2018-11-25.
 */

export const process_this_result = function( args ){
  const { individual_results, self } = args;
  console.log( individual_results );
};

export const  process_all_results = function( args ){
  const { dataset, self, category_counters, sum_categories, counters, flat_counters } = args;
  console.log( dataset );
  const sum={}; // sum of categories
  dataset.forEach(r=>{r.categories.forEach(c=>{if(!sum[c])sum[c]=0;sum[c]+=1})});
  delete sum[0];
  self.plotter.start( {
    root: self.div('my_own_plot'),
    // data: [ { "x": [1, 2, 3, 4, 5], "y": [1, 2, 4, 8, 16] } ],
    data: [{
      x: Object.keys(sum),
      y: Object.values(sum)
    }],
    layout: {
      title: "My own plot!!!"
    }
  } );
};
 
 
