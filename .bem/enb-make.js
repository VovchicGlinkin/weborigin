/* ВНИМАНИЕ !! 
Перед сборкой установить node (в п.п.1) и цели (nodeConfig.addTargets) в соответствие с вашими целями*/
module.exports = function(config) {
	// 1. Добавление набора нод в сборку и конфигурирование. 
	// Так объявляется одна нода: config.nodes('pages/page1', ..
      config.nodes('pages/*', function(nodeConfig) {	
				//		if (nodeConfig.getPath() === 'pages/common') {}
	// 2.Установка зависимостей.Зарегистрируем технологии, которые могут предоставить таргеты. 	// 4. Зарегистрируем технологии.
        nodeConfig.addTechs([
	//собирает информацию об уровнях переопределения проекта. Участвует в сборке целей	
        [ require('enb/techs/levels'), { levels: getLevels(config) } ], // Базовая технология.
	//	[require('enb-xjst/techs/bemhtml.js'),{target:'?.bemhtml.js'}], Закомментировано мной 
// т.к. файл bemhtml.js не использую.
		 [require('enb-xjst/techs/html-from-bemjson'),{target: '?.html', bemjsonFile:'?.bemjson.js', bemhtmlFile: 'source.bemhtml.js' }],	
	/*сообщает make-платформе, что таргет (переданный в опции target) уже готов. Отдельная сборка для него не требуется. Таргет '?.bemjson.js' лежит в репозитории*/	  		  
		[ require('enb/techs/file-provider'), { target:'?.bemjson.js'} ],
		[ require('enb/techs/file-provider'), { target: 'source.bemhtml.js'} ],
		require('enb/techs/bemdecl-from-bemjson'),
     //  Регистрируем технологии, необходимые для сборки js и css. 
    //собирает ?.deps.js (output.deps.js) на основе output.bemdecl.js и .levels. 
		  require('enb/techs/deps-old'),
	//собирает полный список файлов со всех уровней переопределения в том порядке, в котором они идут в финальном output.deps.js. Результат этой технологии может использоваться, например, в технологии enb/techs/js.	  
		  require('enb/techs/files'), // Базовая технология.
		  require('enb/techs/js'),
	//Теперь могут собираться файлы index.js и index.css.Но мы регистрировали иные таргеты: _?.js  и _?.css... в последствии они убраны с регистрации
          require('enb/techs/css')/*,
		  require('enb/techs/css-includes')*/ 
	  ]);
	//... для их сборки воспользуемся технологией enb/techs/file-copy. Pегистрируем только '_?.css' таргет. 	
 nodeConfig.mode('development', function(nodeConfig) {
      nodeConfig.addTechs([
        [ require('enb/techs/file-copy'), { sourceTarget: '?.js', destTarget: '_?.js' } ],
        [ require('enb/techs/file-copy'), { sourceTarget: '?.css', destTarget: '_?.css' } ]
      ]);
    });
	//Теперь для production-режима конечные файлы обрабатываются Борщиком. 
/* nodeConfig.mode('production', function(nodeConfig) {
      nodeConfig.addTechs([
        [ require('enb/techs/borschik'), { sourceTarget: '?.js', destTarget: '_?.js', minify: true } ],
        [ require('enb/techs/borschik'), { sourceTarget: '?.css', destTarget: '_?.css', minify: true } ]
      ]);
    });*/
	 // 3. Объявим Targets
    nodeConfig.addTargets([/*'?.js',*/ /*'?.css',*//*'_?.js',*/ /*'?.bemhtml.js',*/ '?.html'/*,'?.dirs' Закомментировано мной */]);
	 /* Подключение модуля fs, динамическое создание директории pages/common, если её нет */
/*	 var fs = require('fs'); 
	 if(!fs.existsSync('pages/common')) {
		 fs.mkdirSync('pages/common');
	}*/
	/*Если много страниц и постоянно добавляются новые, то лучше обрабатывать динамически*/
	/*if(nodeConfig.getPath()==='touch.bundles/')...*/
  });			//**								

  };
	//. Функция указывает куда заглянуть при сборке
  function getLevels(config) {
      return [
        /*{path: 'libs/bem-bl/blocks-desktop', check: false},*/ /* Подкдючение библиотеки bem-bl Без этого указания css правила для модификации блока не появятся в общем файле css.*/
		 // {path: 'libs/bem-bl/blocks-common', check: false}, //Для подключения i-bem__dom_init_auto.js
       //{ path: 'desktop.blocks', check: true },  Уровни проекта нужно сканировать перед каждой сборкой.
		 /* Вместо строки с уровнем может использоваться объект вида {path: '/home/user/www/proj/lego/blocks-desktop', check: false} для того, чтобы закэшировать содержимое тех уровней переопределения, которые не модифицируются в рамках проекта*/
		 {path:'desktop.blocks', check: true},
	 	{path: 'desktop.bundles', check: true}
		
// Резолвинг путей от корня проекта.     	 
      ].map(function(levelPath) { return config.resolvePath(levelPath); }); 
  }
