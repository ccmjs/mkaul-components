/**
 * @overview configurations of highlight
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "demo": {
    "css": [ "ccm.load", "https://kaul.inf.h-brs.de/data/ccm/highlight/resources/monokai-sublime.min.css" ],
    "content":
`class HelloWorld {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}`
  }

};