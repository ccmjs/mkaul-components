
/**
 * @overview unit tests of ccm component for atom_adapter
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2019
 * @license The MIT License (MIT) mkaul2m on 19.07.2019.
 */

ccm.files[ 'tests.js' ] = {
  setup: ( suite, callback ) => {
    suite.ccm.component( '../atom_adapter/ccm.atom_adapter.js', component => {
      suite.component = component;
      callback();
    } );
  },
  fundamental: {
    tests: {
      componentName: suite => {
        suite.component.instance( instance => suite.assertSame( 'atom_adapter', instance.component.name ) );
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
        instance.element.querySelector( '#atom_adapter' ).click();
      } );
    }
  }
};
