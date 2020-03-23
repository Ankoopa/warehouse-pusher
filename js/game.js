let config = {
    type: Phaser.AUTO,
      width: 1000,
      height: 1000,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: {y: 0},
              debug: true
          }
      },
    scene: [Loader, MainMenu, Level1, Level2, Level3, WinScreen]
}

let game = new Phaser.Game(config);
let mainCam;
let phys;

let floorLayer, wallLayer, goalLayer;
let gameLogo, winLogo, playBtn, backBtn;

let player;
let cursors;
let curScene;
let lvlLabel;
let mus, chime, compSfx;

let crateGroup;
let cratesScore, numCrates, cratesCompleted;
let crates = [];

let resetBtn, nextBtn;

const speed = 150;

function spawnCrates(amt, map, grp){
    for(let i=0;i<amt;i++){
        let crateLabel = "Crate" + (i+1);
        let crateSpawn = map.findObject("CrateSpawns", obj => obj.name === crateLabel);
        this.crate = phys.add.sprite(crateSpawn.x, crateSpawn.y, 'crate');
        this.crate.body.drag.setTo(2500);
        this.crate.body.bounce.x = 0;
        this.crate.body.setSize(this.crate.width-2, this.crate.height-2)
        this.crate.winSpot = map.findObject("WinSpots", obj => obj.name === crateLabel);
        this.crate.isplaced = false;
        phys.add.collider(this.crate, player);
        phys.add.collider(this.crate, wallLayer);
        grp.add(this.crate);
        crates.push(this.crate)
        phys.add.collider(this.crate, grp);
    }
}

function playerController(plr, cursor){
    const prevVelocity = plr.body.velocity.clone();

    plr.body.setVelocity(0);

    //the controls allow the player to move on both the x and y axes
    if (cursor.up.isDown) {
        plr.body.setVelocityY(-speed);
    }
    else if (cursor.down.isDown) {
        plr.body.setVelocityY(speed);
    }

    if (cursor.left.isDown)
    {
      plr.body.setVelocityX(-speed);
    }
    else if (cursor.right.isDown)
    {
      plr.body.setVelocityX(speed);
    }

    //anims
    if (cursor.left.isDown) {
        plr.anims.play("walk", true);
        plr.flipX = false; // use the original sprite looking to the right
    } else if (cursor.right.isDown) {
        plr.anims.play("walk", true);
        plr.flipX = true; // flip the sprite to the left
    } else if (cursor.up.isDown) {
        plr.anims.play("back-walk", true);
    } else if (cursor.down.isDown) {
        plr.anims.play("front-walk", true);
    } else {
        plr.anims.stop();

        if (prevVelocity.x < 0) plr.setTexture("char", "s-walk2");
        else if (prevVelocity.x > 0) plr.setTexture("char", "s-walk2");
        else if (prevVelocity.y < 0) plr.setTexture("char", "b-walk2");
        else if (prevVelocity.y > 0) plr.setTexture("char", "f-walk2");
    }

    plr.body.velocity.normalize().scale(speed);
}