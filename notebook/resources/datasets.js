
/**
 * @overview datasets for ccm component notebook
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 07.02.2019.
 */

ccm.files[ "datasets.js" ] = {

  "small": {
    "key": "small",
    "inner": [
      {
        "id": "a_1",
        "label": "Label 1",
        "likes": 1,
        "dislikes": 0,
        "content": "Different Content for every label<br>Content of 1"
      },
      {
        "id": "a_2",
        "label": "Label 2",
        "likes": 2,
        "dislikes": 0,
        "content": "Content of 2",
        "inner": [
          {
            "id": "a_2_1",
            "label": "Label 2.1",
            "likes": 0,
            "dislikes": 3,
            "content": "Content of 2.1"
          }
        ]
      }
    ]
  },
  "leitbild_lehre": {
    "key": "leitbild_lehre",
    "inner": [
      {
        "id": "a_1",
        "label": "Gelungene Momente",
        "likes": 0,
        "dislikes": 0,
        "content": "Gelungene Momente"
      },
      {
        "id": "a_2",
        "label": "Qualitäten und Stärken",
        "likes": 0,
        "dislikes": 0,
        "content": "Qualitäten und Stärken",
        "inner": [
          {
            "id": "a_2_1",
            "label": "Gute Voraussetzungen für das Lernen schaffen",
            "likes": 0,
            "dislikes": 0,
            "content": "Gute Voraussetzungen für das Lernen schaffen"
          },
          {
            "id": "a_2_2",
            "label": "Passende Lehrformen einsetzen",
            "likes": 0,
            "dislikes": 0,
            "content": "Passende Lehrformen einsetzen"
          },
          {
            "id": "a_2_3",
            "label": "Positive Einstellung",
            "likes": 0,
            "dislikes": 0,
            "content": "Positive Einstellung"
          },
          {
            "id": "a_2_4",
            "label": "Rolle des Lehrenden",
            "likes": 0,
            "dislikes": 0,
            "content": "Rolle des Lehrenden"
          }
        ]
      }
    ]
  }
};
