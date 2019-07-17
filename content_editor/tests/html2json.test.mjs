/**
 * @overview modular test of sum
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 20.10.18.
 */


import { html2json } from '../resources/html2json.mjs';

describe('H1 text', () => {
  it('should return H1 text JSON', () => {
    chai.expect({inner: [{tag: 'h1', inner: 'Title'}, "Text" ]} )
      .to.deep.equal( html2json('<h1>Title</h1>Text') );
  });
});

describe('H1 p', () => {
  it('should return H1 p JSON', () => {
    chai.expect({inner: [{tag: 'h1', inner: 'Title'}, {tag: 'p', inner: 'Paragraph'}]} )
      .to.deep.equal( html2json('<h1>Title</h1><p>Paragraph</p>') );
  });
});

describe('Nested DIV', () => {
  it('should return nested JSON', () => {
    chai.expect({inner: [{tag: 'h1', inner: 'Title'}, {tag: 'p', inner: 'Paragraph'}]} )
      .to.deep.equal( html2json('<div><h1>Title</h1><p>Paragraph</p></div>') );
  });
});

describe('empty HTML', () => {
  it('should return empty JSON', () => {
    chai.expect( { inner: [] } ).to.deep.equal( html2json('') );
  });
});

describe('H1', () => {
  it('should return H1 JSON', () => {
    chai.expect( { tag: 'h1', inner: 'Title' } ).to.deep.equal( html2json('<h1>Title</h1>') );
  });
});

describe('Deep Nested DIV', () => {
  it('should return deep nested JSON', () => {
    chai.expect({
      "inner": [
        {
          "inner": [
            {
              "tag": "h1",
              "inner": "Title"
            },
            "Text1"
          ]
        },
        {
          "tag": "p",
          "inner": "Paragraph"
        },
        "\"Text2\""
      ]
    } )
      .to.deep.equal( html2json('<div><div><h1>Title</h1>Text1</div><p>Paragraph</p>"Text2"</div>') );
  });
});

describe('Deep Nested DIV with ccm-tag', () => {
  it('should return deep nested JSON with ccm', () => {
    chai.expect( {
      "inner": [
        {
          "tag": "h1",
          "inner": "Recursive Editor Nesting"
        },
        "Demo Text",
        {
          "tag": "ccm-editor"
        }
      ]
    } )
      .to.deep.equal( html2json('<h1>Recursive Editor Nesting</h1>Demo Text<ccm-editor></ccm-editor>') );
  });
});

describe('Leerzeile', () => {
  it('should return deep nested JSON with empty lines', () => {
    chai.expect( {
      "inner": [
        {
          "tag": "h1",
          "inner": "Leerzeile"
        },
        {
          "tag": "p"
        },
        {
          "tag": "p",
          "inner": "Zeile 1"
        },
        {
          "tag": "p"
        },
        {
          "tag": "p",
          "inner": "Zeile2"
        }
      ]
    } )
      .to.deep.equal( html2json( `<h1>Leerzeile</h1><p>
</p>

<p>Zeile 1</p><p>

</p> 
<p>Zeile2</p>` ) );
  });
});


describe('Level 3 Nested Tags', () => {
  it('should return deep nested JSON', () => {
    chai.expect({
        "inner": [
          {
            "tag": "h1",
            "inner": [
              "A",
              {
                "tag": "span",
                "inner": "B"
              }
            ]
          },
          "C",
          {
            "tag": "p",
            "inner": "D"
          }
        ]
      }
    ).to.deep.equal( html2json('<div><h1>A<span>B</span></h1>C<p>D</p></div>') );
  });
});



describe('Simple Table', () => {
  it('should return deep nested JSON', () => {
    chai.expect({
        "tag": "table",
        "border": "1",
        "inner": [
          {
            "tag": "tbody",
            "inner": [
              {
                "tag": "tr",
                "inner": [
                  {
                    "tag": "th",
                    "inner": "Titel"
                  },
                  {
                    "tag": "th",
                    "inner": "Detaillierte Beschreibung"
                  }
                ]
              }
            ]
          }
        ]
      } ).to.deep.equal( html2json("<table border=\"1\"><tbody><tr><th>Titel</th><th>Detaillierte Beschreibung</th></tr></tbody></table>") );
  });
});



