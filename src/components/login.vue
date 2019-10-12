<template>
    <div class="loginPage">
       <div class="loginContain">
       <div style="margin-top: 230px;    display: inline-block;">
           <div>
               <span class="loginText">登陆账号:</span>
               <span><Input  placeholder="请输入登陆账号" style="width: 300px" v-model="user" /> </span>
           </div>
           <div style="margin-top: 30px">
               <span class="loginText">登陆密码:</span>
               <span><Input  placeholder="请输入登陆密码" style="width: 300px" v-model="password" /></span>
           </div>
           <div style="margin-top: 10px">
               <Button type="primary" @click="Logining">登陆</Button>
           </div>
       </div>
       </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                user:'',
                password:'',
                firstUrl:'',
            }
        },
        methods:{
            setStorage(key,value){
                let lastTime = new Date().getTime()+60*60*1000;
                localStorage.setItem(key,JSON.stringify({user:value,lastTime:lastTime}))
            },
            Logining(){
              this.axios.post('/login/webLogin',{
                  user:this.user,
                  password:this.password,
              }).then((response)=>{
                  if(response.data.code==200 && response.data.msg=='登陆成功'){
                      this.setStorage('LoginMsg',this.user);
                      this.$router.push(this.firstUrl);
                  }
              })
            },
            getDaultPath(data){
                for(let key in data){
                    if(Array.isArray(data[key])){
                        return this.getDaultPath(data[key][0])
                    }else {
                        return data[key].path
                    }
                }
            },
        },
         created(){
           this.axios.post('/nav',{
               key:['company']
           }).then((response)=>{
                 let list=response.data.data;
                 let url=this.getDaultPath(list[0].children);
                 this.firstUrl=url;
           })
        }
    }
</script>

<style scoped>
  .loginPage{
      position: fixed;
      background-image: url("../assets/img/bg.jpg");
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
  }
    .loginContain{
         width: 500px;
        height: 700px;
        background-color: rgba(0,0,0,0.7);
        margin-top: 100px;
        margin-left: 150px;

    }
    .loginText{
        color: aliceblue;

    }
</style>