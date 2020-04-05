<template>
    <b-container>
        <br>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            {{warning}}
        </b-alert>
        <h1>Update Board: {{name}}</h1>
        <b-row>
            <b-col class="align-middle">
                <b-form @submit.self.prevent="update()">
                    <div>
                        <label>Name</label>
                        <b-input v-model="newName" class="text-center" type="text" required id="name" max="5"
                                 placeholder="name"
                                  aria-describedby="email-help-block"/>
                    </div>
                    <div>
                        <label>description</label>
                        <b-textarea id="description" class="text-center" max-rows="3" rows="3" v-model="description" required
                                    placeholder="description"/>
                    </div>
                    <div>
                        <br>
                        <input type="submit" value="Board Update" class="btn btn-primary"/>
                    </div>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'boardUpdate',
        data() {
            return {
                showDismissibleAlert: false,
                name: this.$route.params.id,
                description: '',
                newName: '',
                warning: '',
            }
        },
        methods: {
            ...mapActions(['fetchBoard', 'updateBoard','fetch','fetchAdmin']),
            async update() {
                try {
                    await this.updateBoard({id: this.getUpdateBoard.id, name: this.name, newName: this.newName, description: this.description, creationDate: this.getUpdateBoard.creationDate, author: this.getUpdateBoard.author});

                    await this.$router.push('/board')
                } catch (e) {
                    this.warning = e.response.data.error;
                    this.showDismissibleAlert = true;
                }
            },
            async loadFormData() {
                try {
                    await this.fetchBoard(this.name);
                    this.newName = this.getUpdateBoard.name
                    this.description = this.getUpdateBoard.description
                } catch (e) {
                    this.warning = "Board " + this.name + " does not exist";
                    this.showDismissibleAlert = true;
                }
            }
        },
        async created() {
            await this.fetchAdmin();

            if (sessionStorage.getItem('token') === null || !this.admin) {
                await this.$router.push('/')
            }
            this.loadFormData()
        },
        computed: mapGetters(['getUpdateBoard','authStatus','admin']),
    }
</script>

<style scoped>

</style>
