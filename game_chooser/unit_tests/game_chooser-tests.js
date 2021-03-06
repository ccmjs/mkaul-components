/**
 * @overview tests for <i>ccm</i> component for game chooser
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2017
 * @license The MIT License (MIT)
 */

ccm.files[ 'game_chooser-tests.js' ] = {
  setup: function ( suite, callback ) {
    suite.ccm.component( 'https://Manfred Kaul <manfred.kaul@h-brs.de> 2017.github.io/ccm-components/upload/ccm.game_chooser.js', function ( component ) {
      suite.game_chooser = component;
      callback();
    } );
  },
  fundamental: {
    tests: {
      'componentName': function ( suite ) {
        suite.game_chooser.instance( function ( instance ) {
          suite.assertSame( 'game_chooser', instance.component.name );
        } );
      },
      'publicProperties': function ( suite ) {
        suite.game_chooser.instance( function ( instance ) {
          instance.start();
          suite.assertEquals( [ 'start','css','html','language','languages','number_range_max_exponent','number_range_exponent','beep','beepSound','ccm','id','index','component','root','element', 'get_next_number', 'get_list_of_numbers' ], Object.keys( instance ) );
        } );
      }
    }
  },
  configuration: {
    tests: {
      'name_is_game_chooser': function ( suite ) {
        suite.assertSame( 'game_chooser', suite.game_chooser.name );
      },
      'number_is_positive': function ( suite ) {
        suite.game_chooser.start(function (instance) {
          suite.assertTrue( instance.get_next_number() > 0 );
        });
      },
      'number_is_less_than_exponent': function ( suite ) {
        suite.game_chooser.start(function (instance) {
          suite.assertTrue( instance.get_next_number() < Math.pow( 10, instance.number_range_exponent ) );
        });
      },
      'range_is_less_than_max': function ( suite ) {
        suite.game_chooser.start(function (instance) {
          suite.assertTrue( instance.number_range_exponent <= instance.number_range_max_exponent );
        });
      },
      'language_is_valid': function ( suite ) {
        suite.game_chooser.start(function (instance) {
          suite.assertTrue( Object.keys(instance.languages).indexOf( instance.language ) > -1 );
        });
      }
    }
  }
};