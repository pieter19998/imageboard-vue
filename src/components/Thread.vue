<template>
    <b-container>
        <b-card
                :title="thread.thread.title"
                :img-src="thread.thread.image"
                img-alt=""
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
        >
            <b-card-sub-title class="mb-2">{{thread.thread.username}}</b-card-sub-title>
            <b-card-body>
                <b-card-text>
                    {{thread.thread.text}}
                </b-card-text>
                <b-card-sub-title class="mb-2">{{thread.thread.creationDate}}</b-card-sub-title>
<!--                <b-button v-on:click="threadDetail" variant="primary">Open Thread</b-button>-->
                <b-link class="btn btn-primary" :to="{ name: 'commentView', params: { thread: thread.thread.text,id: thread.thread.id } }">
                    Open Thread
                </b-link>
            </b-card-body>
            <b-list-group v-if="owner" class="ml-auto">
                <b-list-group-item>
                    <b-link class="action" :to="{ name: 'threadView', params: { id: thread.thread.id } }">
                        <b-icon-eye></b-icon-eye>
                    </b-link>
                    <b-link class="action" :to="{ name: 'threadUpdate', params: { id: thread.thread.id } }">
                        <b-icon-pencil></b-icon-pencil>
                    </b-link>
                    <b-link class="action" variant="link" @click="info($event.target)">
                        <b-icon-trash></b-icon-trash>
                    </b-link>
                </b-list-group-item>
            </b-list-group>
        </b-card>
        <!-- Info modal -->
        <b-modal :id="infoModal.id" :title="infoModal.title" @ok="cancel()">
            <pre>{{ infoModal.content }}</pre>
            <template v-slot:modal-footer="{ cancel}">
                <b-button size="sm" variant="outline-secondary" @click="cancel()">
                    Cancel
                </b-button>
                <b-button v-on:click="remove(infoModal.id)" variant="danger">
                    <b-icon-trash></b-icon-trash>
                </b-button>
            </template>
        </b-modal>
    </b-container>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "thread",
        props: ["thread"],
        data() {
            return {
                title: "boardList",
                showDismissibleAlert: false,
                warning: '',
                variant: '',
                owner: false,
                infoModal: {
                    id: '',
                    title: '',
                    content: '',
                    name: null,
                }
            }
        },
        methods: {
            ...mapActions(['fetchThread','fetchThreads', 'deleteThread']),
            async info(index, button) {
                this.infoModal.title = this.thread.thread.title;
                this.infoModal.content = `delete thread ${this.thread.thread.title} ? `;
                this.infoModal.name = this.infoModal.text;
                this.infoModal.id = this.thread.thread.id;
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },
            async threadDetail() {
                await this.$router.push('/thread/' + this.thread.id)
            },
            async remove(id) {
                try {
                    await this.deleteThread(id);
                    await this.fetchThreads(this.$route.params.id);
                    this.warning = "success";
                    this.showDismissibleAlert = true;
                    this.variant = "success"
                } catch (e) {
                    this.warning = e.response.data.error;
                    this.showDismissibleAlert = true;
                    this.variant = "danger"
                }
            }
        },
        beforeMount() {
          if (this.thread.currentUser.username === this.thread.thread.username) this.owner = true;
        },
    }
</script>

<style scoped>
    .action {
        color: black;
        margin-left: 5px;
        background: none;
        text-decoration: none;
    }
</style>
