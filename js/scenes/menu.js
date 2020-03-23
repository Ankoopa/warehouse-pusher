class MainMenu extends Phaser.Scene{
    constructor(){
        super('mainMenu');
    }

    preload(){
        this.load.tilemapTiledJSON('menu', `assets/maps/menu-screen.json`);

        this.load.image('playBtn', 'assets/ui/play.png');
        this.load.image('gameLogo', 'assets/ui/logo.png');

        this.load.audio('bgm-menu', 'assets/audio/menu.ogg');
    }

    create(){
        mainCam = this.cameras.main;
        mainCam.x = 250;
        mainCam.y = 250;

        mus = this.sound.add('bgm-menu');
        mus.play({loop: -1});

        let tileMap = this.make.tilemap({ key: 'menu' });
        let tileSet = tileMap.addTilesetImage('tileset');

        //create map layers
        let layer1 = tileMap.createStaticLayer('Layer1', tileSet, 0, 0);
        let layer2 = tileMap.createStaticLayer('Layer2', tileSet, 0, 0);

        gameLogo = this.add.image(255, 150, 'gameLogo', 0);
        gameLogo.setScale(0.6, 0.6);

        playBtn = this.add.image(250, 400, 'playBtn', 0);
        playBtn.setScale(0.75, 0.75);
        playBtn.setInteractive();
        playBtn.on('pointerdown', () => {
            mus.stop();
            this.scene.start("level1");
        });
    }
}