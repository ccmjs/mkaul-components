/**
 * @overview unit tests of ccmjs-based web component for parkhaus
 * @author Manfred Kaul
 * @license The MIT License (MIT)
 */

const wait = time => new Promise( resolve => setTimeout( resolve, time ));

ccm.files[ 'tests.js' ] = {

  setup: async suite => {
    suite.compo = await suite.ccm.component( '../parkhaus/versions/ccm.parkhaus-11.0.0.js' );
    suite.parkhaus = await suite.compo.start(); // {simulation_speed: 1000, simulation_start_date: '2022-01-01T00:00:00'}
  },

  ccm: {
    tests: {
      componentName: suite => suite.assertSame( 'parkhaus', suite.compo.name ),

      publicPropertiesComponent: suite => suite.assertEquals( ["name","version","ccm","helper","config","Instance","url","index","instances","instance","start"], Object.keys( suite.compo ) ),

      // publicPropertiesInstance: suite => suite.assertEquals( ["start","ccm","component","parent","children","root","id","index","shadow","element","config","name","max","open_from","open_to","delay","simulation","price_factor","client_categories","vehicle_types","space_color","html","images","messages","traffic_light","parking_space","car","hash","SALT","format","chart","css","simulation_speed","simulation_start_date","inner","instanceStartDate","cars"], Object.keys( suite.parkhaus ) ),
    }
  },

  parkhaus: {
    tests: {
      "cars": suite => suite.assertEquals( [], suite.parkhaus.cars ),
      "enter": async suite => {
        await suite.parkhaus.element.querySelector('.enter').click();
        suite.assertEquals( 1, suite.parkhaus.element.querySelectorAll('.car').length );
      },
      "leave": async suite => {
        await suite.parkhaus.element.querySelector('.enter').click();
        suite.assertEquals( 1, suite.parkhaus.element.querySelectorAll('.car').length );
        await suite.parkhaus.element.querySelector('.car').onclick();
        suite.assertEquals( 0, suite.parkhaus.element.querySelectorAll('.garage .car').length );
      }
    }
  },

  price: {
    tests: {
      "price1": async suite => {
        await suite.parkhaus.element.querySelector('.enter').click();
        await wait( 1000 );
        await suite.parkhaus.element.querySelector('.car').onclick();
        suite.assertEquals( 10.02, parseFloat( suite.parkhaus.element.querySelector('.price').innerText.substring(3) ), 0.1 );
      },
      "price2": async suite => {
        await suite.parkhaus.element.querySelector('.enter').click();
        await wait( 1234 );
        await suite.parkhaus.element.querySelector('.car').onclick();
        suite.assertEquals( 12.34, parseFloat( suite.parkhaus.element.querySelector('.price').innerText.substring(3) ), 0.5 );
      }
    }
  },

  enter_leave: { // ToDo test same car
    tests: {
      "leave1": async suite => {
        await suite.parkhaus.element.querySelector('.enter').click();
        await wait( 1000 );
        await suite.parkhaus.element.querySelector('.car').onclick();
        suite.assertEquals( 10.02, parseFloat( suite.parkhaus.element.querySelector('.price').innerText.substring(3) ), 0.1 );
      }
    }

  }

};
