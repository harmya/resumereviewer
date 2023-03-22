<template>
    <TopHeader v-show="show"/>
    <transition name="fade">
    <div class="container">
        <h1>
            Resume Reviewer
        </h1>
        <div class="home">
            <h1>Welcome {{firstName}}</h1>
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
                <button id="upload" class="space-button" v-on:click="uploadFile()">Upload</button>
            </div>
            <p>{{fileName}}</p>
        </div>
    </div>
    </transition>
    
    

</template>
<script>

import TopHeader from './TopHeader.vue'

export default {
    name:'HomePage',
    components: {
        TopHeader
   },
    data() {
        return {
            firstName: '',
            fileName: '',
            file: 'null',
            show: false
        }
    },
    methods: {
    async uploadFile() {
        const fileUpload = document.querySelector('#fileUpload')
        if (fileUpload.files.length <= 0) {
            return alert("Please select a file to upload")
        } else {
            const formData = new FormData()
            formData.append('fileUpload', fileUpload.files[0]);
            await fetch('http://localhost:3000/api/upload', {
                method: 'POST',
                body: formData
            }).then(response => {
                if (response.status == 200) {
                    //redirect to results page
                    window.location.href = "http://localhost:8080/result"
                } else {
                    alert("Error uploading file")
                }
            })
        }
    }
},
    created() {
        console.log("Home Page")
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
    padding: 6px 12px;
    cursor: pointer;
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
    margin-top: 100px;
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
</style>