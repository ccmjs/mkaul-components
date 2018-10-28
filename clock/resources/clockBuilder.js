/**
 * @overview description of the component
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 28.10.18.
 */

export function clockBuilder( json ) {
  json.width = json.width + ( json.unit || 'px' );
  delete json.unit;
  return json;
}
 
 
