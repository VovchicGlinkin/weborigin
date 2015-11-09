var PATH = require('path'),
    environ = require('bem-environ'),
    getTechResolver = environ.getTechResolver,

    BEMBL_TECHS = environ.getLibPath('bem-bl', 'blocks-common/i-bem/bem/techs/v2');
/*Подключается уровень переопределения блоков blocks, а так же blocks-common из bem-bl.*/
exports.baseLevelPath = require.resolve('./blocks');
//Думаю, что верхняя строчка заменяет метод exports.getConfig
exports.getTechs = function() { // Возвращает массив технологий используемый на уровне
    var techs = this.__base();// Базовый метод возвращает массив технологий по умолчанию.

    // Использовать технологии из bem-core. Указывается имя технологии и где взять.
    ['js+bemhtml', 'html'].forEach(getTechResolver(techs, BEMBL_TECHS));

    return techs;
};

// Create bundles in bemjson.js tech
exports.defaultTechs = ['bemjson.js'];
