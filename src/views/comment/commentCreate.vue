<template>
    <b-container>
        <br>
        <b-alert dismissible v-model="showDismissibleAlert" variant="danger">
            {{warning}}
        </b-alert>
        <h1>{{name}}</h1>

        <b-row>
            <b-col class="align-middle">
                <b-form @submit.self.prevent="create">
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
                    </div>
                    <div>
                        <br>
                        <input class="btn btn-primary" type="submit" value="Create Thread"/>
                    </div>
                </b-form>
            </b-col>
            <b-img v-if="this.submitImage !== null" :src="submitImage" alt="" fluid thumbnail></b-img>
        </b-row>
    </b-container>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "commentCreate",
        data() {
            return {
                name: 'Create Comment',
                showDismissibleAlert: false,
                description: '',
                warning: '',
                image: null,
                text: '',
                preview: '',
                submitImage: null

            }
        },
        methods: {
            ...mapActions(['createComment']),
            async create() {
                try {
                    await this.createComment({
                        text: this.text,
                        image: this.submitImage,
                        id: this.$route.params.thread
                    });
                    await this.$router.go(-1)
                } catch (e) {
                    this.warning = e.response.data.error;
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
            }
        },
        async created() {
            if (sessionStorage.getItem('token') === null) {
                await this.$router.push('/')
            }
        },
    }
</script>

<style scoped>

</style>
