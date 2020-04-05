const config = require('../../../config/config');
import Axios from "axios";

Axios.defaults.headers.common["Content-Type"] = "application/json";

const state = {
    users: [],
    loggedIn: false,
    currentUser: undefined,
    admin: false,
    token: undefined
};

const getters = {
    allUsers: state => state.users,
    authStatus: state => state.loggedIn,
    currentUser: state => state.currentUser,
    admin: state => state.admin,
    token: state => state.token
};

const actions = {
    async fetchToken({commit}, data) {
        const response = await Axios.post(config.userRoutes.login, {username: data.username, password: data.password});
        commit('setToken', response.data)
    },

    async logOut({commit}) {
        commit('logOut')
    },
    async registerUser({commit}, data) {
        const response = await Axios.post(config.userRoutes.fetch, {
            username: data.username,
            email: data.email,
            password: data.password,
            dateOfBirth: data.dateOfBirth,
            gender: data.gender,
            role: "user"
        });
        commit('setToken', response.data);
    },
    async fetchCurrentUser({commit}) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
        const response = await Axios.get(config.userRoutes.fetch);
        // commit('newUser', response.data);
        commit('setCurrentUser', response.data);
    },

    async fetchUserLoggedIn({commit}) {
        const response = !!sessionStorage.getItem('token');
        commit('setloggedIn', response);
    },

    async fetchAdmin({commit}) {
        let admin = false;
        if (state.currentUser.role === 'admin') admin = true;
        commit('setAdmin', admin);
    },

    async deleteUser({commit}) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        await Axios.delete(config.userRoutes.fetch);
        commit('deleteThread');
    },

    async updateUser({commit}, data) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        await Axios.put(config.userRoutes.fetch, {
            username: data.username,
            email: data.email,
            gender: data.gender,
            dateOfBirth: data.dateOfBirth
        });
        commit('setCurrentUser', data);
    }
};

const mutations = {
    setToken: (state, token) => {
        sessionStorage.setItem('token', token.token);
        state.token = token.token;
        state.loggedIn = true;
    },
    newUser: (state, user) => (state.user.push(user)),
    setloggedIn: (state, loggedIn) => {
        state.loggedIn = loggedIn;
        if (loggedIn) state.token = sessionStorage.getItem('token')
    },
    setCurrentUser: (state, user) => (state.currentUser = user),
    setAdmin: (state, admin) => (state.admin = admin),
    logOut: (state) => {
        state.loggedIn = false;
        state.admin = false;
        sessionStorage.removeItem("token")
    },
    deleteUser: (state) => (state.currentUser = undefined),
    // updateUser: (state, upUser) => {
    //     const index = state.threads.findIndex(user => user.id === upUser.id);
    //     if (index !== -1) {
    //         state.threads.splice(index, 1, upUser);
    //     }
};


export default ({
    state,
    mutations,
    actions,
    getters
})
