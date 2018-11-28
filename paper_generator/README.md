# Summary
Paper Generator for simple surveys (opinion polls) with time measurement

# Description
Surveys (opinion polls) usually collect answers only. This single page application (SPA) additionally collects timer data. Thereby you can analyze, how long a user hesitates or how much time is needed to decide which option to take. These additional data can be very helpful to analyze, which decisions are easy and which are complex.

Configure the paper generator with your name, title of the paper, survey questions and the single page application (SPA) is generated for you. You can embed the SPA anywhere in any web page. In the paper, statistics and diagrams are computed automatically from the user data, e.g. [index.html](https://github.com/ccmjs/mkaul-components/blob/master/paper_generator/index.html).

If you want to include additional statistics and plots, use your own scripts via the callbacks `process_this_result` and  `process_all_results`, see e.g. [index_own_plot.html](https://github.com/ccmjs/mkaul-components/blob/master/paper_generator/index_own_plot.html)  and [configs.js](https://github.com/ccmjs/mkaul-components/blob/master/paper_generator/resources/configs.js).

In HTML file as well as in the configs.js you can add your own scripts for calculating and plotting.

# 