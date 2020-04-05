import Axios from "axios";

Axios.defaults.headers.common["Content-Type"] = "application/json";
const config = require('../../../config/config');

const state = {
    comments: [],
    setUpdateComment: '',
};

const getters = {
    allComments: state => state.comments,
    getUpdateComment: state => state.setUpdateComment,
    getCommentByThread(state) {
        return thread => state.comments.filter(item => {
            return item.id === thread
        });
    }
};

const actions = {

    async fetchComment({commit}, id) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
        const response = await Axios.get(config.commentRoutes.fetch + '/' + id);
        commit('setUpdateComment', response.data);
    },

    async fetchComments({commit}, thread) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        const response = await Axios.get(config.commentRoutes.thread + '/' + thread);
        commit('setComment', response.data)
    },

    async createComment({commit}, data) {
        await console.log(data)
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        const response = await Axios.post(config.commentRoutes.post + '/' + data.id, {
            text: data.text,
            image: data.image,
        });
        commit('newComment', response.data);
    },

    async updateComment({commit}, data) {
        console.log(data);
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        await Axios.put(config.commentRoutes.fetch + '/' + data.id, {
            text: data.text,
            image: data.image
        });
        commit('updateComment', data);
    },

    async deleteComment({commit}, id) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem('token');
        await Axios.delete(config.commentRoutes.fetch + "/" + id);
        commit('deleteComment', id);
    }
};

const mutations = {
    setComment: (state, comment) => (state.comments = comment),
    setUpdateComment: (state, comment) => (state.setUpdateComment = comment),
    newComment: (state, comment) => (state.comments.push(comment)),
    updateComment: (state, upComment) => {
        const index = state.comments.findIndex(comment => comment.id === upComment.id);
        if (index !== -1) {
            state.boards.splice(index, 1, upComment);
        }
    },
    deleteComment: (state, id) =>
        (state.comments = state.comments.filter(comment => comment.id !== id)),
};

export default ({
    state,
    mutations,
    actions,
    getters
})
