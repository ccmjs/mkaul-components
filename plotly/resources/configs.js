
/**
 * @overview configs of ccm component plotly
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  // https://plot.ly/javascript/line-charts/#basic-line-plot
  "line_graph": {

    key: "line_graph",

    html: {
      main: {
        style: "width:700px;height:450px;"
      }
    },

    data:
      [
        {
          x: [1, 2, 3, 4, 5],
          y: [1, 2, 4, 8, 16]
        }
      ],

    layout: {
      margin: { t: 0 }
    },

    plot_config: {

    }
  },

  // https://plot.ly/javascript/bar-charts/#basic-bar-chart
  "bar_chart": {
    key: "bar_chart",
    data: [
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [20, 14, 23],
        type: 'bar'
      }
    ]
  },

  // https://plot.ly/javascript/bar-charts/#grouped-bar-chart
  "grouped_bar_chart": {
    key: "grouped_bar_chart",
    data: [
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [20, 14, 23],
        name: 'SF Zoo',
        type: 'bar'
      },
      {
        x: ['giraffes', 'orangutans', 'monkeys'],
        y: [12, 18, 29],
        name: 'LA Zoo',
        type: 'bar'
      }
    ],
    layout: {barmode: 'group'}
  },

  // https://plot.ly/javascript/bar-charts/#stacked-bar-chart
  "stacked_bar_chart": {
    key: "stacked_bar_chart",
    data: [{
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [20, 14, 23],
      name: 'SF Zoo',
      type: 'bar'
    }, {
      x: ['giraffes', 'orangutans', 'monkeys'],
      y: [12, 18, 29],
      name: 'LA Zoo',
      type: 'bar'
    }],

    layout: {barmode: 'stack'}
  },

  // https://plot.ly/javascript/pie-charts/#basic-pie-chart
  "pie_chart": {
    key: "pie_chart",
    data: [{
      values: [19, 26, 55],
      labels: ['Residential', 'Non-Residential', 'Utility'],
      type: 'pie'
    }],

    layout: {
      height: 400,
      width: 500
    }
  },

  // https://plot.ly/javascript/pie-charts/#donut-chart
  "donut_chart": {
    key: "donut_chart",

    data: [{
      values: [16, 15, 12, 6, 5, 4, 42],
      labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
      domain: {column: 0},
      name: 'GHG Emissions',
      hoverinfo: 'label+percent+name',
      hole: .4,
      type: 'pie'
    },{
      values: [27, 11, 25, 8, 1, 3, 25],
      labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World' ],
      text: 'CO2',
      textposition: 'inside',
      domain: {column: 1},
      name: 'CO2 Emissions',
      hoverinfo: 'label+percent+name',
      hole: .4,
      type: 'pie'
    }],

    layout: {
      title: 'Global Emissions 1990-2011',
      annotations: [
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'GHG',
          x: 0.17,
          y: 0.5
        },
        {
          font: {
            size: 20
          },
          showarrow: false,
          text: 'CO2',
          x: 0.82,
          y: 0.5
        }
      ],
      height: 400,
      width: 600,
      showlegend: false,
      grid: {rows: 1, columns: 2}
    }
  },

  // https://plot.ly/javascript/filled-area-plots/#basic-overlaid-area-chart

  "area_chart": {
    key: "area_chart",

    data: [{
      x: [1, 2, 3, 4],
      y: [0, 2, 3, 5],
      fill: 'tozeroy',
      type: 'scatter'
    }, {
      x: [1, 2, 3, 4],
      y: [3, 5, 1, 7],
      fill: 'tonexty',
      type: 'scatter'
    }]

  }

};
