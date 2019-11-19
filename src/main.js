import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import Form from "./components/Form";
import List from "./components/List";
import vueNumeralFilterInstaller from "vue-numeral-filter";
import Details from "./components/Details";
import Advance from "./components/AdvancedSearch";

Vue.use(vueNumeralFilterInstaller);

Vue.use(VueRouter);

Vue.config.productionTip = false;

const routes = [
  { name: "list", path: "/", component: List },
  { name: "sell", path: "/add", component: Form },
  { path: "/details/:id", component: Details },
  { name: "advance", path: "/advance", component: Advance }
];
const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount("#app");
