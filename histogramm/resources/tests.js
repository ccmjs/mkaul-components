
/**
 * @overview unit tests of ccm component for histogramm
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ 'tests.js' ] = {
  setup: ( suite, callback ) => {
    suite.ccm.component( '../histogramm/ccm.histogramm.js', component => {
      suite.component = component;
      callback();
    } );
  },
  fundamental: {
    tests: {
      componentName: suite => {
        suite.component.instance( instance => suite.assertSame( 'histogramm', instance.component.name ) );
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
        instance.element.querySelector( '#histogramm' ).click();
      } );
    }
  }
};
