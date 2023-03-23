<template>
    <TopHeader />
    <transition name="fade">
    <div class="showing" v-if="showResults">
    <h1> 
        Here is result of your resume:
    </h1>
    <h1>
        Your resume score is 
        <span :class = "[total_score > 80 ? 'good' : total_score > 50 ? 'work' : 'bad']">
            {{ total_score }}
        </span>
    </h1>
    </div>
    </transition>
    <h1 v-if="loading" style="margin-top: 150px;">
        Waiting on your analysis...
    </h1>
    <transition name="fade">
    <div id="loader" v-if="loading">
    <div v-if="loading" class="ls-particles ls-part-1"></div>
    <div v-if="loading" class="ls-particles ls-part-2"></div>
    <div v-if="loading" class="ls-particles ls-part-3"></div>
    <div v-if="loading" class="ls-particles ls-part-4"></div>
    <div v-if="loading" class="ls-particles ls-part-5"></div>
    <div v-if="loading" class="lightsaber ls-left ls-green"></div>
    <div v-if="loading" class="lightsaber ls-right ls-red"></div>
</div>
    </transition>

    
</template>

<script>
import axios from 'axios'
import TopHeader from './TopHeader.vue';
export default {
    el: "#app",
    name: "ResResult",
    data() {
        return {
            show: true,
            data: {},
            loading: true,
            showResults: false,
            username: "",
            keyword_score: 0,
            language_score: 0,
            total_score: 0,
            good: false,
            bad: false
        };
    },
    methods: {
        sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        async getResults() {
            //await this.sleep(50000);
            //sleep for 10 seconds
            console.log(this.username);
            const response = await axios.post("http://localhost:3000/api/score", {
                username: this.username
            });
            console.log(response);
            if (response.data == "NO_SCORE") {
                alert("No score found for this user due to server error please upload your resume again");
                this.$router.push("/home").then(() => {
                    window.location.reload();
                });
                return;
            }
            this.data = response.data;
            await this.sleep(5000);
            this.loading = false;
            console.log("Done");
            this.displayResults();
        },
        async displayResults() {
            this.keyword_score = this.data.keywords;
            this.language_score = this.data.languages;
            this.total_score = this.data.total_score;
            this.total_score = this.total_score * 2;
            this.showResults = true;
        },
        async goHome() {
            this.$router.push("/home").then(() => {
                window.location.reload();
            });
        }
    },
    mounted() {
        this.show = true;
        console.log("Mounted");
        this.getResults();
    },
    created() {
        console.log("Created");
        this.show = true;
        this.username = localStorage.getItem("username");
    },
    components: { TopHeader }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1.5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}
.h1 {
    font-size: 30px;
    font-weight: 500;
    color: #000000;
    margin: 0;
    padding: 0;
    text-align: center;
}
#loader {
    width: 480px;
    height: 440px;
    position: absolute;
    top: 35%;
    left: 36%;
    margin: -20px -40px;
    z-index: 1000;
    /* border: #000000 solid 1px; */

}

.lightsaber {
    position: absolute;
    width: 20px;
    height: 100px;
    background-color: #666;
    border-radius: 1px;
    bottom: 0;
}

.lightsaber.ls-left {
    left: 0;
}

.lightsaber.ls-right {
    right: 0;
}

.lightsaber:before {
    position: absolute;
    content: ' ';
    display: block;
    width: 12px;
    height: 300px;
    max-height: 400px;
    left: 1px;
    top: 1px;
    background-color: #fff;
    border-radius: 1px;
    -webkit-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
    -webkit-transform-origin: center top;
    -ms-transform-origin: center top;
    transform-origin: center top;
}

.lightsaber:after {
    position: absolute;
    content: ' ';
    display: block;
    width: 2px;
    height: 2px;
    left: 1px;
    top: 4px;
    background-color: #fff;
    border-radius: 50%;
}

.ls-particles {
    position: absolute;
    left: 232px;
    top: 150px;
    width: 2px;
    height: 45px;
    background-color: rgb(51, 51, 51, 0);
    -webkit-transform: rotateZ(0deg);
    transform: rotateZ(0deg);
}


.lightsaber.ls-green:before {
    -webkit-animation: showlightgreen 2s ease-in-out infinite 1s; animation: showlightgreen 4s ease-in-out infinite 1s;
}

.lightsaber.ls-red:before {
    -webkit-animation: showlightred 2s ease-in-out infinite 1s; animation: showlightred 4s ease-in-out infinite 1s;
}


.lightsaber.ls-left {
    -webkit-animation: fightleft 2s ease-in-out infinite 1s; animation: fightleft 2s ease-in-out infinite 1s;
}

