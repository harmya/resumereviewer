<template>
    <div>
    <h1> 
        Here is the result of your resume:
    </h1>
    </div>
    <router-view></router-view>
</template>

<script>
export default {
    name: 'ResResult',
    data() {
        return {
            show: true,
            data: ' '
        }
    },
    mounted() {
        this.show = true
        console.log("Mounted")
    },
    created() {
        console.log("Created")
        this.show = true
        this.data = this.$route.params.data
        console.log(this.data)
    }
}
</script>

<style>
.h1 {
    font-size: 30px;
    font-weight: 500;
    color: #000000;
    margin: 0;
    padding: 0;
    text-align: center;
}
</style>