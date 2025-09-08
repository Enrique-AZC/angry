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

        // Preload de todos los recursos y lanzar escena solo cuando estén cargados
        cc.Loader.getInstance().preload(g_resources, function() {
            // Aquí todas las texturas están listas
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
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
