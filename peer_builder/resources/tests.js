
/**
 * @overview unit tests of ccm component for peer_builder
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) Manfred Kaul <manfred.kaul@h-brs.de> 2019 on 25.12.2019.
 */

ccm.files[ 'tests.js' ] = {
  setup: ( suite, callback ) => {
    suite.ccm.component( '../peer_builder/ccm.peer_builder.js', component => {
      suite.component = component;
      callback();
    } );
  },
  fundamental: {
    tests: {
      componentName: suite => {
        suite.component.instance( instance => suite.assertSame( 'peer_builder', instance.component.name ) );
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
        instance.element.querySelector( '#peer_builder' ).click();
      } );
    }
  }
};
