
/**
 * @overview datasets for ccm component treecontent
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 29.01.2019.
 */

ccm.files[ 'datasets.js' ] = {

  "void": {
    "key": "void",
  },

  "small": {
    "key": "small",
    "inner": [
      {
        label: 'Label 1',
        likes: 3,
        dislikes: 0
      }
    ]
  },

  "medium": {
    "key": "medium",
    "inner": [
      {
        label: 'Label 1',
        likes: 3,
        dislikes: 0
      },
      {
        label: 'Label 2',
        likes: 3,
        dislikes: 0,
        inner: [
          {
            label: 'Label 2.1',
            likes: 3,
            dislikes: 0
          },
          {
            label: 'Label 2.2',
            likes: 3,
            dislikes: 0,
            inner: [
              {
                label: 'Label 2.2.1',
                likes: 3,
                dislikes: 0
              }
            ]
          }
        ]
      }
    ]
  },

  "leitbild": {
    "key": "leitbild",
    "header": "Leitbild Lehre",
    "inner": [
      {
        label: 'Aktivierende Lehre, aktives Lernen',
        likes: 0,
        dislikes: 0
      },
      {
        label: 'Wissenschaftlichkeit',
        likes: 0,
        dislikes: 0
      },
      {
        label: 'Orientierung Berufswelt 2030',
        likes: 0,
        dislikes: 0
      },
      {
        label: 'Kompetenz- und Zielorientierung',
        likes: 0,
        dislikes: 0
      },
      {
        label: 'Innovation',
        likes: 0,
        dislikes: 0
      },
      {
        label: 'Gemeinsame Verantwortung',
        likes: 0,
        dislikes: 0
      },
      {
        label: 'Individualität',
        likes: 0,
        dislikes: 0
      },
      {
        label: 'Internationalität',
        likes: 0,
        dislikes: 0
      },
      {
        label: 'Gender & Diversity',
        likes: 0,
        dislikes: 0
      }
    ]
  }
};
