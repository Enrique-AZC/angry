var cocos2dApp = cc.Application.extend({
    config: document.querySelector('#cocos2d-html5')['c'],

    ctor: function(scene) {
        this._super();
        this.startScene = scene;

        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.setup(this.config['tag']);

        // Mostrar loader mientras carga
        cc.Loader.getInstance().onloading = function() {
            cc.LoaderScene.getInstance().draw();
        };

        // Preload de todos los recursos
        var resources = g_resources; // asegurarse de que g_resources() devuelve array
        cc.Loader.getInstance().preload(resources, function() {
            // Todas las texturas cargadas

            // "Sleep seguro" de 500 ms antes de iniciar la escena
            setTimeout(function() {
                cc.AppController.shareAppController().didFinishLaunchingWithOptions();
            }, 50); // ajusta tiempo si quieres
        }, this);
    },

    applicationDidFinishLaunching: function() {
        var director = cc.Director.getInstance();
        director.setDisplayStats(this.config['showFPS']);
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        // Ejecutar la escena inicial
        director.runWithScene(new this.startScene());

        return true;
    }
});

// Instancia de la app
var myApp = new cocos2dApp(GameScene);
