import axios from 'axios'
//根据parentId组织树状结构
  export let navtree=function (list,parentId) {
      let navList=[];
      for(let item of list){
          if(item.parentId==parentId){
              let navItem={};
              if(item.hasOwnProperty('path')){
                  navItem.id=item.id;
                  navItem.name=item.name;
                  navItem.parentId=item.parentId;
                  navItem.path=item.path;
                  navList.push(navItem)
              }else {
                  navItem.id=item.id;
                  navItem.name=item.name;
                  navItem.parentId=item.parentId;
                  navItem.children=navtree(list,item.id);
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
//获取每个业务线目录
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

