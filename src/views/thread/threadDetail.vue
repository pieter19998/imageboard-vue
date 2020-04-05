<template>
    <b-container>
        <br>
        <b-link :to="{ name: 'commentCreate', params: { thread: this.$route.params.id } }" class="btn btn-dark">
            Create Comment
        </b-link>
        <br>
        <b-card :sub-title="this.username" :title="this.title">
            <b-card-text>
                {{this.text}}
            </b-card-text>
        </b-card>
        <div class="row">
            <div class="col-md-4 col-6 my-1" v-bind:key="comment.id" v-for="comment in this.reply">
                <Comment v-bind:comment="{comment , currentUser}"></Comment>
            </div>
        </div>
    </b-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    import Comment from "../../components/Comment";

    export default {
        name: "threadDetail",
        components: {Comment},
        data() {
            return {
                title: '',
                text: '',
                username: '',
                creationDate: '',
                thread: '',
                reply: '',
                showDismissibleAlert: false,
                warning: '',
                variant: '',
            }
        },
        methods: {
            ...mapActions(['fetchComments', 'fetchCurrentUser']),
        },

        computed: mapGetters(['getCommentByThread', 'currentUser']),
        async created() {
            if (sessionStorage.getItem('token')) await this.fetchCurrentUser();

            await this.fetchComments(this.$route.params.id);
            // this.title = this.getCommentByThread(this.$route.params.id).title
            this.thread = this.getCommentByThread(this.$route.params.id);
            this.title = this.thread[0].title;
            this.username = this.thread[0].username;
            this.text = this.thread[0].text;
            this.reply = this.thread[0].reply;
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

    .action {
        color: black;
        text-decoration: none;
    }
</style>
