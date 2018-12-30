
/**
 * @overview configs of ccm component draw_svg
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "tiny": {
    key: "tiny",

    enabled: [ 'color', 'undo', 'redo' ]

  },
  "small": {
    key: "small",

    enabled: [ 'color', 'undo', 'redo', 'free', 'line', 'rect', 'circle', 'text', 'clear_image' ]

  },
  "medium": {
    key: "medium",

    enabled: [ 'color', 'undo', 'redo', 'free', 'line', 'rect', 'circle', 'text', 'ccm-clock', 'save_image', 'clear_image', 'view_editor', 'view_html', 'view_json', 'view_html2json' ]

  },
  "full": {
    key: "full",

    enabled: [ 'color', 'undo', 'redo', 'free', 'line', 'rect', 'circle', 'text', 'html', 'ccm-clock', 'ccm-content_editor', 'ccm-draw_svg', 'ccm-quiz', 'save_image', 'load_image', 'clear_image', 'embed', 'dms', 'select', 'view_editor', 'view_html', 'view_json', 'view_html2json', 'stop', 'plus' ]

  }
};
