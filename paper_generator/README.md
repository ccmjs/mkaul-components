# 1. Summary
Paper Generator for simple surveys (opinion polls) with time measurement

# 2. Description
Surveys (opinion polls) usually collect answers only. This single page application (SPA) additionally collects timer data. Thereby you can analyze, how long a user hesitates or how much time is needed to decide which option to take. These additional data can be very helpful to analyze, which decisions are easy and which are complex.

Configure the paper generator with your name, title of the paper, survey questions and the single page application (SPA) is generated for you. You can embed the SPA anywhere in any web page. If you use a cross domain solution, then you have to use absolute URLs. In the paper, statistics and diagrams are computed automatically from the participants input, e.g. [index.html](https://github.com/ccmjs/mkaul-components/blob/master/paper_generator/index.html). The following diagrams are rendered automatically:
* `distribution` distribution of results
* `histogram_categories_absolute` histogram of absolute numbers of the overall categories
* `histogram_categories_relative`  histogram of relative numbers of the overall categories (in percent)
* `histogram_absolute`  histogram of absolute numbers for every question
* `histogram_relative`  histogram of relative numbers for every question
* `delay_cat_sum`  sum of delays in milliseconds per category
* `delay_cat_avg`  average of delays in milliseconds per category
* `delay_cat_max`  maximum of delays in milliseconds per category
* `delay_cat_min`  minimum of delays in milliseconds per category
* `delay_sum`  sum of delays in milliseconds
* `delay_avg`  average of delays in milliseconds
* `delay_max`  maximum of delays in milliseconds
* `delay_min`  minimum of delays in milliseconds

These diagrams are computed from user input and rendered in your text automatically, if you provide a `div` with the corresponding `id`. Otherwise nothing is rendered. These are the preconfigured figures.  

# 3. Add your own statistics and diagrams
If you want to include additional statistics and diagrams, use your own scripts. There are three ways to include your own scripts:
1. In the `configs.js` of `paper_generator` include your own figure in the `figures` array. 
2. Load your statistics and diagrams script from any server you want and calculate the statistics and plot the diagrams yourself.
3. Define your own JavaScript function in a `<script>` tag inside the HTML code, in which you use the paper_generator tag.

The details are described below.

##  3.1 In the `configs.js` of `paper_generator` include your own figure in the `figures` array 

For example:
```json
{
    "id": "histogram_categories_absolute",
    "type": "histogram_categories",
    "title": "Histogramm Kategorien absolut",
    "mapping": "absolute_count"
}
```
with the following semantics:
* The `id` is the `div`-id.
* The *type* is one of the following:
** histogram_categories
** histogram
** delay_categories
** delays
* The *title* is written on top of every diagram
* The *mapping* transforms the input data into statistics data

There are the following pre-defined mappings, to which you can refer by name:
* `absolute_count`
* `relative_count_categories`
* `relative_count_participants`
* `delay_cat_sum`
* `delay_cat_avg`
* `delay_cat_max`
* `delay_cat_min`
* `delay_sum`
* `delay_avg`
* `delay_max`
* `delay_min`
* `debugger`

If you do not know, which mapping to choose, try debugger first. Then script execution will stop at the mapping and you can inspect the input values. 

## 3.2 Load your statistics and diagrams script from any server you want and calculate the statistics and plot the diagrams yourself
If you want your own script to be used as mapping, you can load it as follows:
```javascript
const figure = {
    "id": "histogram_categories_absolute",
    "type": "histogram_categories",
    "title": "Histogramm Kategorien absolut",
    "mapping": [ "ccm.load", {
                  "url": "https://your-server.de/your-javascript-file.js",
                  "type": "module",
                  "import": "my_own_mapping"
                } ]
}
```
Your own script is structured as follows (ES6):
```javascript
export const my_own_mapping = arg => arg.count;
```
or as follows (ES5):
```javascript
export function my_own_mapping( arg ){ return arg.count }
```

## 3.3 Define your own JavaScript function in a `<script>` tag inside the HTML code, in which you use the paper_generator tag
Add your own statistics and diagrams via the callbacks `process_this_result` and  `process_all_results`, see e.g. [index_own_plot.html](https://github.com/ccmjs/mkaul-components/blob/master/paper_generator/index_own_plot.html)  and [configs.js](https://github.com/ccmjs/mkaul-components/blob/master/paper_generator/resources/configs.js).

In your HTML you write:
```html
<ccm-paper_generator 
    key='[ "ccm.get", "resources/configs.js", "my-config" ]' 
    process_all_results="my_plots">
    ... Your text here ... 
    <div id="my_own_plot">the place for your own diagram</div>
    ... Your text here ... 
</ccm-paper_generator>
```
Inside a `<script>` tag on the same HTML page you define your own function `my_plot`. For example:
```html
<script>
    function my_plots( args ){
      console.log( "my_plots" );
      const { dataset, self } = args;
      const sum={}; // sum of categories
      dataset.forEach(r=>{r.categories.forEach(c=>{if(!sum[c])sum[c]=0;sum[c]+=1})});
      delete sum[0];
      self.plotter.start( {
        root: self.div('my_own_plot'),
        data: [{
          x: Object.keys(sum),
          y: Object.values(sum),
          name: "sum",
          type: "bar"
        },
        {
            x: Object.keys(sum),
            y: Object.values(sum).map(s=>2*s),
            name: "double_sum",
            type: "bar"
        }],
        layout: {
          title: "My own plot!!!",
          barmode: "stack"
        }
      } );
    }
</script>
```





   
 
 

In HTML file as well as in the configs.js you can add your own scripts for calculating and plotting.
