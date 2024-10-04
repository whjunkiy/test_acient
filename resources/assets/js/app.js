require('./common/params');
require('./orders/main');
require('./leads/main');
require('./common/sorting_table');
require('./segments/header');
//LABS ORDERS
require('./labs-orders/interface');
require('./labs-orders/create_order');

import {createApp} from 'vue/dist/vue.esm-bundler';
import Common from "./vue/apps/Common.vue";
import store from './vue/store'

const app = createApp({
    components: {
        'common': Common,
    }
});

if (document.querySelector('#app'))
    app.use(store).mount('#app');