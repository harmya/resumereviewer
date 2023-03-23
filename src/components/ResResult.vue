<template>
    <TopHeader />
    <transition name="fade">
    <div class="showing" v-if="showResults">
    <h1> 
        Here is result for your resume:
    </h1>
    <h1>
        Your resume score is 
        <span :class = "[total_score > 80 ? 'good' : total_score > 50 ? 'work' : 'bad']">
            {{ total_score }}/100
        </span>
        <br>
        <p style="border: 1px solid slategray; padding: 10px; margin-top: 10px; width: 200px; margin-left: 43%;">
            Scale:
            <br>
            <span class="good">80-100</span> - Good
            <br>
            <span class="work">50-79</span> - Work on it
            <br>
            <span class="bad">0-49</span> - Bad
        </p>
    </h1>
    <h1 style="margin-top: 90px;">
        Here are some links to help improve your resume:
    </h1>
    <div class="links" style="margin-top: 10px; text-align: left;" >
        <a class="bro" href="https://www.thebalancecareers.com/how-to-write-a-resume-2063596" target="_blank">How to write a resume</a>
        <br>
        <a class="bro" href="https://www.thebalancecareers.com/resume-writing-tips-2063597" target="_blank">Resume writing tips</a>
        <br>
        <a class="bro" href="https://www.thebalancecareers.com/resume-examples-and-samples-2063598" target="_blank">Resume examples</a>
</div>
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
            await this.sleep(6000);
            this.loading = false;
            console.log("Done");
            this.displayResults();
        },
        async displayResults() {
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
 @import "/Users/harmyabhatt/resumeReviewer/resumereviewer/src/assets/lightsaber.css";
 
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

.bro{

display: block;
 margin: auto;
 padding: 1rem 1.25rem;
 font-family: sans-serif;
 font-size: 1.5rem;
 text-decoration: none;
 color: rgb(19, 19, 19);
 position: relative;
 transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
 z-index: 1;
 width: 300px;
}
.bro:after {
 content: '';
 display: block;
 height: 2px;
 position: absolute;
 bottom: 0;
 right: 1.25rem;
 left: 1.25rem;
 background-color: #b1b1b1;
 transition: all 0.3s cubic-bezier(0.2, 0, 0, 1);
 transform-origin: bottom center;
 z-index: -1;
 border-radius: 2px;
}
.bro:hover {
 color: #2d2d2d;
}
.bro:hover:after {
 right: 0;
 left: 0;
 height: 100%;
}


</style>