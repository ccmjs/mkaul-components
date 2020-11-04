/**
 * @overview ccm component for serviceworker_controller
 * @author Manfred Kaul <manfred.kaul@h-brs.de> 2020
 * @license The MIT License (MIT)
 * @version latest (1.0.0)
 * @changes
 * version 1.0.0 24.09.2020 initial build
 * TODO: unit tests
 * TODO: builder component
 */

( () => {

  const component = {

    /**
     * unique component name
     * @type {string}
     */
    name: "serviceworker_controller",
    version: [1,0,0],

    /**
     * recommended used framework version
     * @type {string}
     */
    ccm: "https://ccmjs.github.io/ccm/versions/ccm-25.5.3.min.js",
    // ccm: "https://ccmjs.github.io/ccm/ccm.js",

    /**
     * default instance configuration
     * @type {object}
     */
    config: {
      namespace: "KAUL-APP-GLOBALS",

      cache_name: "we-app",

      serviceworker_filename: "serviceworker.js",

      push_notification_switch: "push_notifications",
      push_period: "push_period",

      store_metadata: {
        url: "https://ccm2.inf.h-brs.de",
        name: {
          chat: "we_ws20_chat",
          updates: "we_ws20_updates"
        }
      },

      workbox: [ "ccm.load", {
        url: "https://storage.googleapis.com/workbox-cdn/releases/5.1.3/workbox-window.prod.mjs",
        type: "module"
      } ],

      messages: {
        page_reloaded: "Page reloaded",
        new_chat: " neue Chat-Beiträge in WE App",
        new_updates: " neue Updates in WE App",
        cache_deleted: "Cache deleted. Close Tab and reopen page now!",
        serviceworker_registered: "Service Worker registered.",
        serviceworker_unregistered: "Service Worker unregistered.",
        serviceworker_updated: "Service Worker updated.",
        push_notifications_enabled: "Push Notifications enabled",
        push_notifications_disabled: "Push Notifications disabled",
        alert: "This browser does not support push notification",
        thanks: "Thank you for granting WE App notifications.",
      },

      notification_options: {
        body: "Web Engineering",
        icon: "assets/icons/apple-icon-180x180.png",
        vibrate: [50, 50, 100],
        requireInteraction: true,
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        }
      }
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      /**
       * own reference for inner functions
       * @type {Instance}
       */
      const self = this;

      this.wb = null;
      this.timer = null;

      /**************************************************************************************************/
      /**                   start Serviceworker                                                        **/
      /**************************************************************************************************/
      this.register = async ( button ) => {
        // Check that service workers are supported
        if ('serviceWorker' in navigator && self.serviceworker_filename ) {
          this.wb = new self.workbox.Workbox( self.serviceworker_filename );
          // same as navigator.serviceWorker.register('serviceworker.js');
          // see https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox
          await this.wb.register();
          button.nextElementSibling.textContent = self.messages.serviceworker_registered;
        }
      };

      this.unregister = async ( button ) => {
        if ( this.wb ){
          await (await this.wb.getSW()).unregister();
          button.nextElementSibling.textContent = self.messages.serviceworker_unregistered;
        }
      };

      this.update = async ( button ) => {
        if ( this.wb ){
          await this.wb.update();
          button.nextElementSibling.textContent = self.messages.serviceworker_updated;
        }
      }

      this.reload = ( button ) => {
        if ( this.wb ){
          // https://developers.google.com/web/tools/workbox/guides/advanced-recipes
          // Assuming the user accepted the update, set up a listener
          // this will reload the page as soon as the previously waiting
          // service worker has taken control.
          this.wb.addEventListener('controlling', (event) => {
            window.location.reload();
          });

          // Send a message telling the service worker to skip waiting.
          // This will trigger the `controlling` event handler above.
          // Note: for this to work, you have to add a message
          // listener in your service worker. See below.
          this.wb.messageSW({type: 'SKIP_WAITING'});

          button.nextElementSibling.textContent = self.messages.page_reloaded;
        }
      }

      this.disablePushNotifications = () => {
        clearInterval( this.timer );
      };

      this.clearCache = async ( button ) => {
        if ( this.wb ){
          if ( window.caches ) await window.caches.delete( self.cache_name );
          // same name as in serviceworker.js !!!
          await this.wb.update();
          button.nextElementSibling.textContent = self.messages.cache_deleted;
        }
      };



      /**
       * called when instance is ready and window[ self.namespace ] is already installed.
       * (window[ self.namespace ] is installed in the init phase of global settings.)
       */
      this.ready = async () => {
        const GLOBALS = window[ self.namespace ];

        const startNotifying = ( button ) => {
          this.timer = setInterval(this.appNotification,
            60 * 1000 * GLOBALS.getNumber('push_period', 5));
          if ( button ) button.parentElement.setAttribute('label', self.messages.push_notifications_enabled );
        };

        this.enablePushNotifications = ( button ) => {
          if ( button.checked ) {

            GLOBALS.setGlobal( self.push_notification_switch, true );

            // https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission
            // Let's check if the browser supports notifications
            if (!("Notification" in window)) {
              alert( self.messages.alert );
            } else if (Notification.permission === "granted") {
              // Let's check whether notification permissions have already been granted
              // If it's okay let's create a notification
              startNotifying( button );
            } else if ( [ "denied","blocked" ].includes( Notification.permission ) ) {
              // At last, if the user has denied notifications, and you
              // want to be respectful there is no need to bother them any more.
            } else { // Otherwise, we need to ask the user for permission
              Notification.requestPermission(( permission) => {
                // If the user accepts, let's create a notification
                if (permission === "granted") {
                  new Notification( self.messages.thanks );
                  startNotifying( button );
                }
              });
            }

         } else {
            GLOBALS.setGlobal(self.push_notification_switch, false);
            this.disablePushNotifications();
            button.parentElement.setAttribute('label', self.messages.push_notifications_disabled );
          }

        };

        this.checkCounter = async ( key, name ) => {
          const oldChatCount = GLOBALS.getNumber( key, 0 );
          const store = await ccm.store({ url: self.store_metadata.url, name });
          const newChatCount = await store.count();
          if ( newChatCount > oldChatCount ){
            GLOBALS.setGlobal( key, newChatCount );
            return newChatCount;
          }
          return false;
        };

        this.hasNewChatContributions = async () => {
          return await this.checkCounter( self.store_metadata.name.chat, self.store_metadata.name.chat );
        };

        this.hasUpdates = async () => {
          return await this.checkCounter( self.store_metadata.name.updates, self.store_metadata.name.updates );
        };

        this.getNotificationOptions = ( params ) => {
          const options = Object.assign( {}, self.notification_options );
          if ( options.data ){
            Object.assign( options.data, params );
          }
          return options;
        };

        this.appNotification = async () => {

          const newChatContributions = await this.hasNewChatContributions();
          if ( newChatContributions ){
            new Notification( newChatContributions + self.messages.new_chat, this.getNotificationOptions( { primaryKey: newChatContributions } ) );
          }

          const newUpdates = await this.hasUpdates();
          if ( newUpdates ){
            new Notification( newUpdates + self.messages.new_updates, this.getNotificationOptions( { primaryKey: newUpdates } ) );
          }
        }

        this.changePushPeriod = ( input ) => {
          GLOBALS.setGlobal( self.push_period, input.value );
        };

        /**
         * start the checking if preset in global settings
         */
        if ( GLOBALS.getGlobal( self.push_notification_switch ) ){
          if ( Notification.permission === "granted" ) {
            startNotifying();
          }
        }
      }

      /**
       * starts the instance
       */
      this.start = async () => {};


    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
