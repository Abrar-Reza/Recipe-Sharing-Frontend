<template>
    <div class="home">

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
        name: 'Post',
        data () {
            return {
                recipes: [],
            }
        },

        mounted () {
            this.getRecipes()
        },
        
        methods: {
        
            getRecipes() {
                axios.get('recipes/')
                .then(response => {
                    console.log(response),
                    this.recipes = response.data
                })
            },

        }
    }

</script>