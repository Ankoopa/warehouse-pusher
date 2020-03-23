class WinScreen extends Phaser.Scene{
    constructor(){
        super('winScreen');
    }

    preload(){
        this.load.tilemapTiledJSON('menu', `assets/maps/menu-screen.json`);
        this.load.image('backBtn', 'assets/ui/back.png');
        this.load.image('winLogo', 'assets/ui/win.png');

        this.load.audio('bgm-win', 'assets/audio/win.ogg');
    }

    create(){
        mainCam = this.cameras.main;
        mainCam.x = 250;
        mainCam.y = 250;

        mus = this.sound.add('bgm-win');
        mus.play({loop: -1});

        let tileMap = this.make.tilemap({ key: 'menu' });
        let tileSet = tileMap.addTilesetImage('tileset');

        //create map layers
        let layer1 = tileMap.createStaticLayer('Layer1', tileSet, 0, 0);
        let layer2 = tileMap.createStaticLayer('Layer2', tileSet, 0, 0);

        winLogo = this.add.image(250, 175, 'winLogo', 0);
        winLogo.setScale(0.8, 0.8);

        backBtn = this.add.image(250, 400, 'backBtn', 0);
        backBtn.setScale(0.75, 0.75);
        backBtn.setInteractive();
        backBtn.on('pointerdown', () => {
            mus.stop();
            this.scene.start("mainMenu");
        });
    }
}