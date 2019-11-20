export default {
    data(){
        return{
          params:{

          }
        }

    },
    methods:{
        conditionDel(){
          console.log(this.barConfig.factorConfig)
        }
    },
    created(){
        this.conditionDel();
    }
}