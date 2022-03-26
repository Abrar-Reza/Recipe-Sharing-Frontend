<template>
    <div class="profile mx-3">
        <h1 class="text-center mt-2">Profile</h1>
        
        <div class="text-center mb-4">
            <span :src="username">username: {{username}}</span> <br>
            <span :src="email">email: {{email}}</span> <br>
            <button v-if="$store.state.isAuthenticated" @click="logout()" class="btn btn-danger mt-2" type="button">Log out</button>
            <hr>
        </div>

        <form v-on:submit="addRecipe" enctype="multipart/form-data" class="mb-4">
            <div class="input-group mb-3">
                <input v-model="name" type="text" class="form-control" placeholder="recipe">
            </div> 
            <div class="input-group mb-3">
                <textarea rows="3" v-model="directions" type="text" class="form-control" placeholder="directions"></textarea>
            </div> 
            <div class="input-group mb-3">
                <textarea rows="3" v-model="ingredients" type="text" class="form-control" placeholder="ingredients"></textarea>
            </div> 
            <div class="mb-3">
                <input class="form-control" type="file" id="formFile" @change="onFileUpload">
            </div>
            <button class="btn btn-outline-primary">Submit</button>
            <div class="alert alert-danger" v-if="errors.length">
                <span v-for="error in errors" v-bind:key="error">{{ error }}</span>
            </div>
            <hr>
        </form>

        <div v-for="recipe in recipes" v-bind:key="recipe.id">
                
            <!-- MD & up Card -->
            <div class="mx-auto mt-3 d-none d-md-block" style="max-width: 900px">
                <router-link :to="`${recipe.id}`" class="text-dark text-decoration-none">
                    <div class="mx-4 d-flex flex-row">
                        <div class="float-start">
                            <img v-if="recipe.image" :src=recipe.image style="height: 250px" :alt=recipe.name>
                        </div>
                        <div class="mx-3">
                            <h4>{{ recipe.name }}</h4>
                            <a class="text-dark text-decoration-none" href="#" role="button">
                                Read More
                                <svg width="16" height="16" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </router-link>
                <hr class="mx-4">
            </div>
            
            <!-- Lower than MD -->
            <div class="mx-3 mb-5 d-block d-md-none">
                <router-link :to="`${recipe.id}`" class="text-dark text-decoration-none">
                    <img v-if="recipe.image" :src=recipe.image class="card-img-top float-start mb-2" :alt=recipe.name>
                    <h4>{{ recipe.name }}</h4>
                    <a class="text-dark text-decoration-none" href="#" role="button">
                        Read More
                        <svg width="16" height="16" class="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                    </a>
                </router-link>
                <hr>
            </div>

        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Profile',
        data() {
            return {
                username: '',
                email: '',
                ids: '',
                recipes: [],

                name: '',
                selectfile: "",
                ingredients: "",
                directions: "",
                errors: [],
            }
        },

        mounted() {
            this.getMe()
        },
        
        methods: {
            getMe(){
                const token = this.$store.state.token

                axios.get('api/v1/users/me/', token)
                .then(response => {
                    console.log(response)

                    this.username = response.data.username 
                    this.email = response.data.email 
                    this.ids = response.data.id 

                    axios.get(`users_recipes/${this.ids}`)
                    .then(response => {
                        console.log(response),
                        this.recipes = response.data
                    })

                })
                .catch(error => {
                    console.log(error)
                })
            },
            onFileUpload (event) {
                this.selectfile = event.target.files[0];
            },

            addRecipe() {
                if (this.name) {

                    var recipeData = new FormData();
                    recipeData.append("image", this.selectfile); // it means this.selectfile will have event.target.files[0].
                    recipeData.append("name", this.name);
                    recipeData.append("directions", this.directions);
                    recipeData.append("ingredients", this.ingredients);

                    axios.post('recipes/', recipeData, {
                        headers: {
                            "content-type": `multipart/form-data; boundary=${recipeData._boundary}`,
                        }
                    })
                    .then((response) => {
                        let newRecipe = {
                            'id': response.data.id,
                            'name': this.name,
                            'directions': this.directions,
                            'ingredients': this.ingredients,
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        if (error.response) {
                            for (const property in error.response.data) {
                                this.errors.push(`${error.response.data[property]}`)
                            }
                        } else {
                            this.errors.push('Something went wrong. Please try again')
                            
                            console.log(JSON.stringify(error))
                        }
                    })
                }
            },
            
            logout() {
                axios.defaults.headers.common["Authorization"] = ""
                localStorage.removeItem("token")
                localStorage.removeItem("username")
                localStorage.removeItem("userid")
                this.$store.commit('removeToken')
                this.$router.push('/login')
            },
        }
    }
</script>