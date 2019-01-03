
/**
 * @overview configs of ccm component draw_svg
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2018
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {
  "tiny": {
    key: "tiny",

    enabled: [ 'free', 'color', 'undo', 'redo', "hide_toolbar", "remove_editor" ]

  },
  "small": {
    key: "small",

    enabled: [ 'color', 'undo', 'redo', 'free', 'rect', 'circle', 'text', 'html_page', 'clear_image', "hide_toolbar", "remove_editor", 'ccm-clock', 'ccm-content_editor', 'ccm-draw_svg' ]

  },
  "medium": {
    key: "medium",

    enabled: [ 'color', 'undo', 'redo', 'free', 'line', 'rect', 'circle', 'text', 'ccm-clock', 'save_image', 'clear_image', 'view_editor', 'view_html', 'view_json', 'view_html2json', "hide_toolbar", "remove_editor", 'ccm-clock', 'ccm-content_editor', 'ccm-draw_svg' ]
  },

  "recursive": {
    key: "recursive",

    data: { // initial SVG diagram to be edited
      inner: {
        "tag": "svg",
        "id": "svg",
        "width": "100%",
        "height": "100%",
        "margin": 0,
        "padding": 0,
        "inner": [
          {
            "tag": "foreignobject",
            "x": "235",
            "y": "25",
            "width": "396",
            "height": "64",
            "inner": [
              {
                "tag": "ccm-content_editor",
                "style": "width: 100%; height: 100%; margin: 0px; padding: 0px;",
              }
            ]
          }
        ]
      }
    },

    stopPaintingIntoCCM: true,

    enabled: [ 'color', 'undo', 'redo', 'free', 'ccm-content_editor', 'ccm-draw_svg', 'embed', 'dms', 'select', 'view_editor', 'view_html', 'view_json', 'view_html2json', 'stop', "hide_toolbar", "remove_editor", 'plus' ]

  },

  "full": {
    key: "full",

    enabled: [ 'color', 'undo', 'redo', 'free', 'line', 'rect', 'circle', 'text', 'html', 'html_page', 'ccm-clock', 'ccm-content_editor', 'ccm-draw_svg', 'ccm-quiz', 'save_image', 'load_image', 'clear_image', 'embed', 'dms', 'select', 'view_editor', 'view_html', 'view_json', 'view_html2json', 'stop', "hide_toolbar", "remove_editor", 'plus' ]

  }
};
