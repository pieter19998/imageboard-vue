<template>
    <b-container>
        <br>
        <h1>{{this.$route.params.id}}</h1>
<!--        <b-button v-on:click="createThread()">Create Thread</b-button>-->
        <b-link :to="{ name: 'threadCreate', params: { board: this.$route.params.id } }" class="btn btn-dark">create Thread</b-link>
        <div class="row">
            <div class="col-md-3 col-6 my-1" v-bind:key="thread.id" v-for="thread in this.getThreadByBoard(this.$route.params.id)">
                <Thread v-bind:thread="{thread,currentUser}"></Thread>
            </div>
        </div>
    </b-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import Thread from "../../components/Thread";

    export default {
        name: "boardDetail",
        components: {Thread},
        data() {
            return {
                showDismissibleAlert: false,
                warning: '',
                variant: '',

            }
        },
        methods: {
            ...mapActions(['fetchThreads','fetchCurrentUser']),
            async createThread() {
                await this.$router.push('/thread/create/' + this.$route.params.id);
            },
        },
        computed: mapGetters(['getThreadByBoard','currentUser']),
        async created() {
            if (sessionStorage.getItem('token')) await this.fetchCurrentUser();

            await this.fetchThreads(this.$route.params.id);
        },
        async updated() {
            // await this.fetchThreads(this.$route.params.id);
        }
    }
</script>

<style scoped>
    button {
        margin: 15px;
    }
</style>
