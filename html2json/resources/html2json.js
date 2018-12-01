/**
 * @overview description of the component
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 2018-11-29.
 */

import { HTMLParser } from './htmlparser';

HTMLParser('<h1>Test</h1>', {
      start: function(tag, attrs, unary) {},
      end: function(tag) {},
      chars: function(text) {},
      comment: function(text) {}
  });


 
 
