requirejs.config({
    baseUrl: '/public/assets', //设置模块加载的基准路径
    paths: { // 给模块路径起一个别名
        jquery: 'jquery/jquery.min',
        bootstrap: 'bootstrap/js/bootstrap.min',
        template: 'artTemplate/template-web',
        cookie: 'jquery-cookie/jquery.cookie',
        common: '../js/common',
        util: '../js/util',
        // echarts:'echarts/echarts.min',
        login: '../js/login',
        index:'../js/index',
        teacher: '../js/teacher',
        teacher_add: '../js/teacher_add'
    },
    shim: { // 兼容非标准模块
        bootstrap: {
            deps: ['jquery']
        }
    }
});