<template>
    <b-container>
        <br>
        <b-alert dismissible v-model="showDismissibleAlert" variant="danger">
            {{warning}}
        </b-alert>
        <h1>{{name}}</h1>
        <b-row>
            <b-col class="align-middle">
                <b-form @submit.self.prevent="update()">
                    <div>
                        <label>Text</label>
                        <b-form-textarea
                                id="text"
                                max-rows="3"
                                placeholder="Enter something..."
                                required
                                rows="3"
                                v-model="text"
                        ></b-form-textarea>
                    </div>
                    <div>
                        <label>Image (optional)</label>
                        <b-form-file
                                :state="Boolean(image)"
                                @change="prepareImage"
                                accept=".jpg, .png, .gif"
                                drop-placeholder="Drop image here..."
                                placeholder="Choose a file or drop it here..."
                                v-model="image"
                        ></b-form-file>
                        <div class="mt-3">Selected file: {{ image ? image.name : '' }}</div>
                    </div>
                    <div>
                        <br>
                        <input class="btn btn-primary" type="submit" value="Update Comment"/>
                    </div>
                </b-form>
            </b-col>
            <b-img :src="submitImage" alt="" fluid thumbnail v-if="this.submitImage !== null"></b-img>
        </b-row>
    </b-container>
</template>

<script>
    import {mapActions, mapGetters} from "vuex";

    export default {
        data() {
            return {
                name: 'Update Comment',
                showDismissibleAlert: false,
                warning: '',
                image: [],
                text: '',
                id: null,
                submitImage: null
            }
        },
        methods: {
            ...mapActions(['updateComment', 'fetchComment']),
            async update() {
                try {
                    await this.updateComment({id: this.id, text: this.text, image: this.submitImage});
                    await this.$router.go(-1)

                } catch (e) {
                    this.warning = e;
                    this.showDismissibleAlert = true;
                }
            },

            prepareImage(e) {
                let file = e.srcElement.files[0];
                if (file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/gif") {

                    let reader = new FileReader();
                    reader.onloadend = () => {
                        this.submitImage = reader.result
                        // console.log(this.submitImage)
                    };
                    reader.readAsDataURL(file);
                } else {
                    this.warning = "Wrong file type use either .png or .jpg";
                    this.showDismissibleAlert = true;
                }
            },

            async loadFormData() {
                try {
                    await this.fetchComment(this.$route.params.id);
                    this.id = this.getUpdateComment.id;
                    this.text = this.getUpdateComment.text;
                    this.submitImage = this.getUpdateComment.image
                } catch (e) {
                    this.warning = "Comment does not exist";
                    this.showDismissibleAlert = true;
                }
            }
        },
        computed: mapGetters(['getUpdateComment']),
        async created() {
            if (sessionStorage.getItem('token') === null) {
                await this.$router.push('/')
            }

            this.loadFormData()
        }
    }
</script>

<style scoped>

</style>
