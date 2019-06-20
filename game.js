// define variables
var game;
var player;
var platforms;
var badges;
var items;
var cursors;
var jumpButton;
var text;
var winningMessage;
var loosingMessage;
var won = false;
var lost = false;
var currentScore = 0;
var winningScore = 100;
var mySound

// add collectable items to the game
function addItems() {
  items = game.add.physicsGroup();
  createItem(100, 100, 'coin');
  createItem(100, 200, 'coin');
  createItem(100, 300, 'coin');
  createItem(100, 400, 'poison');
  createItem(100, 500, 'coin');
  createItem(100, 150, 'coin');
  createItem(100, 250, 'coin');
  createItem(100, 450, 'coin');
  createItem(200, 100, 'coin');
  createItem(200, 200, 'coin');
  createItem(200, 300, 'coin');
  createItem(200, 400, 'coin');
  createItem(200, 500, 'coin');
  createItem(200, 150, 'coin');
  createItem(200, 250, 'poison');
  createItem(200, 350, 'coin');
  createItem(200, 450, 'coin');
  createItem(300, 100, 'coin');
  createItem(300, 200, 'coin');
  createItem(300, 300, 'poison');
  createItem(300, 400, 'coin');
  createItem(300, 500, 'coin');
  createItem(300, 150, 'coin');
  createItem(300, 250, 'coin');
  createItem(300, 350, 'coin');
  createItem(300, 450, 'coin');
  createItem(400, 200, 'coin');
  createItem(400, 300, 'coin');
  createItem(400, 400, 'coin');
  createItem(400, 500, 'coin');
  createItem(400, 150, 'coin');
  createItem(400, 250, 'coin');
  createItem(400, 350, 'coin');
  createItem(400, 450, 'coin');
  createItem(500, 100, 'coin');
  createItem(500, 200, 'coin');
  createItem(500, 300, 'coin');
  createItem(500, 400, 'coin');
  createItem(500, 500, 'coin');
  createItem(500, 150, 'coin');
  createItem(500, 250, 'coin');
  createItem(500, 350, 'coin');
  createItem(500, 450, 'coin');
  createItem(600, 100, 'poison');
  createItem(600, 200, 'coin');
  createItem(600, 300, 'coin');
  createItem(600, 400, 'coin');
  createItem(600, 500, 'coin');
  createItem(600, 150, 'coin');
  createItem(600, 250, 'coin');
  createItem(600, 350, 'coin');
  createItem(600, 450, 'coin');
  createItem(700, 100, 'coin');
  createItem(700, 200, 'coin');
  createItem(700, 300, 'poison');
  createItem(700, 400, 'coin');
  createItem(700, 500, 'coin');
  createItem(700, 150, 'coin');
  createItem(700, 250, 'coin');
  createItem(700, 450, 'coin');

  createItem(400, 100, 'star')
}

// add platforms to the game
function addPlatforms() {
  platforms = game.add.physicsGroup();
  platforms.create(-10, 350, 'platform2')
  platforms.create(650, 350, 'platform2')

  platforms.setAll('body.immovable', true);
}

// create a single animated item and add to screen
function createItem(left, top, image) {
  var item = items.create(left, top, image);
  item.animations.add('spin');
  item.animations.play('spin', 10, true);
}

// create the winning badge and add to screen
function createBadge() {
  badges = game.add.physicsGroup();
  var badge = badges.create(750, 400, 'badge');
  badge.animations.add('spin');
  badge.animations.play('spin', 10, true);
}

// when the player collects an item on the screen
function itemHandler(player, item) {
  item.kill();
  console.log(item.key)
  if (item.key === "coin"){
  // add 1 if item is coin
  currentScore = currentScore + 1;
  }
  if (currentScore === winningScore) {
      createBadge( 400, 350);
  }
  // subtract 20 points if poison
  if (item.key === "poison"){
    currentScore = currentScore - 50;
  }
  // add 20 points if star
  if (item.key === "star"){
    currentScore = currentScore + 50;
  }

}
// when the player collects the badge at the end of the game
function badgeHandler(player, badge) {
  badge.kill();
  won = true;
}

// setup game when the web page loads
window.onload = function () {
  game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
  
  // before the game begins
  function preload() {
    game.stage.backgroundColor = '#5db1ad';
    
    //Load images
    game.load.image('star', 'assets/star.png')
    game.load.image('poison', 'assets/poison.png')
    game.load.image('platform', 'assets/platform_1.png');
    game.load.image('platform2', 'assets/platform_2.png'
    )
    //Load spritesheets
    game.load.spritesheet('player', 'assets/mikethefrog.png', 32, 32);
    game.load.spritesheet('poison', 'assets/poison.png', 32, 32)
    game.load.spritesheet('coin', 'assets/coin.png', 36, 44);
    game.load.spritesheet('badge', 'assets/badge.png', 42, 54);
    game.load.spritesheet('star', 'assets/star.png', 32, 32)
  }

  // initial game set up
  function create() {
    player = game.add.sprite(50, 600, 'player');
    player.animations.add('walk');
    player.anchor.setTo(0.5, 1);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 800;

    addItems();
    addPlatforms();

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    text = game.add.text(16, 16, "SCORE: " + currentScore, { font: "bold 24px Arial", fill: "white" });
    winningMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    winningMessage.anchor.setTo(0.5, 1);
    loosingMessage = game.add.text(game.world.centerX, 275, "", { font: "bold 48px Arial", fill: "white" });
    loosingMessage.anchor.setTo(0.5, 1);

  }

  // while the game is running
  function update() {
    text.text = "SCORE: " + currentScore;
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, itemHandler);
    game.physics.arcade.overlap(player, badges, badgeHandler);
    player.body.velocity.x = 0;

    mySound = new sound("Gangplank Galleon Big Band.mp3");
    mySound.play()


    // is the left cursor key presssed?
    if (cursors.left.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = -300;
      player.scale.x = - 1;
    }
    // is the right cursor key pressed?
    else if (cursors.right.isDown) {
      player.animations.play('walk', 10, true);
      player.body.velocity.x = 300;
      player.scale.x = 1;
    }
    // player doesn't move
    else {
      player.animations.stop();
    }
    
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down)) {
      player.body.velocity.y = -700;
    }
    // when the player wins the game
    if (won) {
      winningMessage.text = "YOU WIN!!!";
      player = game.remove
    }

    // when the player looses the game
    if (currentScore < 0) {
      loosingMessage.text = "LMAO GIT BODIED"
      player = game.remove
    }
  }

  function render() {

  }

};
