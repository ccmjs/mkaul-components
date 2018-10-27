/**
 * @overview configurations of highlight
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "demo": {
    key: "demo",
    clazz: 'java',

    css: [ "ccm.load", "https://kaul.inf.h-brs.de/data/ccm/highlight/resources/monokai-sublime.min.css" ],

    data: {
      content: `class HelloWorld {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}`
    }

  },

  "full_configuration": {
    key: "full_configuration",
    css: ["ccm.load", "https://kaul.inf.h-brs.de/data/ccm/highlight/resources/monokai-sublime.min.css"],
    //  class: 'java',
    languages: ['java', 'php', 'html', 'css', 'javascript'],
    data: {
      content:
        `class HelloWorld {
    public static void main(String[] args){
        System.out.println("Hello World");
    }
}`
    }
  }

};