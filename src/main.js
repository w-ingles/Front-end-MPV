import { createApp } from 'vue'
import App from './App.vue'


import VueAxios from 'vue-axios'
import axios from 'axios'
import router from './router'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Card from 'primevue/card';
import Rating from 'primevue/rating';
import Progressspinner from 'primevue/progressspinner';
import Drawer from 'primevue/drawer';


import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';
import Aura from '@primevue/themes/aura';


const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.use(PrimeVue, {theme: {
        preset: Aura
    }});
app.use(ToastService);
app.component('Button', Button);
app.component('Card', Card);
app.component('Toast', Toast);
app.component('InputText', InputText);
app.component('Rating', Rating);
app.component('Progressspinner', Progressspinner);
app.component('Drawer', Drawer);

app.mount('#app')
