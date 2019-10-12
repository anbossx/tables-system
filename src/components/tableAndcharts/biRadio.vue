<template>
    <RadioGroup v-model="radioSelect" type="button" size="small" @on-change="dataChange">
        <Radio v-for="item in radioData" :label="item.id" :key="item.id">{{item.label}}</Radio>
    </RadioGroup>
</template>

<script>
    export default {
        name: "biRadio",
        props:['options','selectData'],
        model:{
            prop:'selectData',
            event:'modelChange',
        },
        data(){
            return{
               radioData:this.options,
               radioSelect:this.selectData,
            }
        },
        watch:{
            'options':function (newData) {
                this.radioData=newData;
               this.radioSelect=this.selectData
            }
        },
        methods:{
            dataChange(data){
                this.$emit('modelChange',data)

            }
        },
        // created(){
        //     console.log(this.options)
        // }
    }
</script>

<style scoped>

</style>
