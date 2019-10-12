export default {
    data(){
        return{
            BusinessLinesSelect:'',
            BusinessLinesList:[],
            alertShow:false,
            alertContent:'',
            alertType:'',
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },

    }

},
    created(){
        let userMsg=JSON.parse(localStorage.getItem("LoginMsg"));
        this.axios.get('/user/powers',{
            params:{
                user:userMsg.user,
            }
        }).then((response)=>{
            let list=response.data.data[0].roles;
            this.BusinessLinesList=list;

        })
    }
}