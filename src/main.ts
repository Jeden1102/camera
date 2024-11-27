import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import Camera from "simple-vue-camera";

import App from "./App.vue";
import router from "./router";
import "./index.css";

const app = createApp(App).component("camera", Camera);

app.use(createPinia());
app.use(router);

app.mount("#app");
