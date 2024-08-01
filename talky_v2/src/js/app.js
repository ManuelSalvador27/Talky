// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';
import store from "../pages/store/store";
import firebase from 'firebase';
import lodash from 'lodash'
// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue,lodash);
let newapp = null
firebase.auth().onAuthStateChanged(function(user) {
  console.log('user in app.js',user)
  if(user!=null){
    console.log('check in app.js')
    if ( user.emailVerified) {
      
      store.commit('setSignedIn',true)
      store.commit('setDisplayName',user.displayName)
      store.commit('setPhotoURL',user.photoURL)

    } else {
      // No user is signed in.
      store.commit('setSignedIn',false)
  
    }
  }
  

  if(!newapp){
    newapp = // Init App
    new Vue({
      el: '#app',
      render: (h) => h(App),
      store,
      // Register App Component
      components: {
        app: App
      },
    });
  }

});
