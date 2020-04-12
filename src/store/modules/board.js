import Axios from "axios";

Axios.defaults.headers.common["Content-Type"] = "application/json";

const config = require('../../../config/config');

const state = {
    boards: [],
    setUpdateBoard: '',
};

const getters = {
    allBoards: state => state.boards,
    getUpdateBoard: state => state.setUpdateBoard
};

const actions = {

    async fetchBoard({commit}, board) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
        const response = await Axios.get(config.boardRoutes.fetch + '/' + board);
        commit('setUpdateBoard', response.data);
    },

    async fetchBoards({commit}) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
        const response = await Axios.get(config.boardRoutes.fetch);
        commit('setBoards', response.data)
    },
    async createBoard({commit}, data) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
        const response = await Axios.post(config.boardRoutes.post, {name: data.name, description: data.description});
        commit('newBoard', response.data);
    },
    async updateBoard({commit}, data) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
        await Axios.put(config.boardRoutes.post, {
            name: data.name,
            newName: data.newName,
            description: data.description
        });
        commit('updateBoard', data);
    },

    async deleteBoard({commit}, board) {
        Axios.defaults.headers.common["token"] = sessionStorage.getItem("token");
        await Axios.delete(config.boardRoutes.post + "/" + board);
        commit('deleteBoard', board);
    }
};

const mutations = {
    setBoards: (state, boards) => (state.boards = boards),
    setUpdateBoard: (state, board) => (state.setUpdateBoard = board),
    newBoard: (state, board) => (state.boards.push(board)),
    updateBoard: (state, upBoard) => {
        const index = state.boards.findIndex(board => board.name === upBoard.name);
        if (index !== -1) {
            state.boards.splice(index, 1, upBoard);
        }
    },
    deleteBoard: (state, name) =>
        (state.boards = state.boards.filter(board => board.name !== name)),
};

export default ({
    state,
    mutations,
    actions,
    getters
})
