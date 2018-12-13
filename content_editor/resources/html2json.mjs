/**
 * @overview description of the component
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 2018-11-29.
 */

import { HTMLParser } from 'https://ccmjs.github.io/mkaul-components/content_editor/resources/htmlparser.mjs';

export function html2json( input ){
  const json_stack = [];
  const unary_list = [];
  const result = [];

  HTMLParser( input , {
    start: function(tag, attrs, unary) {
      const tag_structure = tag.toLowerCase() === 'div' ? {} : { tag: tag };
      attrs.forEach( attr => {
        tag_structure[ attr.name ] = attr.value;
      });
      if ( unary ) unary_list.push( tag_structure );
      json_stack.push( tag_structure );
    },
    end: function(tag) {
      if ( json_stack.length > 1 ){
        const top = json_stack[ json_stack.length-1 ];
        if ( json_stack[ json_stack.length-2 ].inner ){
          json_stack.pop();
          if ( Array.isArray( json_stack[ json_stack.length-1 ].inner ) ){
            json_stack[ json_stack.length-1 ].inner.push( top );
          } else {
            json_stack[ json_stack.length-1 ].inner = [ json_stack[ json_stack.length-1 ].inner, top ];
          }
        } else {
          if (! unary_list.includes( json_stack[ json_stack.length-2 ] ) ){
            json_stack.pop();
            json_stack[ json_stack.length-1 ].inner = [ top ];
          }
        }
      } else {
        result.push( json_stack.pop() );
      }
    },
    chars: function(text) {
      if ( text.trim() ){
        if ( json_stack[ json_stack.length-1 ] ){
          if ( json_stack[ json_stack.length-1 ].inner ){
            if ( Array.isArray( json_stack[ json_stack.length-1 ].inner ) ){
              json_stack[ json_stack.length-1 ].inner.push( text );
            } else {
              json_stack[ json_stack.length-1 ].inner += text;
            }
          } else {
            json_stack[json_stack.length - 1].inner = text;
          }
        } else {
          result.push(  text  );
        }
      }
    },
    comment: function(text) {
      if ( json_stack[ json_stack.length-1 ].comment ){
        json_stack[ json_stack.length-1 ].comment = [ json_stack[ json_stack.length-1 ].comment ];
        json_stack[ json_stack.length-1 ].comment.push( text );
      } else {
        json_stack[ json_stack.length-1 ].comment = text;
      }
    }
  });

  json_stack.forEach( x => result.push( json_stack.pop() ) );

  return result.length === 1 ?
    result[ result.length-1 ] :
    result.reduce((a,b)=>{ a.inner.push(b); return a },{inner:[]});

}


 
 
