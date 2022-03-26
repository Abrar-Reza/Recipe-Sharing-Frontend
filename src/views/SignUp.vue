<template>
    <div class="sign-up mx-3">
        <h1 class="text-center mb-3" style="margin-top: 20vh">Sign Up</h1>

        <form @submit.prevent="submitForm">
            <div class="mx-auto" style="max-width: 350px;">
                <div class="form-floating mb-3">
                    <input type="email" name="username" class="form-control" id="floatingInput" placeholder="Email" v-model="username" required>
                    <label for="floatingInput">Email</label>
                </div>
                <div class="form-floating">
                    <input type="password" name="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password" required>
                    <label for="floatingPassword">Password</label>
                </div>

                <div class="d-grid gap-2 mt-3">
                    <button class="btn btn-primary" type="submit">Sign Up</button>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'SignUp',
        data() {
            return {
                username: '',
                password: '',
            }
        },

        methods: {
            submitForm(e) {
                const formData ={
                    username: this.username,
                    password: this.password,
                    email: this.username,
                }

                axios
                    .post('/api/v1/users/', formData)
                    .then(response => {
                        this.$router.push('/login')
                        console.log(response)
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }
</script>