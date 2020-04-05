<template>
    <b-container>
        <br>
        <b-alert dismissible v-model="showDismissibleAlert" variant="danger">
            {{warning}}
        </b-alert>
        <b-row>
            <b-col class="align-middle">
                <b-form @submit.self.prevent="register">
                    <h2>{{title}}</h2>
                    <b-form-group label="Username">
                        <b-input :state="usernameLengthValidation" class="text-center" id="username"
                                 v-model="username"></b-input>
                        <b-form-invalid-feedback :state="usernameLengthValidation">
                            Your password must be 5-20 characters long.
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="usernameLengthValidation">
                            Looks Good.
                        </b-form-valid-feedback>
                    </b-form-group>
                    <b-form-group label="Email">
                        <b-input aria-describedby="email-help-block" class="text-center" id="email" required
                                 type="email"
                                 v-model="email"/>
                    </b-form-group>
                    <b-form-group label="Choose gender">
                        <b-form-radio-group required
                                :options="options"
                                id="radio-group-1"
                                name="radio-options"
                                v-model="gender"
                        ></b-form-radio-group>
                    </b-form-group>
                    <b-form-group label="Date if birth">
                        <b-input-group class="mb-3">
                            <b-form-input
                                    id="date"
                                    placeholder="YYYY-MM-DD"
                                    type="text"
                                    locale="en-US"
                                    v-model="dateOfBirth"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-form-datepicker
                                        :min="min" :max="max"
                                        button-only
                                        locale="en-US"
                                        right
                                        v-model="dateOfBirth"
                                ></b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group label="password">
                        <b-input :state="passwordLengthValidation" class="text-center" id="password" type="password"
                                 v-model="password"></b-input>
                        <b-form-invalid-feedback :state="passwordLengthValidation">
                            Your password must be 5-25 characters long.
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="passwordLengthValidation">
                            Looks Good.
                        </b-form-valid-feedback>
                    </b-form-group>
                    <b-form-group label="Password repeat">
                        <b-input :state="passwordRepeatValidation" class="text-center" id="passwordRepeat" type="password"
                                 v-model="passwordRepeat"></b-input>
                        <b-form-invalid-feedback :state="passwordRepeatValidation">
                            Password doesn't match.
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback :state="passwordRepeatValidation">
                            Looks Good.
                        </b-form-valid-feedback>
                    </b-form-group>
                    <b-form-group class="form-part">
                        <br>
                        <input class="btn btn-primary" type="submit" value="register"/>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "register",
        data() {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            const minDate = new Date(today);
            minDate.setFullYear(minDate.getFullYear() - 100);

            const maxDate = new Date(today);

            return {
                showDismissibleAlert: false,
                username: '',
                email: '',
                gender: '',
                dateOfBirth: '',
                min: minDate,
                max: maxDate,
                options: [
                    {text: 'Male', value: 'Male'},
                    {text: 'Female', value: 'Female'},
                    {text: 'Other', value: 'Other'}
                ],
                password: "",
                passwordRepeat: "",
                warning: "",
                title: "Register",
                button: true
            }
        },
        methods: {
            ...mapActions(['registerUser', 'fetchCurrentUser']),
            async register() {
                try {
                    if (this.password === this.passwordRepeat) {
                        await this.registerUser({email: this.email, password: this.password, username: this.username, dateOfBirth: this.dateOfBirth, gender: this.gender});
                        // await this.fetchCurrentUser();
                        //reroute page
                        await this.$router.push('/')
                    }
                    this.warning = "password doesn't match";
                    this.showDismissibleAlert = true;
                } catch (e) {
                    this.warning = e.response.data.error;
                    this.showDismissibleAlert = true;
                }
            }
        },
        computed: {
            usernameLengthValidation() {
                return this.username.length >= 5 && this.username.length < 25
            },
            passwordLengthValidation() {
                return this.password.length >= 5 && this.password.length < 20
            },
            passwordRepeatValidation() {
                return this.passwordRepeat === this.password
            }
        },
        async beforeCreate() {
            if (sessionStorage.getItem('token') !== null) {
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
