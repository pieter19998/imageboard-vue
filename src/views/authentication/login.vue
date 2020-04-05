<template>
    <b-container>
        <br>
        <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            {{warning}}
        </b-alert>
        <b-row>
            <b-col class="align-middle">
                <b-form @submit.self.prevent="login">
                    <div>
                        <h2>{{title}}</h2>
                        <label>Username:</label>
                        <b-input v-model="username" class="text-center" type="text" required id="text-username"
                                 aria-describedby="username-help-block"/>
                    </div>
                    <div class="form-part">
                        <label>Password:</label>
                        <b-input v-model="password" class="text-center" type="password" id="text-password"
                                 aria-describedby="password-help-block"/>
                    </div>
                    <div class="form-part">
                        <br>
                        <input type="submit" value="login" class="btn btn-primary"/>
                    </div>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';

    export default {
        name: 'login',
        data() {
            return {
                showDismissibleAlert: false,
                username: "",
                password: "",
                warning: "",
                title: "Login"
            }
        },
        methods: {
            ...mapActions(['fetchToken', 'fetchCurrentUser']),
            async login(){
                try {
                    await this.fetchToken({username: this.username, password: this.password});
                    //reroute page
                    // await this.fetchUserLoggedIn();
                    await this.$router.push('/')
                }catch (e) {
                    this.warning = e.response.data.error;
                    this.showDismissibleAlert = true;
                }
            }
        },
        computed: mapGetters(['authStatus']),

        async created() {
            // if (sessionStorage.getItem('token') !== null) {
            if (this.authStatus) {
                await this.$router.push('/')
            }
        }
    }
</script>

<style scoped>
    h2 {
        padding-bottom: 15px;
        padding-top: 15px;
    }

    .form-part {
        padding-bottom: 10px;
        padding-top: 10px;
    }
</style>
