class Level3 extends Phaser.Scene{
    constructor(){
        super('level3');
    }

    preload(){
        this.load.tilemapTiledJSON('level3', `assets/maps/level3.json`);

        this.load.audio('bgm3', 'assets/audio/bgm3.ogg');
    }

    create(){
        curScene = this.scene;
        phys = this.physics;
        numCrates = 3;
        cratesCompleted = 0;
        crates = [];

        mainCam = this.cameras.main;
        mainCam.x = 250;
        mainCam.y = 250;

        mus = this.sound.add('bgm3');
        mus.play({loop: -1});

        //create map
        let tileMap = this.make.tilemap({ key: 'level3' });
        let tileSet = tileMap.addTilesetImage('tileset');

        //create map layers
        floorLayer = tileMap.createStaticLayer('Floor', tileSet, 0, 0);
        wallLayer = tileMap.createStaticLayer('Walls', tileSet, 0, 0);
        goalLayer = tileMap.createStaticLayer('Goals', tileSet, 0, 0);

        wallLayer.setCollisionByExclusion([-1]);

        //spawn player
        let spawnPoint = tileMap.findObject("Points", obj => obj.name === "SpawnPoint");
        player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "char", "f-walk2");
        player.setCollideWorldBounds(true);
        player.body.bounce.x = 0;
        this.physics.add.collider(player, wallLayer);

        //spawn crates
        crateGroup = this.physics.add.group({dragX:2500, dragY:2500});
        spawnCrates(numCrates, tileMap, crateGroup);

        cursors = this.input.keyboard.createCursorKeys();

        lvlLabel = this.add.text(190, 535, 'Level 3', {
            fontSize: '20px',
            fill: '#ffffff'
        });

        cratesScore = this.add.text(138, 565, 'Crates Placed: 0', {
            fontSize: '20px',
            fill: '#ffffff'
        });

        resetBtn = this.add.text(0, 550, 'Reset', {
            fontSize: '20px',
            fill: '#ffffff'
        });
        resetBtn.setInteractive();
        resetBtn.on('pointerdown', () => {
            mus.stop();
            this.scene.restart();
        })

        nextBtn = this.add.text(400, 550, 'Finish Game', {
            fontSize: '20px',
            fill: '#575757'
        });
        nextBtn.on('pointerdown', () => {
            mus.stop();
            this.scene.start('winScreen');
        })
    }

    update(){
        playerController(player, cursors);
        phys.world.collide(player, crateGroup);
        phys.world.collide(crateGroup, [crates]);

        crates.forEach(function check(item, idx){
            if(!item.isplaced){
                if((item.body.position.x <= item.winSpot.x + 5 && item.body.position.x >= item.winSpot.x -5) &&
                (item.body.position.y <= item.winSpot.y + 5 && item.body.position.y >= item.winSpot.y -5)){
                    compSfx.play();
                    item.isplaced = true;
                    item.setImmovable();
                    console.log('placed');
                    cratesCompleted++;
                    cratesScore.setText("Crates Placed: " + cratesCompleted);
                    if(cratesCompleted === numCrates){
                        chime.play();
                        nextBtn.setStyle({fill: '#ffffff'});
                        nextBtn.setInteractive();
                    }
                }
            }
        });
    }
}