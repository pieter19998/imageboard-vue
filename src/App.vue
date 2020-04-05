<template>
    <div id="app">
        <div>
            <b-navbar toggleable="lg" type="dark" variant="dark">
                <b-navbar-brand href="#">ImageBoard</b-navbar-brand>

                <b-navbar-toggle target="nav-collapse"/>

                <b-collapse id="nav-collapse" is-nav type="dark">
                    <b-nav-item-dropdown id="board" text="Board" v-if="this.admin">
                        <b-dropdown-item id="listBoard" to="/board">Boards</b-dropdown-item>
                        <b-dropdown-item id="createBoard" to="/board/create">BoardsCreate</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-navbar-nav class="">
                        <b-nav-item to="/">Home</b-nav-item>
                        <b-nav-item to="/about">About</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto" v-if="this.authStatus">
                        <b-nav-item to="/user/update/">Profile</b-nav-item>
                        <b-nav-item to="#" v-on:click="bye()">Log out</b-nav-item>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto" v-else>
                        <b-nav-item id="register" to="/register">Register</b-nav-item>
                        <b-nav-item id="login" to="/login">Login</b-nav-item>
                    </b-navbar-nav>

                </b-collapse>
            </b-navbar>
        </div>
        <router-view/>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                username: '',
                loggedIn: this.authStatus
            }
        },
        methods: {
            ...mapActions(['fetchUserLoggedIn', 'fetchCurrentUser', 'fetchAdmin', 'logOut']),
            async bye() {
                // await sessionStorage.removeItem('token');
                await this.logOut();
                await this.$router.push('/');
            },
        },
        computed: mapGetters(['authStatus', 'currentUser', 'admin']),
        // async created() {
        //     await this.fetchUserLoggedIn();
        //     await this.fetchCurrentUser();
        //     await this.fetchAdmin();
        // },
        async updated() {
            await this.fetchUserLoggedIn();
            if (this.authStatus) {
                await this.fetchCurrentUser();
                await this.fetchAdmin();
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .nav-link {
        color: rgba(255, 255, 255, 0.5);
    }

    .nav-link:hover, .nav-link:focus {
        text-decoration: none;
        color: rgba(255, 255, 255, 0.75);
    }
</style>
