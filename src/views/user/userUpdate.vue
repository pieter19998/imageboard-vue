<template>
    <b-container>
        <br>
        <b-alert :variant="variant" class="text-center" dismissible v-model="showDismissibleAlert">
            {{warning}}
        </b-alert>
        <b-row>
            <b-col class="align-middle">
                <b-form @submit.self.prevent="update">
                    <h2>{{username}}</h2>
                    <b-form-group label="Username">
                        <b-input :state="usernameLengthValidation" class="text-center" id="username"
                                 v-model="username"></b-input>
                        <b-form-invalid-feedback :state="usernameLengthValidation">
                            Your username must be 5-20 characters long.
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
                        <b-form-radio-group :options="options"
                                            :state="state"
                                            id="radio-group-1"
                                            name="radio-options"
                                            required
                                            v-model="gender"
                        ></b-form-radio-group>
                    </b-form-group>
                    <b-form-group class="text-center" label="Date of birth">
                        <b-input-group class="mb-3">
                            <b-form-input
                                    locale="en-US"
                                    placeholder="YYYY-MM-DD"
                                    type="text"
                                    v-model="dateOfBirth"
                            ></b-form-input>
                            <b-input-group-append>
                                <b-form-datepicker
                                        id="date"
                                        :max="max" :min="min"
                                        button-only
                                        locale="en-US"
                                        right
                                        v-model="dateOfBirth"
                                ></b-form-datepicker>
                            </b-input-group-append>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group class="form-part">
                        <input class="btn btn-primary" type="submit" value="update"/>
                        <b-button @click="info($event.target)" class="action" variant="danger">
                            <b-icon-trash></b-icon-trash>
                        </b-button>
                    </b-form-group>
                </b-form>
            </b-col>
        </b-row>
        <b-modal :id="infoModal.id" :title="infoModal.title" @ok="cancel()">
            <pre>{{ infoModal.content }}</pre>
            <template v-slot:modal-footer="{ cancel}">
                <b-button @click="cancel()" size="sm" variant="outline-secondary">
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
    import {mapActions, mapGetters} from "vuex";

    export default {
        name: "update",
        data() {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

            const minDate = new Date(today);
            minDate.setFullYear(minDate.getFullYear() - 100);

            const maxDate = new Date(today);

            return {
                showDismissibleAlert: false,
                username: '',
                deleteUsername: '',
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
                warning: "",
                variant: "",
                title: "Update",
                infoModal: {
                    id: 'info-modal',
                    title: '',
                    content: '',
                    name: null,
                }
            }
        },
        methods: {
            ...mapActions(['updateUser', 'fetchCurrentUser', 'deleteUser', 'logOut']),
            async info(index, button) {
                this.infoModal.title = this.username;
                this.infoModal.content = `delete your account ? `;
                // this.infoModal.name = item.item.name;
                this.$root.$emit('bv::show::modal', this.infoModal.id, button)
            },

            async remove() {
                try {
                    await this.deleteUser(this.deleteUsername);
                    await this.logOut();
                    await this.$router.push('/');
                    this.warning = "successfully deleted user " + this.username;
                    this.showDismissibleAlert = true;
                    this.variant = "success"
                } catch (e) {
                    this.warning = e.response.data.error;
                    this.showDismissibleAlert = true;
                    this.variant = "danger"
                }
            },
            async update() {
                try {

                    if (this.password === this.passwordRepeat && Date.parse(this.dateOfBirth)) {
                        await this.updateUser({
                            email: this.email,
                            username: this.username,
                            dateOfBirth: this.dateOfBirth,
                            gender: this.gender
                        });
                        //reroute page
                        // await this.fetchCurrentUser();
                        await this.$router.push('/')
                    }
                    this.warning = "password doesn't match or Date of Birth is invalid";
                    this.showDismissibleAlert = true;
                    this.variant = 'danger';
                } catch (e) {
                    this.warning = e.response.data.error;
                    this.showDismissibleAlert = true;
                    this.variant = 'danger';
                }
            }
        },
        computed: {
            ...mapGetters(['currentUser', 'authStatus']),
            usernameLengthValidation() {
                return this.username.length >= 5 && this.username.length < 25
            },
            passwordLengthValidation() {
                return this.password.length >= 5 && this.password.length < 20
            },
            passwordRepeatValidation() {
                return this.passwordRepeat === this.password
            },
            state() {
                return Boolean(this.gender)
            }
        },
        async created() {
            // await this.fetchCurrentUser();
            if (sessionStorage.getItem('token') === null) {
                await this.$router.push('/')
            }

            try {
                await this.fetchCurrentUser();
                this.username = this.currentUser.username;
                this.deleteUsername = this.currentUser.username;
                this.email = this.currentUser.email;
                this.dateOfBirth = this.currentUser.dateOfBirth;
                this.gender = this.currentUser.gender
            } catch (e) {
                this.warning = "User " + this.username + " does not exist";
                this.showDismissibleAlert = true;
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

    button {
        margin-left: 50px;
    }
</style>
