<template>
    <TopHeader />
    <br>
    <br>
    <br>
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
            firstName: '',
            fileName: '',
            file: 'null'
        }
    },
    methods: {
        handleFileUpload() {
            const input = document.querySelector('input[type="file"]')
            this.file = input.files[0]
            this.fileName = this.file.name
            console.log(this.file)
            this.submitFile()
        },
        submitFile() {
            console.log("File submitted")
            let formData = new FormData()
            formData.append('file', this.file)
            formData.append('name', this.fileName)
            axios.post('http://localhost:3000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }
    },
    created() {
        console.log("Home Page")
    },
    mounted() {
        
    }
}
</script>

<style>
.home {
    text-align: center;
    margin-top: 60px;
    font-family: 'Times New Roman', Times, serif;
    font-size: small;
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
input[type="file"] {
    display: none;
}
.space-button {
  background-color: #000;
  border: none;
  border-radius: 50px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  padding: 16px 32px;
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
}


</style>