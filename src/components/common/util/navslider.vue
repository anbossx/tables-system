<template>
        <div>
            <Submenu  v-for="item in navList" :name="item.id" :key="item.id" v-if="!item.hasOwnProperty('path')">
                <template slot="title">
                    <Icon type="ios-paper" />
                    {{item.name}}
                </template>
                <bi-navslider :navList="item.children"></bi-navslider>
            </Submenu>
            <MenuItem :name="item.id"  :to="item.path"  :key="item.id"  v-else>{{item.name}}</MenuItem>
        </div>
</template>

<script>
    export default {
        props:['navList'],
        data(){
            return{
                theme2: 'light',
            }
        },
        computed:{
            navlist:function () {
                console.log(this.navList);
                return this.navList
            }
        },
        methods:{
            selectChange(name){
                console.log(name);
            }
        },
        created(){

        }
    }
</script>

<style scoped>

</style>