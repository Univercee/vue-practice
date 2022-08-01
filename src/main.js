import { createApp } from "vue";
import router from './router'
import App from "./App.vue";
import UIComponents from "./components/UI";

const app = createApp(App);
UIComponents.forEach((component) => {
  app.component(component.name, component);
});
app.use(router)
app.mount("#app");
