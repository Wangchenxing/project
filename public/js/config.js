requirejs.config({
    baseUrl: '/public/assets', //设置模块加载的基准路径
    paths: { // 给模块路径起一个别名
        jquery: 'jquery/jquery.min',
        bootstrap: 'bootstrap/js/bootstrap.min',
        template: 'artTemplate/template-web',
        validate:'validate/jquery-validate',
        cookie: 'jquery-cookie/jquery.cookie',
        nprogress:'nprogress/nprogress',
        datepicker:'bootstrap-datepicker/js/bootstrap-datepicker.min',
        language:'bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
        common: '../js/common',
        util: '../js/util',
        // echarts:'echarts/echarts.min',
        login: '../js/login',
        index:'../js/index',
        teacher: '../js/teacher',
        teacher_add: '../js/teacher_add',
        settings:'../js/settings'
    },
    shim: { // 兼容非标准模块
        bootstrap: {
            deps: ['jquery']
        },
        datepicker: {
            deps: ['jquery']
        },
        language: {
            deps: ['jquery','datepicker']
        },
        validate:{
            deps:['jquery']
        }
    }
});