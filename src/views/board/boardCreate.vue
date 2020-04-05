<template>
    <b-container>
        <br>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            {{warning}}
        </b-alert>
        <h1>{{page}}</h1>
        <b-row>
            <b-col class="align-middle">
                <b-form @submit.self.prevent="create">
                    <div>
                        <label>Name</label>
                        <b-input v-model="name" class="text-center" type="text" required id="name"
                                 aria-describedby="email-help-block"/>
                    </div>
                    <div>
                        <label>description</label>
                        <b-textarea id="description" class="text-center" max-rows="3" rows="3" v-model="description" required
                                    placeholder="description"/>
                    </div>
                    <div>
                        <br>
                        <input type="submit" value="Create" class="btn btn-primary"/>
                    </div>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        data() {
            return {
                showDismissibleAlert: false,
                name: '',
                description: '',
                warning: '',
                page: 'Create board',
            }
        },
        methods: {
            ...mapActions(['createBoard','fetchAdmin']),
            async create() {
                try {
                    await this.createBoard({name: this.name, description: this.description});
                    await this.$router.push('/board')

                } catch (e) {
                    this.warning = e.response.data.error;
                    this.showDismissibleAlert = true;
                }
            }
        },
        computed: mapGetters(['admin']),
        async created() {
            await this.fetchAdmin();
            if (sessionStorage.getItem('token') === null || !this.admin) {
                await this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>
