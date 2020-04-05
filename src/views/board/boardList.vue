<template>
    <b-container>
        <b-alert v-model="showDismissibleAlert" :variant="variant" dismissible>
            {{warning}}
        </b-alert>
        <br>
        <h1>{{title}}</h1>
        <b-table striped :fields="fields" responsive="sm" :sticky-header="true" :no-border-collapse="true"
                 :items="allBoards">
            <template v-slot:cell(actions)="item">
                <b-link class="action" :to="{ name: 'boardView', params: { id: item.item.name } }">
                    <b-icon-eye></b-icon-eye>
                </b-link>
                <b-link class="action" :to="{ name: 'boardUpdate', params: { id: item.item.name } }">
                    <b-icon-pencil></b-icon-pencil>
                </b-link>
                <b-link class="action" variant="link" @click="info(item, $event.target)">
                    <b-icon-trash></b-icon-trash>
                </b-link>
            </template>
        </b-table>
        <!-- Info modal -->
        <b-modal :id="infoModal.id" :title="infoModal.title" @ok="cancel()">
            <pre>{{ infoModal.content }}</pre>
            <template v-slot:modal-footer="{ cancel}">
                <b-button size="sm" variant="outline-secondary" @click="cancel()">
                    Cancel
                </b-button>
                <b-button v-on:click="remove(infoModal.name)" variant="danger">
                    <b-icon-trash></b-icon-trash>
                </b-button>
            </template>
        </b-modal>
    </b-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                title: "boardList",
                showDismissibleAlert: false,
                warning: '',
                variant: '',
                fields: ['name', 'description',
                    {label: 'actions', key: 'actions'}],
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: '',
                    name: null,
                }
            }
        },
        methods: {
            ...mapActions(['fetchBoards','deleteBoard','fetchAdmin']),
            async info(item, index, button) {
                this.infoModal.title = item.item.name;
                this.infoModal.content = `delete board ${item.item.name} ? `;
                this.infoModal.name = item.item.name;
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },

            async remove(name) {
                try {
                    await this.deleteBoard(name);
                    this.warning = "success";
                    this.showDismissibleAlert = true;
                    this.variant = "success"
                }
                catch (e) {
                    this.warning = e.response.data.error;
                    this.showDismissibleAlert = true;
                    this.variant = "danger"
                }
            }
        },
        computed: mapGetters(['allBoards','admin']),
        async created() {
            if (sessionStorage.getItem('token') === null || this.admin === false) {
                await this.$router.push('/')
            }
            else {
                await this.fetchAdmin();
                await this.fetchBoards();
            }
        }
    }
</script>

<style scoped>
    .span {
        color: rgba(255, 255, 255, 0.75);
    }

    .action {
        color: black;
        margin-left: 5px;
        background: none;
        text-decoration: none;
    }

</style>
