import axios from 'axios'
//根据parentId组织树状结构
export let navtree=function (params) {
    let navList=[];
    for(let item of params.data){
        if(item.parentId==params.parentId){
            let navItem={};
            if(item.hasOwnProperty('path')){
                if(params.path){
                    navItem.id=item.id;
                    navItem.name=item.name;
                    navItem.parentId=item.parentId;
                    navItem.path=item.path;
                    navList.push(navItem)
                }else {
                    navItem.id=item.id;
                    navItem.name=item.name;
                    navItem.path='false';
                    navItem.parentId=item.parentId;
                    navList.push(navItem)

                }

            }else {
                let paramsChild={
                    data:params.data,
                    parentId:item.id,
                    path:params.path
                };
                navItem.id=item.id;
                navItem.name=item.name;
                navItem.parentId=item.parentId;
                navItem.children=navtree(paramsChild);
                navList.push(navItem)
            }

        }
    }
    return navList
};

export let addnavTree=function (list,parentId) {
    let navList=[];
    for(let item of list){
        if(item.parentId==parentId){
            let navItem={};
            if(item.hasOwnProperty('path')){
                navItem.id=item.id;
                navItem.title=item.name;
                navItem.parentId=item.parentId;
                navItem.path=item.path;
                navItem.expand=true;
                navList.push(navItem)
            }else {
                navItem.id=item.id;
                navItem.title=item.name;
                navItem.parentId=item.parentId;
                navItem.expand=true;
                navItem.children=addnavTree(list,item.id);
                navList.push(navItem)
            }

        }
    }
    return navList
};
//添加已有权限
export let addchecked=function (Allnav,list) {
         for(let item of Allnav){
             if(item.hasOwnProperty('children')){
                 addchecked(item.children,list)
             }else {
                for(let key of list) {
                    if(key==item.id){
                        item['checked']=true;
                    }
                }
             }
         }
};
//给树状组建加头部
   export function addRender(navList) {
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
                            {
                            type: 'default',
                            size: 'small',
                        },
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
}
//获取每个业务线目录(带权限验证)
export function getnav(user,line) {
    let param={
        user:user,
        line:line,
    };
    return new Promise((res)=>{
        axios.get('/nav/getnav',{
            params:param
        }).then((response)=>{
            res(response.data.data)
        })
    });

}

export function getAllnav(line) {
    return new Promise((res)=>{
        axios.get('/nav/getAllnav',{
            params:{
                line:line
            }
        }).then((response)=>{
            res(response.data.data)
        })
    });

}

