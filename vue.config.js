let path = require('path');
module.exports={
    publicPath:'/',
    outputDir:'dist',
    lintOnSave:false,
    assetsDir:'assets',
    css:{
        extract:true,
        loaderOptions:{
            css: {
                // 这里的选项会传递给 css-loader
                importLoaders: 1,
            },
        }
    },
    devServer:{
        open:false,
        host:'localhost',
        port:8086,
        proxy:'http://localhost:3001',
        hot: true,
        overlay: {
            warnings: false,
            errors: false
        },

    },
    chainWebpack: config => {
        config.resolve.alias
            .set('@$', resolve('src'))
            .set('config', resolve('src/config'))
            .set('components', resolve('src/components'))
            .set('assets', resolve('src/assets'))
            .set('css', resolve('src/assets/css'))
            .set('views', resolve('src/views'));
    }
};
function resolve(dir) {
    return path.join(__dirname, dir);
}