var PATH = require('path'),
    environ = require('bem-environ'),
    getTechResolver = environ.getTechResolver,

    PRJ_ROOT = environ.PRJ_ROOT,
    PRJ_TECHS = PATH.resolve(PRJ_ROOT, '.bem/techs'),
    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs/v2');

exports.getTechs = function() {
    var techs = {
        'css'           : 'v2/css',
        //'ie.css'        : 'v2/ie.css', //Все задокумментированное мной.
       // 'ie6.css'       : 'v2/ie6.css',
       // 'ie7.css'       : 'v2/ie7.css',
       // 'ie8.css'       : 'v2/ie8.css',
       // 'ie9.css'       : 'v2/ie9.css',
        'js'            : 'v2/js-i',
        'bemdecl.js'    : 'v2/bemdecl.js',
        'deps.js'       : 'v2/deps.js'
    };

    // использовать технологии из проекта (.bem/techs)
    ['bemjson.js'].forEach(getTechResolver(techs, PRJ_TECHS));

    // использовать технологии из bem-bl библиотеки.
    ['bemhtml'].forEach(getTechResolver(techs, BEMBL_TECHS));

    return techs;
};

exports.defaultTechs = ['css', 'js', 'bemhtml'];
