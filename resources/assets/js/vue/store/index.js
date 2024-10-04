import {createStore} from 'vuex'

import Common from './modules/common/index'
export default createStore({
    modules: {
        Common,
    }
});
