// All hold a sprite sheet - should be a number sheet 0-9
var livesFont1 : GameObject;
var coinFont1 : GameObject;
var coinFont2 : GameObject;
var coinFont3 : GameObject;


private var index : int = 0;
private var coin : int = 0;


function aniSprite ( spriteObject, columnSize, rowSize, colFrameStart, rowFrameStart, totalFrames, type:String, index:int)
{
    // Coin fonts.
	var font1 = (index % 10 );
	var font2 = ((index - font1) / 10) % 10;
	var font3 = ((index - font1) / 100) % 10;
    // Lives font.
	var font4 = (index % 10);

	if ( type == "font1" ) index = font1;				// check for which sprite sheet to use - font1
	if ( type == "font2" ) index = font2;				// check for which sprite sheet to use - font2
	if ( type == "font3" ) index = font3;				// check for which sprite sheet to use - font3
	if ( type == "font4" ) index = font4;				// check for which sprite sheet to use - font3
	
	var size = Vector2 ( 1.0 / columnSize, 1.0 / rowSize );	// find scale to show on poly 

	var u = index % columnSize;								// u cord separated from v, to find just the column and mod it
	var v = index / columnSize;								// v finds location on row based on columnSize count
	
	var offset = Vector2 ( ( u + colFrameStart ) * size.x, ( 1.0 - size.y ) - ( v + rowFrameStart ) * size.y );	// offset uv's
	
	spriteObject.renderer.material.mainTextureOffset = offset; 	// apply the offset amount to the correct sprite sheet object
	spriteObject.renderer.material.mainTextureScale  = size; 	// apply the scale amount to the correct sprite sheet object
}


function Update()
{
    var playerObject = GameObject.Find("player");
    var lives = playerObject.GetComponent(playerProperties).lives;

	// Animated font sprite.
	if (coinFont1 != null) aniSprite ( coinFont1, 10, 1, 0, 0, 10, "font1", coin);
	if (coinFont2 != null) aniSprite ( coinFont2, 10, 1, 0, 0, 10, "font2", coin);
	if (coinFont3 != null) aniSprite ( coinFont3, 10, 1, 0, 0, 10, "font3", coin);
	if (livesFont1 != null) aniSprite ( livesFont1, 10, 1, 0, 0, 10, "font4", lives);
}