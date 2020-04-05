<template>
    <b-container class="bv-example-row">
        <h1>Home</h1>
        <b-table :fields="fields" :items="allBoards" :no-border-collapse="true" :sticky-header="true" responsive="sm"
                 striped>
            <template v-slot:cell(link)="item">
                <b-link :to="{ name: 'boardView', params: { id: item.item.name } }" class="action">
                    <b-icon-eye></b-icon-eye>
                </b-link>
            </template>
        </b-table>
    </b-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: "board",
        data() {
            return {
                fields: ['name', 'description', {label: 'link', key: 'link'}]
            }
        },
        methods: {
            ...mapActions(['fetchBoards'])
        },
        computed: mapGetters(['allBoards', 'authStatus']),
        created() {
            this.fetchBoards();
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
