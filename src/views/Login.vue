<template>
    <div class="login mx-3">
        <h1 class="text-center mb-3" style="margin-top: 20vh">Login</h1>

        <form @submit.prevent="submitForm">
            <div class="mx-auto" style="max-width: 350px;">
                <div class="form-floating mb-3">
                    <input type="username" name="username" class="form-control" id="floatingInput" placeholder="Username" v-model="username" required>
                    <label for="floatingInput">Username</label>
                </div>
                <div class="form-floating">
                    <input type="password" name="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password" required>
                    <label for="floatingPassword">Password</label>
                </div>

                <div class="d-grid gap-2 mt-3">
                    <button class="btn btn-primary" type="submit">Login</button>
                </div>

                <div class="alert alert-danger mt-2" v-if="errors.length">
                    <span v-for="error in errors" v-bind:key="error">{{ error }}</span>
                </div>
            </div>

        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                errors: []
            }
        },

        methods: {
            submitForm(e){
                const formData ={
                    username: this.username,
                    password: this.password,
                }

                axios
                    .post('/api/v1/token/login', formData)
                    .then(response => {
                        console.log(response)

                        const token = response.data.auth_token

                        this.$store.commit('setToken', token)

                        axios.defaults.headers.common['Authorization'] = "Token " + token

                        localStorage.setItem("token", token)

                        this.$router.push('/profile')
                    })
                    .catch(error => {
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
        }
    }
</script>