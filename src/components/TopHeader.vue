<template>
    <transition name="fade">
        <div class="navbar">
            <a href="/" style="float: right;">Log Out</a>
            <img src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/null/external-resume-human-resources-itim2101-lineal-color-itim2101.png" alt="logo" style="margin-bottom: -5px;">
            <a href="/home" style="float: left;">Home</a>
            
        </div>
    </transition>
</template>

<script>
export default {
    name: 'TopHeader',
    data() {
        return {
            firstName: ''
        }
    },
    methods: {
        
    },
    created() {
    
    }
}
</script>

<style>
.navbar {
    overflow: hidden;
    background-color: #333;
    position: fixed;
    padding: 20px 10px;
    width: 100%;
    height: 53px;
    left: 0%;
    top: 0;
    z-index: 1;
}
.navbar a {
    justify-content: center;
    flex-direction: column;
    
    float: right;
    margin-right: 20px;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    border-radius: 20px;
}
.navbar a:hover {
    background: #ddd;
    border-radius: 20px;
    color: black;
    transition: 0.3s;
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .5s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}

</style>