.lightsaber.ls-right {
    -webkit-animation: fightright 2s ease-in-out infinite 1s; animation: fightright 2s ease-in-out infinite 1s;
}

.ls-particles.ls-part-1 {
    -webkit-animation: particles1 2s ease-out infinite 1s; animation: particles1 2s ease-out infinite 1s;
}

.ls-particles.ls-part-2 {
    -webkit-animation: particles2 2s ease-out infinite 1s; animation: particles2 2s ease-out infinite 1s;
}

.ls-particles.ls-part-3 {
    -webkit-animation: particles3 2s ease-out infinite 1s; animation: particles3 2s ease-out infinite 1s;
}

.ls-particles.ls-part-4 {
    -webkit-animation: particles4 2s ease-out infinite 1s; animation: particles4 2s ease-out infinite 1s;
}

.ls-particles.ls-part-5 {
    -webkit-animation: particles5 2s ease-out infinite 1s; animation: particles5 2s ease-out infinite 1s;
}

@-webkit-keyframes showlightgreen {
    0% {
        max-height: 0;
        box-shadow: 0 0 0 0 #87c054;
    }
  
    5% {
        box-shadow: 0 0 4px 2px #87c054;
    }
    
    10% {
        max-height: 300px;
    }
  
    80% {
        max-height: 300px;
    }
    
    85% {
        box-shadow: 0 0 4px 2px #87c054;
    }
    
    100% {
        max-height: 0;
        box-shadow: 0 0 0 0 #87c054;
    }
}

@-webkit-keyframes showlightred {
    0% {
        max-height: 0;
        box-shadow: 0 0 0 0 #f06363;
    }
  
    20% {
        box-shadow: 0 0 4px 2px #f06363;
    }
    
    25% {
        max-height: 300px;
    }
  
    80% {
        max-height: 300px;
    }
    
    85% {
        box-shadow: 0 0 4px 2px #f06363;
    }
    
    100% {
        max-height: 0;
        box-shadow: 0 0 0 0 #f06363;
    }
}

@-webkit-keyframes fightleft {
    0% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
        left: 0;
        bottom: 0;
    }
    
    30% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
        bottom: 0;
    }
    
    40% {
        -webkit-transform: rotateZ(45deg);
        transform: rotateZ(45deg);
        left: 0;
        bottom: 2px;
    }
    
    45%{
        -webkit-transform: rotateZ(65deg);
        transform: rotateZ(65deg);
        left: 0;
    }
    
    65%{
        -webkit-transform: rotateZ(410deg);
        transform: rotateZ(410deg);
        left: 30px;
        bottom: 10px;
    }
    
    95% {
        -webkit-transform: rotateZ(410deg);
        transform: rotateZ(410deg);
        left: 0;
        bottom: 0;
    }
    
    100% {
        -webkit-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
        left: 0;
        bottom: 0;
    }
}

@-webkit-keyframes fightright {
    0% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
        right: 0;
        bottom: 0;
    }
    
    30% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
        bottom: 0;
    }
    
    45% {
        -webkit-transform: rotateZ(-45deg);
        transform: rotateZ(-45deg);
        right: 0;
        bottom: 2px;
    }
    
    50%{
        -webkit-transform: rotateZ(-65deg);
        transform: rotateZ(-65deg);
        right: 0;
    }
    
    68%{
        -webkit-transform: rotateZ(-410deg);
        transform: rotateZ(-410deg);
        right: 27px;
        bottom: 13px;
    }
    
    95% {
        -webkit-transform: rotateZ(-410deg);
        transform: rotateZ(-410deg);
        right: 0;
        bottom: 0;
    }
    
    100% {
        -webkit-transform: rotateZ(-360deg);
        transform: rotateZ(-360deg);
        right: 0;
        bottom: 0;
    }
}

@-webkit-keyframes particles1 {
    0% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(35deg) translateY(0px);
        transform: rotateZ(35deg) translateY(0px);
    }
    
    63% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(35deg) translateY(0px);
        transform: rotateZ(35deg) translateY(0px);
    }
    
    64% {
        background-color: rgba(51, 51, 51,1);
        -webkit-transform: rotateZ(35deg) translateY(0px);
        transform: rotateZ(35deg) translateY(0px);
    }
    
    100% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(35deg) translateY(-30px);
        transform: rotateZ(35deg) translateY(-30px);
    }
}

@-webkit-keyframes particles2 {
    0% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-65deg) translateY(0px);
        transform: rotateZ(-65deg) translateY(0px);
    }
    
    63% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-65deg) translateY(0px);
        transform: rotateZ(-65deg) translateY(0px);
    }
    
    64% {
        background-color: rgba(51, 51, 51,1);
        -webkit-transform: rotateZ(-65deg) translateY(0px);
        transform: rotateZ(-65deg) translateY(0px);
    }
    
    95% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-65deg) translateY(-40px);
        transform: rotateZ(-65deg) translateY(-40px);
    }
    
    100% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-65deg) translateY(-40px);
        transform: rotateZ(-65deg) translateY(-40px);
    }
}

