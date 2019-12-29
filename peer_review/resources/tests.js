
/**
 * @overview unit tests of ccm component for peer_review
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) Manfred Kaul <manfred.kaul@h-brs.de> 2019 on 22.12.2019.
 */

ccm.files[ 'tests.js' ] = {
  setup: ( suite, callback ) => {
    suite.ccm.component( '../peer_review/ccm.peer_review.js', component => {
      suite.component = component;
      callback();
    } );
  },
  fundamental: {
    tests: {
      componentName: suite => {
        suite.component.instance( instance => suite.assertSame( 'peer_review', instance.component.name ) );
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
        instance.element.querySelector( '#peer_review' ).click();
      } );
    }
  }
};
