/**
 * @overview configurations of highlight
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "java": {
    key: "java",
    clazz: 'java',
    content: `class HelloWorld {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}`
  },

  "plaintext": {
    key: "plaintext",
    clazz: "plaintext",
    content: `This is a normal text.`,
  },

  "html": {
    key: "html",
    clazz: 'html',
    content: `<html><h1>Title</h1><script>alert('XSS')</script></html>`
  }
};