@-webkit-keyframes particles3 {
    0% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-75deg) translateY(0px);
        transform: rotateZ(-75deg) translateY(0px);
    }
    
    63% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-75deg) translateY(0px);
        transform: rotateZ(-75deg) translateY(0px);
    }
    
    64% {
        background-color: rgba(51, 51, 51,1);
        -webkit-transform: rotateZ(-75deg) translateY(0px);
        transform: rotateZ(-75deg) translateY(0px);
    }
    
    97% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-75deg) translateY(-35px);
        transform: rotateZ(-75deg) translateY(-35px);
    }
    
    100% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-75deg) translateY(-35px);
        transform: rotateZ(-75deg) translateY(-35px);
    }
}

@-webkit-keyframes particles4 {
    0% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-25deg) translateY(0px);
        transform: rotateZ(-25deg) translateY(0px);
    }
    
    63% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-25deg) translateY(0px);
        transform: rotateZ(-25deg) translateY(0px);
    }
    
    64% {
        background-color: rgba(51, 51, 51,1);
        -webkit-transform: rotateZ(-25deg) translateY(0px);
        transform: rotateZ(-25deg) translateY(0px);
    }
    
    97% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-25deg) translateY(-30px);
        transform: rotateZ(-25deg) translateY(-30px);
    }
    
    100% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-25deg) translateY(-30px);
        transform: rotateZ(-25deg) translateY(-30px);
    }
}

@-webkit-keyframes particles5 {
    0% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(65deg) translateY(0px);
        transform: rotateZ(65deg) translateY(0px);
    }
    
    63% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(65deg) translateY(0px);
        transform: rotateZ(65deg) translateY(0px);
    }
    
    64% {
        background-color: rgba(51, 51, 51,1);
        -webkit-transform: rotateZ(65deg) translateY(0px);
        transform: rotateZ(65deg) translateY(0px);
    }
    
    97% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(65deg) translateY(-35px);
        transform: rotateZ(65deg) translateY(-35px);
    }
    
    100% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(65deg) translateY(-35px);
        transform: rotateZ(65deg) translateY(-35px);
    }
}

@keyframes showlightgreen {
    0% {
        max-height: 0;
        box-shadow: 0 0 0 0 #87c054;
    }
  
    5% {
        box-shadow: 0 0 40px 20px #87c054;
    }
    
    10% {
        max-height: 300px;
    }
  
    80% {
        max-height: 300px;
    }
    
    85% {
        box-shadow: 0 0 40px 20px #87c054;
    }
    
    100% {
        max-height: 0;
        box-shadow: 0 0 0 0 #87c054;
    }
}

@keyframes showlightred {
    0% {
        max-height: 0;
        box-shadow: 0 0 0 0 #f06363;
    }
  
    20% {
        box-shadow: 0 0 40px 20px #f06363;
    }
    
    25% {
        max-height: 300px;
    }
  
    80% {
        max-height: 300px;
    }
    
    85% {
        box-shadow: 0 0 40px 20px #f06363;
    }
    
    100% {
        max-height: 0;
        box-shadow: 0 0 0 0 #f06363;
    }
}

@keyframes fightleft {
    0% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
        left: 0;
        bottom: 0;
    }
    
    30% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
        bottom: 0;
    }
    
    40% {
        -webkit-transform: rotateZ(45deg);
        transform: rotateZ(45deg);
        left: 0;
        bottom: 2px;
    }
    
    45%{
        -webkit-transform: rotateZ(65deg);
        transform: rotateZ(65deg);
        left: 0;
    }
    
    65%{
        -webkit-transform: rotateZ(410deg);
        transform: rotateZ(410deg);
        left: 30px;
        bottom: 10px;
    }
    
    95% {
        -webkit-transform: rotateZ(410deg);
        transform: rotateZ(410deg);
        left: 0;
        bottom: 0;
    }
    
    100% {
        -webkit-transform: rotateZ(360deg);
        transform: rotateZ(360deg);
        left: 0;
        bottom: 0;
    }
}

