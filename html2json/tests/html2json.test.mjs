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