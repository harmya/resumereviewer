<template>
    <TopHeader v-show="show"/>
    <div class="container" style="margin-top: 120px;">
        <h1 style="font-size: 40px;">
            Resume Reviewer
        </h1>
        <div class="home" style="margin-top: 10px;">
            <h1>Welcome</h1>
            <div id="typed"></div>
            <p>Resume Reviewer is a web application that allows you to upload your resume and get it reviewed based on your role preference</p>
        </div>
        <div class="home">
            <h1>How it works?</h1>
            <p>Upload your resume and select the role you are applying for. We will review your resume and provide you with a detailed report on how you can improve your resume</p>
        </div>
        <div class="home">
            <h1>Upload your resume</h1>
            <div class="custom-file-upload">
                <input type="file" name="fileUpload" id="fileUpload" @change="file = $event.target.files[0]" />
                <button id="upload" class="space-button" v-on:click="uploadFile">Upload</button>
            </div>
            <p>{{fileName}}</p>
        </div>
        <div class="home">
            <h1>View your results</h1>
            <button id="upload" class="space-button" v-if="viewResult" v-on:click="goToResult">View Results</button>
        </div>
    </div>
    
    

</template>
<script>

import TopHeader from './TopHeader.vue'
import axios from 'axios'

export default {
    name:'HomePage',
    components: {
        TopHeader
   },
    data() {
        return {
            username: '',
            firstName: '',
            fileName: '',
            file: 'null',
            show: false,
            data : ' ',
            viewResult: false
        }
    },
    methods: {
    async uploadFile() {
        console.log("Upload File")
        const fileUpload = document.querySelector('#fileUpload')
        if (fileUpload.files.length <= 0) {
            return alert("Please select a file to upload")
        } else {
            const formData = new FormData()
            formData.append('fileUpload', fileUpload.files[0]);
            await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData,
            }).then(response => response.json())
            .then(data => {
                console.log(data)
                this.data = data
                this.viewResult = true
            })
            .catch(error => {
                console.error(error)
            })
            let data_to_save = {
                username: this.username,
                score: this.data
            }
            console.log(data_to_save)
            const response = await axios.post('http://localhost:3000/api/savescore', {              
                data_to_save
            })
            console.log(response)
            this.viewResult = true
           //console.log("redirecting to result page")
           //this.$router.push({name: 'resresult', params: {username: this.username}, replace: true})
        }
    },
    async goToResult() {
        console.log("Go to result")
        this.$router.push({name: 'resresult', params: {username: this.username}, replace: true}
        ).then(() => {
            localStorage.setItem('username', this.username)
            console.log("Result Page")
            window.location.reload()
        })
    }
},
    created() {
        console.log("Home Page")
        this.username = this.$route.params.username
        if (this.username == null) {
            this.username = localStorage.getItem('username')
        }
        localStorage.setItem('username', this.username)
        console.log(this.username)
    },
    mounted() {
        this.show = true
    }
}
</script>

<style>
.container {
    display: table;
    margin-left: auto;
    margin-right: auto;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #fafafa;
}

.resume {
    text-align: center;
    margin-top: 60px;
    font-family: 'Times New Roman', Times, serif;
    font-size: small;
}
.custom-file-upload {
    background-color: lightblue;
    display: inline-block;
    padding: 10px 10px;
    cursor: pointer;
    border-radius: 10px;
}
.custom-file-upload:hover {
    background-color: lightskyblue;
    transition: 0.3s;
}



.space-button {
  background-color: #2d2942;
  border: none;
  border-radius: 50px;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 20px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  margin-top: 10px;
}
.space-button:hover {
  background-color: #1b1827;
  border-radius: 20px;
  transition: 0.3s;
}

.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #232121;
    overflow: hidden;
    z-index: 1;
}
.navbar::after {
    content: "";
    clear: both;
    display: table;
}
.navbar a {
    float: left;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}
.navbar a:hover {
    background: #ddd;
    color: black;
    transition: 0.3s;
}
.navbar a.active {
    background-color: #4CAF50;
    color: white;
}

.home {
    margin-top: 10px;
    margin-bottom: 30px;
}
.fade-in-enter-active, .fade-in-leave-active {
    transition: opacity .5s
}
.fade-in-enter, .fade-in-leave-to {
    opacity: 0
}

html {
  scroll-behavior: smooth;
}
p {
    font-size: 20px;
    font-family: JetBrains Mono;
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}


</style>