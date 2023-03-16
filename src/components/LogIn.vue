<template>
    <transition name="fade">
    <div class="container">
        <h1>
            Log In
        </h1>
        <div class="inputs">
             <label for="username">Username</label>
             <input type="text" v-model="username" id="username" placeholder="Username" />
             <span :class="[dynamic_class_username ? 'success' : 'error']">{{ message_username }}</span>
             <br>
             <label for="password">Password</label>
             <input type="password" v-model="password" id="password" placeholder="Password"/>
             <span :class="[dynamic_class_password ? 'success' : 'error']">{{ message_password }}</span>
             <br>
             <button v-on:click="login">Login</button>
             <p>
                 Don't have an account? <router-link to="/signup">Sign Up</router-link>
             </p>
        </div>  
    </div>
    </transition>
    
</template>

<script>
import axios from 'axios'
export default {
    name: 'LogIn',
    data() {
        return {
            username: '',
            password: '',
            show : true,


            dynamic_class_username: true,
            message_username: '',
            class_name_username: '',

            dynamic_class_password: true,
            message_password: '',
            class_name_password: ''
        }
    },
    methods: {
        async login() {
            console.log("Sign In")
            console.log(this.username, this.password)
            if (this.username == '' || this.username == null || this.password == '' || this.password == null) {
                if (this.username == '' || this.username == null) {
                    this.dynamic_class_username = false
                    this.message_username = 'Enter a username'
                    this.class_name_username = 'error'
                } else {
                    this.dynamic_class_username = true
                    this.message_username = ''
                    this.class_name_username = ''
                }

                if (this.password == '' || this.password == null) {
                    this.dynamic_class_password = false
                    this.message_password = 'Enter a password'
                    this.class_name_password = 'error'
                }
                else {
                    this.dynamic_class_password = true
                    this.message_password = ''
                    this.class_name_password = ''
                }
                return
            }
            this.dynamic_class_username = true
            this.message_username = ''
            this.class_name_username = ''
            this.dynamic_class_password = true
            this.message_password = ''
            this.class_name_password = ''

            const response = await axios.post('http://localhost:3000/api/login', {
                username: this.username,
                password: this.password
            })
            const message = response.data.message
            console.log(message)
            if (message == 'no user') {
                this.dynamic_class_username = false
                this.message_username = 'Username does not exist, please sign up'
                this.class_name_username = 'error'
            } else if (message == 'wrong password') {
                this.dynamic_class_password = false
                this.message_password = 'Wrong password, please try again'
                this.class_name_password = 'error'
            } else if (message == 'success') {
                this.dynamic_class_username = true
                this.message_username = ''
                this.class_name_username = ''
                this.dynamic_class_password = true
                this.message_password = ''
                this.class_name_password = ''
                this.$router.push('/home')
            }
        }
    }
}
</script>

<style>
.fade-in-enter-active, .fade-in-leave-active {
    transition: opacity .5s
}
.fade-in-enter, .fade-in-leave-to {
    opacity: 0
}

.error {
    color: red;
}

.success {
    color: green;
}

</style>