@keyframes fightright {
    0% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
        right: 0;
        bottom: 0;
    }
    
    30% {
        -webkit-transform: rotateZ(0deg);
        transform: rotateZ(0deg);
        bottom: 0;
    }
    
    45% {
        -webkit-transform: rotateZ(-45deg);
        transform: rotateZ(-45deg);
        right: 0;
        bottom: 2px;
    }
    
    50%{
        -webkit-transform: rotateZ(-65deg);
        transform: rotateZ(-65deg);
        right: 0;
    }
    
    68%{
        -webkit-transform: rotateZ(-410deg);
        transform: rotateZ(-410deg);
        right: 27px;
        bottom: 13px;
    }
    
    95% {
        -webkit-transform: rotateZ(-410deg);
        transform: rotateZ(-410deg);
        right: 0;
        bottom: 0;
    }
    
    100% {
        -webkit-transform: rotateZ(-360deg);
        transform: rotateZ(-360deg);
        right: 0;
        bottom: 0;
    }
}

@keyframes particles1 {
    0% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(35deg) translateY(0px);
        transform: rotateZ(35deg) translateY(0px);
    }
    
    63% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(35deg) translateY(0px);
        transform: rotateZ(35deg) translateY(0px);
    }
    
    64% {
        background-color: rgba(51, 51, 51,1);
        -webkit-transform: rotateZ(35deg) translateY(0px);
        transform: rotateZ(35deg) translateY(0px);
    }
    
    100% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(35deg) translateY(-30px);
        transform: rotateZ(35deg) translateY(-30px);
    }
}

@keyframes particles2 {
    0% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-65deg) translateY(0px);
        transform: rotateZ(-65deg) translateY(0px);
    }
    
    63% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-65deg) translateY(0px);
        transform: rotateZ(-65deg) translateY(0px);
    }
    
    64% {
        background-color: rgba(51, 51, 51,1);
        -webkit-transform: rotateZ(-65deg) translateY(0px);
        transform: rotateZ(-65deg) translateY(0px);
    }
    
    95% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-65deg) translateY(-40px);
        transform: rotateZ(-65deg) translateY(-40px);
    }
    
    100% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-65deg) translateY(-40px);
        transform: rotateZ(-65deg) translateY(-40px);
    }
}

@keyframes particles3 {
    0% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-75deg) translateY(0px);
        transform: rotateZ(-75deg) translateY(0px);
    }
    
    63% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-75deg) translateY(0px);
        transform: rotateZ(-75deg) translateY(0px);
    }
    
    64% {
        background-color: rgba(51, 51, 51,1);
        -webkit-transform: rotateZ(-75deg) translateY(0px);
        transform: rotateZ(-75deg) translateY(0px);
    }
    
    97% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-75deg) translateY(-35px);
        transform: rotateZ(-75deg) translateY(-35px);
    }
    
    100% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-75deg) translateY(-35px);
        transform: rotateZ(-75deg) translateY(-35px);
    }
}

@keyframes particles4 {
    0% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-25deg) translateY(0px);
        transform: rotateZ(-25deg) translateY(0px);
    }
    
    63% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-25deg) translateY(0px);
        transform: rotateZ(-25deg) translateY(0px);
    }
    
    64% {
        background-color: rgba(51, 51, 51,1);
        -webkit-transform: rotateZ(-25deg) translateY(0px);
        transform: rotateZ(-25deg) translateY(0px);
    }
    
    97% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-25deg) translateY(-30px);
        transform: rotateZ(-25deg) translateY(-30px);
    }
    
    100% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(-25deg) translateY(-30px);
        transform: rotateZ(-25deg) translateY(-30px);
    }
}

@keyframes particles5 {
    0% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(65deg) translateY(0px);
        transform: rotateZ(65deg) translateY(0px);
    }
    
    63% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(65deg) translateY(0px);
        transform: rotateZ(65deg) translateY(0px);
    }
    
    64% {
        background-color: rgba(51, 51, 51,1);
        -webkit-transform: rotateZ(65deg) translateY(0px);
        transform: rotateZ(65deg) translateY(0px);
    }
    
    97% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(65deg) translateY(-35px);
        transform: rotateZ(65deg) translateY(-35px);
    }
    
    100% {
        background-color: rgba(51, 51, 51,0);
        -webkit-transform: rotateZ(65deg) translateY(-35px);
        transform: rotateZ(65deg) translateY(-35px);
    }
}

.good {
    color: #87c054;
}

.bad {
    color: #f44336;
}
.work {
    color: #ff9800;
}
.home-button {
    color: #000000;
    background-color: #5483c0;
    border: 1px solid #5483c0;
    border-radius: 2.5em;
    padding: 0.5em 1em;
    font-size: 1.5em;
    text-decoration: none;
    display: inline-block;
    margin: 0.5em;
}
.home-button:hover {
    background-color: #3e6aa0;
    transition: 0.5s;
    border-radius: 0.5em;
}
.showing {
    display: block;
    margin-top: 150px;
}
</style>