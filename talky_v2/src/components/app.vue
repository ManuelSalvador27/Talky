<template>
  <f7-app :params="f7params">
    <!-- Status bar overlay for fullscreen mode-->
    <f7-statusbar></f7-statusbar>

    <!-- Left panel with cover effect-->
    <f7-panel left cover theme-dark>
      <f7-view>
        <f7-page>
          <div class="wrapper">
            <img class="image--cover" :src="photo_url" alt />
          </div>
          <f7-block style="text-align:center;">{{display_name}}s</f7-block>

          <f7-list>
            <f7-list-item link="/signin/" view=".view-main" panel-close title="Sign in"></f7-list-item>
            <f7-list-item @click="signOut" view=".view-main" panel-close title="Sign out"></f7-list-item>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-panel>

    <!-- Views/Tabs container -->
    <f7-views tabs class="safe-areas" v-if="signed_in">
      <!-- Tabbar for switching views-tabs -->
      <f7-toolbar tabbar labels bottom v-show="show_tabbar">
        <f7-link
          tab-link="#view-home"
          tab-link-active
          icon-ios="f7:home_fil"
          icon-aurora="f7:home_fil"
          icon-md="material:home"
          text="Home"
        ></f7-link>
        <f7-link
          tab-link="#view-chatgroups"
          icon-ios="f7:persons_round_fill"
          icon-aurora="f7:persons_round_fill"
          icon-md="material:group"
          text="Groups"
        ></f7-link>
        <f7-link
          tab-link="#view-settings"
          icon-ios="f7:settings_fill"
          icon-aurora="f7:settings_fill"
          icon-md="material:settings"
          text="Edit Profile"
        ></f7-link>
      </f7-toolbar>

      <!-- Your main view/tab, should have "view-main" class. It also has "tab-active" class -->
      <f7-view id="view-home" main tab tab-active url="/"></f7-view>

      <!-- Catalog View -->
      <f7-view id="view-chatgroups" name="chatgroups" tab url="/chatgroups/"></f7-view>

      <!-- Settings View -->
      <f7-view id="view-settings" name="editprofile" tab url="/editprofile/"></f7-view>
    </f7-views>
    <f7-view v-if="!signed_in" url="/signin/" :main="true"></f7-view>

    <!-- Popup -->
    <f7-popup id="my-popup">
      <f7-view>
        <f7-page>
          <f7-navbar title="Popup">
            <f7-nav-right>
              <f7-link popup-close>Close</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <f7-block>
            <p>Popup content goes here.</p>
          </f7-block>
        </f7-page>
      </f7-view>
    </f7-popup>

    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen>
          <f7-login-screen-title>Login</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="text"
              name="username"
              placeholder="Your username"
              :value="username"
              @input="username = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="password"
              name="password"
              placeholder="Your password"
              :value="password"
              @input="password = $event.target.value"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-list-button title="Sign In" login-screen-close @click="alertLoginData"></f7-list-button>
            <f7-block-footer>
              Some text about login information.
              <br />Click "Sign In" to close Login Screen
            </f7-block-footer>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>

<script>
import firebase from "firebase";
import cordovaApp from "../js/cordova-app.js";
import routes from "../js/routes.js";
var firebaseConfig = {
    apiKey: "AIzaSyBTPIwh0VxrQ8tWvujqtSitXKP2_dqg870",
    authDomain: "talky-3da8d.firebaseapp.com",
    projectId: "talky-3da8d",
    storageBucket: "gs://talky-3da8d.appspot.com",
    messagingSenderId: "200745711387",
    appId: "1:200745711387:web:62a650682031e00d3685be",
    measurementId: "G-BTJRWSG4H7"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
import { mixin } from "../js/mixin";
export default {
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        id: "io.framework7.what", // App bundle ID
        name: "Talky", // App name
        theme: "auto", // Automatic theme detection
        // App root data
        data: function() {
          return {
            user: {
              firstName: "John",
              lastName: "Doe"
            },
            // Demo products for Catalog section
            products: [
              {
                id: "1",
                title: "Apple iPhone 8",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi tempora similique reiciendis, error nesciunt vero, blanditiis pariatur dolor, minima sed sapiente rerum, dolorem corrupti hic modi praesentium unde saepe perspiciatis."
              },
              {
                id: "2",
                title: "Apple iPhone 8 Plus",
                description:
                  "Velit odit autem modi saepe ratione totam minus, aperiam, labore quia provident temporibus quasi est ut aliquid blanditiis beatae suscipit odio vel! Nostrum porro sunt sint eveniet maiores, dolorem itaque!"
              },
              {
                id: "3",
                title: "Apple iPhone X",
                description:
                  "Expedita sequi perferendis quod illum pariatur aliquam, alias laboriosam! Vero blanditiis placeat, mollitia necessitatibus reprehenderit. Labore dolores amet quos, accusamus earum asperiores officiis assumenda optio architecto quia neque, quae eum."
              }
            ]
          };
        },

        // App routes
        routes: routes,

        // Input settings
        input: {
          scrollIntoViewOnFocus: this.$device.cordova && !this.$device.electron,
          scrollIntoViewCentered: this.$device.cordova && !this.$device.electron
        },
        // Cordova Statusbar settings
        statusbar: {
          overlay: (this.$device.cordova && this.$device.ios) || "auto",
          iosOverlaysWebView: true,
          androidOverlaysWebView: false
        }
      },

      // Login screen data
      username: "",
      password: ""
    };
  },
  mixins: [mixin],
  computed: {
    show_tabbar() {
      return this.$store.getters.show_tabbar;
    },
    signed_in() {
      return this.$store.getters.signed_in;
    },
    photo_url() {
      return this.$store.getters.photo_url;
    },
    display_name() {
      return this.$store.getters.display_name;
    }
  },
  methods: {
    alertLoginData() {
      this.$f7.dialog.alert(
        "Username: " + this.username + "<br>Password: " + this.password
      );
    },
    signOut() {
      const app = this.$f7;
      this.$store.dispatch("signOut");
      app.panel.close();
    }
  },
  mounted() {
    this.$f7ready(f7 => {
      // Init cordova APIs (see cordova-app.js)
      if (f7.device.cordova) {
        cordovaApp.init(f7);
      }
      // Call F7 APIs here
    });
  }
};
</script>
<style scoped>
.wrapper {
  text-align: center;
}

.image--cover {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin: 20px;
  object-fit: cover;
  object-position: center;
}
</style>

