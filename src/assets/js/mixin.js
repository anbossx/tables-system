export default {
    data(){
        return{
            alertShow:false,
            alertContent:'',
            alertType:'',
            styles: {
                height: 'calc(100% - 55px)',
                overflow: 'auto',
                paddingBottom: '53px',
                position: 'static'
            },
            buttonProps: {
                type: 'default',
                size: 'small',
            }

    }

},
    methods:{
           addRender(navList) {
            for(let item of navList){
                item.render= (h, { root, node, data }) => {
                    return h('span', {
                        style: {
                            display: 'inline-block',
                            width: '100%'
                        }
                    }, [
                        h('span',{
                            style:{
                                marginLeft:'-225px'
                            }},[
                            h('Icon', {
                                props: {
                                    type: 'ios-folder-outline'
                                },
                                style: {
                                    marginRight: '8px'
                                }
                            }),
                            h('span', data.title)
                        ]),
                        h('span', {
                            style: {
                                display: 'inline-block',
                                float: 'right',
                                marginRight: '32px'
                            }
                        }, [
                            h('Button', {
                                props: Object.assign({},
                                    this.buttonProps,
                                    {
                                        icon: 'ios-add',
                                        type: 'primary'
                                    }),
                                style: {
                                    width: '64px'
                                },
                                on: {
                                    click: () => { this.append(data) }
                                }
                            })
                        ])
                    ]);
                };
            }
        },
        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span',{
                    style:{
                        marginLeft:'-180px'
                    }},[
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-add'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-remove'
                        }),
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    })
                ])
            ]);
        },

    },
    created(){
        // this.axios.get('/user/powers',{
        //     params:{
        //         user:userMsg.user,
        //     }
        // }).then((response)=>{
        //     let list=response.data.data[0].roles;
        //
        //
        //
        // })
    }
}