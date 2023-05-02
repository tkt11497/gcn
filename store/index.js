import Vuex from 'vuex'
import axios from 'axios'
import Cookie from 'js-cookie'
import searchPlugin from 'vuex-search';
const createstore = () => {
    return new Vuex.Store({

        state: {
            loadedproduct: [],
            token: null,
            maximum: 99,
            cart: [],
            show: false,
            loadedorder: [],
            currentloginname: '',
            errormsg:null,
            title:''

        },



    })
}
export default createstore