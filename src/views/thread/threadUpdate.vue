<template>
    <b-container>
        <br>
        <b-alert dismissible v-model="showDismissibleAlert" variant="danger">
            {{warning}}
        </b-alert>
        <h1>Update Thread: {{title}}</h1>
        <b-row>
            <b-col class="align-middle">
                <b-form @submit.self.prevent="update()">
                    <div>
                        <label>Title</label>
                        <b-input aria-describedby="text-help-block" class="text-center" id="text" required type="text"
                                 v-model="title"/>
                    </div>
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
                        <input class="btn btn-primary" type="submit" value="Update Thread"/>
                    </div>
                </b-form>
            </b-col>
            <b-img :src="submitImage" alt="" fluid thumbnail v-if="this.submitImage !== null"></b-img>
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
                title: '',
                text: '',
                image: [],
                warning: '',
                submitImage: null
            }
        },
        methods: {
            ...mapActions(['fetchThread', 'updateThread']),
            async update() {
                try {
                    await this.updateThread({
                        id: this.getUpdateThread.id,
                        title: this.title,
                        text: this.text,
                        image: this.submitImage,
                        creationDate: this.getUpdateThread.creationDate,
                        author: this.getUpdateThread.author
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
                    };
                    reader.readAsDataURL(file);
                } else {
                    this.warning = "Wrong file type use either .png or .jpg";
                    this.showDismissibleAlert = true;
                }
            },

            async loadFormData() {
                try {
                    await this.fetchThread(this.$route.params.id);
                    this.title = this.getUpdateThread.title;
                    this.text = this.getUpdateThread.text;
                    this.submitImage = this.getUpdateThread.image;
                } catch (e) {
                    this.warning = "Thread " + this.title + " does not exist";
                    this.showDismissibleAlert = true;
                }
            }
        },
        async created() {
            if (sessionStorage.getItem('token') === null) {
                await this.$router.push('/')
            }
            this.loadFormData()
        },
        computed: mapGetters(['getUpdateThread']),
    }
</script>

<style scoped>

</style>
