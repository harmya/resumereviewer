<template>
    <div class="login">
        <h1>Login</h1>
        <div class="inputs">
            <label for="username">Username</label>
            <input type="text" v-model="username" id="username" placeholder="Username" />
            <br>
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" placeholder="Password" />
            <br>
            <button v-on:click="login">Login</button>
            <p>
                Don't have an account? <router-link to="/signup">Sign Up</router-link>
            </p>
        </div>  
    </div>
</template>

<script>
export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async login() {
            console.log("Sign Up")
            console.log(this.username, this.password)
            this.$router.push({name: 'home'})
        }
    }
}
</script>