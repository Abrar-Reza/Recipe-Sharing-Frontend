<template>
    <div class="home mx-auto px-3 mb-5" style="max-width: 500px;">
        <h1 class="title mt-2 text-center">{{recipes.name}}</h1>

        <p>By {{recipes.owner}}</p>
        <img v-if="recipes.image" :src=recipes.image class="img-fluid mx-auto d-block" style="max-height: 500px" :alt=recipes.name>

        <h2 class="mt-3">Ingredients</h2>
        
        <ul>
            <pre>{{recipes.ingredients}}</pre>
        </ul>
        <hr>
        <h2 class="mt-3">Directions</h2>
        <ul>
            <pre>{{recipes.directions}}</pre>
        </ul>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Post',
        data () {
            return{
                recipes: [],
                name: '',
            }
        },

        mounted () {
            this.getRecipes()
        },
        methods: {
            async getRecipes() {
                const recipe_slug = this.$route.params.recipe_slug
                await axios.get(`recipes/${recipe_slug}`)
                    .then(response => {
                        console.log(response)
                        this.recipes = response.data
                        document.title = 'Recipes | ' + this.recipes.name
                    })
                    .catch(error => {
                        console.log(error)
                    })
                
            },

        }
    }

</script>