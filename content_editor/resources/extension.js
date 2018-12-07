/**
 * @overview content editor extensions
 * @version 0.0.1
 * @author mkaul2m Manfred.Kaul@h-brs.de
 * @copyright The MIT License (MIT) mkaul2m on 2018-12-06.
 */

export const my_special_listener = (e) => {

  alert('Hello World');

  // https://developers.google.com/web/updates/2018/03/clipboardapi

  // navigator.clipboard.readText()
  //   .then(text => {
  //     // insert text manually
  //     document.execCommand("insertHTML", false, text);
  //   })
  //   .catch(err => {
  //     console.error('Failed to read clipboard contents: ', err);
  //   });
};
 
 
