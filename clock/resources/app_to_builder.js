/**
 * @overview helper function for app builder
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 29.10.18.
 */

export function app_to_builder( json ) {
  const old_width = json.width;
  if ( old_width ){
    json.width = parseInt(old_width);
    json.unit = old_width.slice(-2);
  }
  return json;
}
 
 
