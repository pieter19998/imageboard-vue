<template>
    <b-container>
        <b-card :sub-title="comment.comment.username" :title="comment.comment.username" :img-src="comment.comment.image" img-alt="">
            <b-card-text>
                {{comment.comment.text}}
            </b-card-text>
            <b-list-group class="ml-auto" v-if="owner">
                <b-list-group-item>
                    <b-link :to="{ name: 'commentUpdate', params: { id: comment.comment.id } }" class="action">
                        <b-icon-pencil></b-icon-pencil>
                    </b-link>
                    <b-link @click="info($event.target)" class="action" variant="link">
                        <b-icon-trash></b-icon-trash>
                    </b-link>
                </b-list-group-item>
            </b-list-group>
        </b-card>
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
        name: 'Comment',
        props: ['comment'],

        data() {
            return {
                title: "",
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
            ...mapActions(['deleteComment','fetchComments']),
            async info(index, button) {
                this.infoModal.title = this.comment.comment.username;
                this.infoModal.content = `delete comment ? `;
                this.infoModal.name = this.comment.comment.text;
                this.infoModal.id = this.comment.comment.id;
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },
            async remove(id) {
                try {
                    await this.deleteComment(id);
                    await this.fetchComments(this.$route.params.id);
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
            if (this.comment.currentUser.username === this.comment.comment.username) this.owner = true;
        }
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
