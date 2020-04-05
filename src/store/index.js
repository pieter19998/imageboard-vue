import Vue from 'vue'
import Vuex from 'vuex'
import boards from './modules/board'
import user from './modules/user'
import thread from './modules/thread'
import reply from './modules/comment'

//load vuex
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    boards,
    user,
    thread,
    reply
  }
})
