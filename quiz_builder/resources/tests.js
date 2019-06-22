
/**
 * @overview unit tests of ccm component for quiz_builder
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) mkaul2m on 21.06.2019.
 */

ccm.files[ 'tests.js' ] = {
  setup: ( suite, callback ) => {
    suite.ccm.component( '../quiz_builder/ccm.quiz_builder.js', component => {
      suite.component = component;
      callback();
    } );
  },
  fundamental: {
    tests: {
      componentName: suite => {
        suite.component.instance( instance => suite.assertSame( 'quiz_builder', instance.component.name ) );
      }
    }
  },
  tests: {
    oneInput: suite => {
      suite.component.start( {
        inner: suite.ccm.helper.html( {
          tag: 'input',
          type: 'text',
          name: 'foo',
          value: 'bar'
        } ),
        onfinish: ( instance, result ) => suite.assertEquals( { foo: 'bar' }, result )
      }, instance => {
        console.log( instance.element );
        instance.element.querySelector( '#quiz_builder' ).click();
      } );
    }
  }
};