describe('Complex Table', () => {
  it('should return deep nested JSON', () => {
    chai.expect({
      "tag": "table",
      "border": "1",
      "inner": [
        {
          "tag": "tr",
          "style": "box-sizing: border-box;",
          "inner": [
            {
              "tag": "td",
              "style": "box-sizing: border-box; padding: 0px;",
              "inner": "Standardschritte"
            },
            {
              "tag": "td",
              "style": "box-sizing: border-box; padding: 0px;",
              "inner": [
                "1.",
                {
                  "tag": "br",
                  "style": "box-sizing: border-box;",
                  "inner": [
                    "2. xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx",
                    {
                      "tag": "br",
                      "style": "box-sizing: border-box;",
                      "inner": [
                        "3.",
                        {
                          "tag": "br",
                          "style": "box-sizing: border-box;"
                        }
                      ]
                    },
                    {
                      "tag": "tr",
                      "style": "box-sizing: border-box;",
                      "inner": [
                        {
                          "tag": "td",
                          "style": "box-sizing: border-box; padding: 0px;",
                          "inner": "Ausnahmefälle"
                        },
                        {
                          "tag": "td",
                          "style": "box-sizing: border-box; padding: 0px;"
                        }
                      ]
                    },
                    {
                      "tag": "tr",
                      "style": "box-sizing: border-box;",
                      "inner": [
                        {
                          "tag": "td",
                          "style": "box-sizing: border-box; padding: 0px;",
                          "inner": "Nachbedingung"
                        },
                        {
                          "tag": "td",
                          "style": "box-sizing: border-box; padding: 0px;"
                        }
                      ]
                    },
                    {
                      "tag": "tr",
                      "style": "box-sizing: border-box;",
                      "inner": [
                        {
                          "tag": "td",
                          "style": "box-sizing: border-box; padding: 0px;",
                          "inner": "Qualitätsanforderungen"
                        },
                        {
                          "tag": "td",
                          "style": "box-sizing: border-box; padding: 0px;",
                          "inner": "&nbsp;"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "tag": "tbody",
          "style": "box-sizing: border-box;",
          "inner": [
            {
              "tag": "tr",
              "style": "box-sizing: border-box;",
              "inner": [
                {
                  "tag": "th",
                  "width": "20%",
                  "style": "box-sizing: border-box; padding: 0px; text-align: left;",
                  "inner": "Titel"
                },
                {
                  "tag": "th",
                  "style": "box-sizing: border-box; padding: 0px; text-align: left;",
                  "inner": "Detaillierte Beschreibung"
                }
              ]
            },
            {
              "tag": "tr",
              "style": "box-sizing: border-box;",
              "inner": [
                {
                  "tag": "td",
                  "style": "box-sizing: border-box; padding: 0px;",
                  "inner": "Name"
                },
                {
                  "tag": "td",
                  "style": "box-sizing: border-box; padding: 0px;"
                }
              ]
            },
            {
              "tag": "tr",
              "style": "box-sizing: border-box;",
              "inner": [
                {
                  "tag": "td",
                  "style": "box-sizing: border-box; padding: 0px;",
                  "inner": "Akteure"
                },
                {
                  "tag": "td",
                  "style": "box-sizing: border-box; padding: 0px;"
                }
              ]
            },
            {
              "tag": "tr",
              "style": "box-sizing: border-box;",
              "inner": [
                {
                  "tag": "td",
                  "style": "box-sizing: border-box; padding: 0px;",
                  "inner": "Vorbedingung"
                },
                {
                  "tag": "td",
                  "style": "box-sizing: border-box; padding: 0px;"
                }
              ]
            }
          ]
        }
      ]
    } ).to.deep.equal( html2json("<table border=\"1\" width=\"98%\" style=\"box-sizing: border-box; border-spacing: 0px; border-collapse: collapse; background-color: rgb(245, 245, 245);\"><tbody style=\"box-sizing: border-box;\"><tr style=\"box-sizing: border-box;\"><th width=\"20%\" style=\"box-sizing: border-box; padding: 0px; text-align: left;\">Titel</th><th style=\"box-sizing: border-box; padding: 0px; text-align: left;\">Detaillierte Beschreibung</th></tr><tr style=\"box-sizing: border-box;\"><td style=\"box-sizing: border-box; padding: 0px;\">Name</td><td style=\"box-sizing: border-box; padding: 0px;\"></td></tr><tr style=\"box-sizing: border-box;\"><td style=\"box-sizing: border-box; padding: 0px;\">Akteure</td><td style=\"box-sizing: border-box; padding: 0px;\"></td></tr><tr style=\"box-sizing: border-box;\"><td style=\"box-sizing: border-box; padding: 0px;\">Vorbedingung</td><td style=\"box-sizing: border-box; padding: 0px;\"></td></tr><tr style=\"box-sizing: border-box;\"><td style=\"box-sizing: border-box; padding: 0px;\">Standardschritte</td><td style=\"box-sizing: border-box; padding: 0px;\">1.<br style=\"box-sizing: border-box;\">2. xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx&nbsp;xxxxxxxxx<br style=\"box-sizing: border-box;\">3.<br style=\"box-sizing: border-box;\"></td></tr><tr style=\"box-sizing: border-box;\"><td style=\"box-sizing: border-box; padding: 0px;\">Ausnahmefälle</td><td style=\"box-sizing: border-box; padding: 0px;\"></td></tr><tr style=\"box-sizing: border-box;\"><td style=\"box-sizing: border-box; padding: 0px;\">Nachbedingung</td><td style=\"box-sizing: border-box; padding: 0px;\"></td></tr><tr style=\"box-sizing: border-box;\"><td style=\"box-sizing: border-box; padding: 0px;\">Qualitätsanforderungen</td><td style=\"box-sizing: border-box; padding: 0px;\">&nbsp;</td></tr></tbody></table>") );
  });
});