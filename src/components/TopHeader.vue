<template>
    <div class="navbar">
        <a href="/" style="float: left;">Home</a>
        <a href="/login">Logout</a>
    </div>
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
    left: 0%;
    top: 0;
    z-index: 1;
}
.navbar a {
    float: right;
    margin-right: 20px;
    display: block;
    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
}
</style>