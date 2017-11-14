
/**
 * @overview unit tests of ccm component for digital_clock
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ 'tests.js' ] = {
  setup: ( suite, callback ) => {
    suite.ccm.component( '../digital_clock/ccm.digital_clock.js', component => {
      suite.component = component;
      callback();
    } );
  },
  fundamental: {
    tests: {
      componentName: suite => {
        suite.component.instance( instance => suite.assertSame( 'digital_clock', instance.component.name ) );
      }
    }
  },
  tests: {
    oneInput: suite => {
      suite.component.start( {
        onfinish: ( instance ) => suite.assertEquals( instance.clock.stunden(), 0 )
      }, instance => {
        console.log( instance.element );
        suite.assertEquals( instance.clock.stunden(), 0 )
      } );
    }
  }
};
