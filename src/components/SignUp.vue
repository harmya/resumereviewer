<template>
    <div class="container">
        <h1>Sign Up</h1>
        <div class="inputs">
            <label for="name">Enter you Name</label>
            <input type="text" v-model="name" id="name" placeholder="Name" />
            <br>
            <label for="username">Username</label>
            <input type="text" v-model="username" id="username" placeholder="Username" @keyup="checkUsername()" class="form-control input-lg" :class="class_name"/>
            <span :class="[dynamic_class_username ? 'success' : 'error']">{{ message_username }}</span>
            <br>
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" placeholder="Password" @keyup="checkPassword()"/>
            <span class="instructions" style="margin-left: 500px; margin-top: -37px;">
                <span class="instructions">Password must contain:</span>
                <br>
                <span class="points"> 
                    <span style="margin-left: 15px;" :class="[dynamic_class_length ? 'success' : 'error']"> at least 8 characters long </span>
                    <br>
                    <span style="margin-left: 15px;" :class="[dynamic_class_upper? 'success' : 'error']">an uppercase letter</span>
                    <br>
                    <span style="margin-left: 15px;" :class="[dynamic_class_lower ? 'success' : 'error']">a lowercase letter</span>
                    <br>
                    <span style="margin-left: 15px;" :class="[dynamic_class_number ? 'success' : 'error']">a number</span>
                    <br>
                    <span style="margin-left: 15px;" :class="[dynamic_class_special ? 'success' : 'error']">a special character</span>
                </span>
            </span>
            <br>
            <button v-on:click="signUp" :disabled="disable">Sign Up</button>
            <p>
                Already have an account? <router-link to="/">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            username: '',
            password: '',

            disable: true,

            dynamic_class_username: true,
            message_username: '',
            class_name_username: '',

            dynamic_class_length: false,
            dynamic_class_upper: false,
            dynamic_class_lower: false,
            dynamic_class_number: false,
            dynamic_class_special: false,
            message_password: '',
            class_name_password: ''
        }
    },
    methods: {
        async signUp() {
            console.log("Sign Up")
            const bcrypt = require('bcryptjs')
            const salt = bcrypt.genSaltSync(10)
            const hash_password = bcrypt.hashSync(this.password, salt)
            const response = await axios.post('http://localhost:3000/api/signup', {
                name: this.name,
                username: this.username,
                password: hash_password
            })
            console.log(response)
            //this.$router.push({name: 'home'})
            
        },
        async checkUsername() {
            if (this.username == '' ) {
                this.dynamic_class_username = true
                this.message_username = ''
                this.class_name = ''
                this.disable = true
                return
            }
            if (this.username.length < 3) {
                this.dynamic_class_username = false
                this.message_username = 'Username must be at least 3 characters long'
                this.class_name_username = 'error'
                this.disable = true
                return
            }
            const usernameAlreadyExists = await axios.get('http://localhost:3000/api/signup?username=' + this.username)
            console.log(usernameAlreadyExists.data)
            if (usernameAlreadyExists.data == true) {
                this.dynamic_class_username = false
                this.message_username = "Username already exists, please select another username"
                this.class_name_username = "error"
                this.disable = true
            } else {
                this.dynamic_class_username = true
                this.message_username = "Username available"
                this.class_name_username = "success"
                this.disable = this.checkPassword()
            }
        },
        async checkPassword() {
            if (this.password == '') {
                this.dynamic_class_length = false
                this.dynamic_class_upper = false
                this.dynamic_class_lower = false
                this.dynamic_class_number = false
                this.dynamic_class_special = false

                this.class_name_length = ''
                this.class_name_upper = ''
                this.class_name_lower = ''
                this.class_name_number = ''
                this.class_name_special = ''

                this.message_password = ''
                this.disable = true


                return
            }
            if (this.password.length < 8) {
                this.dynamic_class_length = false
                this.class_name_length = "error"
                this.disable = true
            } else {
                this.dynamic_class_length = true
                this.class_name_length = "success"
            }
            if (this.password.match(/[A-Z]/) == null) {
                this.dynamic_class_upper = false
                this.class_name_upper = "error"
                this.disable = true
            } else {
                this.dynamic_class_upper = true
                this.class_name_upper = "success"
            }
            if (this.password.match(/[a-z]/) == null) {
                this.dynamic_class_lower = false
                this.class_name_lower = "error"
                this.disable = true
            } else {
                this.dynamic_class_lower = true
                this.class_name_lower = "success"
            }
            if (this.password.match(/[0-9]/) == null) {
                this.dynamic_class_number = false
                this.class_name_number = "error"
                this.disable = true
            }
            else {
                this.dynamic_class_number = true
                this.class_name_number = "success"
            }
            if (this.password.match(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/) == null) {
                this.dynamic_class_special = false
                this.class_name_special = "error"
                this.disable = true
            } else {
                this.dynamic_class_special = true
                this.class_name_special = "success"
            }
        }
    }
}

</script>

<style>
.container {
    display: table;
    margin-top: 17vh;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    height: 50vh;
    width: 50vw;
    background-color: #fafafa;
}
.inputs {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
}
.inputs input{
    margin: 10px;
    padding: 10px;
    border: 1px solid #1fb5de;
    border-radius: 4px;
    box-sizing: border-box;
}
.inputs button {
    font-family: Space Mono;
    font-size: 1em;
    margin: 10px;
    padding: 15px;
    border: 1px solid #1fb5de;
    border-radius: 4px;
    box-sizing: border-box;
    background-color: #1fb5de;
    color: white;
}
.inputs button:hover {
    background-color: #067a57;
    color: white;
    transition: 0.4s;
}

.inputs button:disabled {
    background-color: #003948;
    color: white;
    transition: 0.4s;
    cursor: not-allowed;
}

.success {
    color: green;
    font-size: 0.8em;
}

.error {
    color: red;
    font-size: 0.8em;
}

.instructions {
    color: #3f4142;
    width: 20%;
    text-align: left;
    padding-left: 10px;
}


</style>