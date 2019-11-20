<template>
        <div>
            <Submenu  v-for="item in navList" :name="item.id" :key="item.id" v-if="!item.hasOwnProperty('path')">
                <template slot="title">
                    <Icon type="ios-paper" />
                    {{item.name}}
                </template>
                <bi-navslider :navList="item.children" @onSelect="pageChange" ></bi-navslider>
            </Submenu>
            <MenuItem :name="item.id"  :to="item.path"  :key="item.id"  v-else-if="item.path!='false'" @click.native="pageChange(item)">{{item.name}}</MenuItem>
            <MenuItem :name="item.id"   :key="item.id"  v-else @click.native="pageChange(item)">{{item.name}}</MenuItem>

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

                return this.navList
            }
        },
        methods:{
            pageChange(item){
               this.$emit('onSelect',item)
            }
        },
        created(){

        }
    }
</script>

<style scoped>

</style>