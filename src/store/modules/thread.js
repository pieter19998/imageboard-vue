import Axios from "axios";

Axios.defaults.headers.common["Content-Type"] = "application/json";
const config = require('../../../config/config');

const state = {
    threads: [],
    setUpdateThread: '',
};

const getters = {
    allThreads: state => state.threads,
    getUpdateThread: state => state.setUpdateThread,
    getThreadByBoard(state) {
        return board => state.threads.filter(item => {
            return item.board === board
        });
    }

};

const actions = {
    async fetchThread({commit}, id) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
        const response = await Axios.get(config.threadRoutes.base + '/' + id);
        commit('setUpdateThread', response.data);
    },

    async fetchThreads({commit}, board) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        const response = await Axios.get(config.threadRoutes.fetchAll + '/' + board);
        commit('setThread', response.data)
    },

    async createThread({commit}, data) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        const response = await Axios.post(config.threadRoutes.base + '/' + data.board, {
            title: data.title,
            text: data.text,
            image: data.image
        });
        commit('newThread', response.data);
    },

    async updateThread({commit}, data) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        await Axios.put(config.threadRoutes.base + '/' + data.id, {
            title: data.title,
            text: data.text,
            image: data.image
        });
        commit('updateThread', data);
    },

    async deleteThread({commit}, id) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        await Axios.delete(config.threadRoutes.base + "/" + id);
        commit('deleteThread', id);
    }
};

const mutations = {
    setThread: (state, threads) => (state.threads = threads),
    setUpdateThread: (state, thread) => (state.setUpdateThread = thread),
    newThread: (state, thread) => (state.threads.push(thread)),
    updateThread: (state, upThread) => {
        const index = state.threads.findIndex(thread => thread.id === upThread.id);
        if (index !== -1) {
            state.threads.splice(index, 1, upThread);
        }
    },
    deleteThread: (state, id) => (state.threads = state.threads.filter(thread => thread.name !== id)),
};

export default ({
    state,
    mutations,
    actions,
    getters
})
