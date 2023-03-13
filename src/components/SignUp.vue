<template>
    <div class="container">
        <h1>Sign Up</h1>
        <div class="inputs">
            <label for="name">Enter you Name</label>
            <input type="text" v-model="name" id="name" placeholder="Name" />
            <br>
            <label for="username">Username</label>
            <input type="text" v-model="username" id="username" placeholder="Username" />
            <br>
            <label for="password">Password</label>
            <input type="password" v-model="password" id="password" placeholder="Password" />
            <br>
            <button v-on:click="signUp">Sign Up</button>
            <p>
                Already have an account? <router-link to="/">Login</router-link>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SignUp',
    data() {
        return {
            name: '',
            username: '',
            password: ''
        }
    },
    methods: {
        async signUp() {
            console.log("Sign Up")
            console.log(this.name, this.username, this.password)
            this.$router.push({name: 'home'})
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
    background-color: #06617a;
    color: white;
    transition: 0.4s;
}



</style>