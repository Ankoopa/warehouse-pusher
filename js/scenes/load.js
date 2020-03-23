class Loader extends Phaser.Scene{
    constructor(){
        super('load');
    }

    preload(){
        this.load.atlas('char', 'assets/sprites/char.png', 'assets/anims/char-anims.json');
        this.load.spritesheet('tileset', 'assets/tileset/tileset.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('crate', 'assets/sprites/crate.png');

        this.load.audio('chime', 'assets/audio/chime.ogg');
        this.load.audio('comp', 'assets/audio/placed.ogg');
    }

    create(){
        chime = this.sound.add('chime', {volume: 0.5});
        compSfx = this.sound.add('comp');

        this.anims.create({
            key: 'front-walk',
            frames: this.anims.generateFrameNames('char', {prefix: 'f-walk', start: 0, end: 3, zeroPad: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'back-walk',
            frames: this.anims.generateFrameNames('char', {prefix: 'b-walk', start: 0, end: 3, zeroPad: 1}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('char', {prefix: 's-walk', start: 0, end: 2, zeroPad: 1}),
            frameRate: 10,
            repeat: -1
        });
    }

    update(){
        this.scene.start('mainMenu');
    }
}