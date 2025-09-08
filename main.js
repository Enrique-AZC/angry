// main.js

// Función para generar array de recursos
function g_resources() {
    var recursos = [];
    var nombres = [
        'bg','platform','bird','enemy','sling1','sling2','sling3',
        'ground','wood1','wood2','dirt','boulder','smoke',
        'menu_refresh','menu_back'
    ];

    for (var i = 0; i < nombres.length; i++) {
        recursos.push({ type: 'image', src: nombres[i] + '.png' });
    }

    return recursos;
}

// Objeto principal del juego
var cocos2dApp = cc.Application.extend({
    config: document.querySelector('#cocos2d-html5')['c'],

    ctor: function(scene) {
        this._super();
        this.startScene = scene;

        // Configuración
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.setup(this.config['tag']);

        // Mostrar loader mientras carga
        cc.Loader.getInstance().onloading = function() {
            cc.LoaderScene.getInstance().draw();
        };

        // Preload de todos los recursos
        var resources = g_resources();
        cc.Loader.getInstance().preload(resources, function() {
            // Todas las texturas ya cargadas
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        }, this);
    },

    applicationDidFinishLaunching: function() {
        var director = cc.Director.getInstance();
        director.setDisplayStats(this.config['showFPS']);
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        // Ejecuta la escena inicial
        director.runWithScene(new this.startScene());

        return true;
    }
});

// Instancia de la app
var myApp = new cocos2dApp(GameScene);
