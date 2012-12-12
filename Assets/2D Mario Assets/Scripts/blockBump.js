enum EBlockType
{
	BlockBounce,
	BlockCoin,
	BlockBreakable,
	BlockSolid,
	BlockQuestion
}


// Crap another Pickup (with small u) allready exists...
enum EPickUpType
{
	MushroomGrow,
	MushroomLife,
	FireFlower
}


enum EBreakType
{
	Geometry,
	Particles
}


var BlockState : EBlockType;
var BlockStateAfter : EBlockType;
var PickupState : EPickUpType;
var BreakState : EBreakType;


var BlockCoinAmount : int = 3;
var BlockQuestionScrollSpeed : float = 0.5;


var MaterialBlock1 : Material;
var MaterialBlock2 : Material;
var MaterialBlock3 : Material;
var MaterialBlock4 : Material;

var PickupCoin : Transform;
var PickupMushroomGrow : Transform;
var PickupMushroomLife : Transform;
var PickupFireFlower : Transform;
var BreakableGeometry : Transform;
var BreakableParticles : Transform;


var SoundBump : AudioClip;
var SoundPickup : AudioClip;


private var BreakablePos : Vector3;
private var PickupPos : Vector3;
private var CoinPos : Vector3;
private var BlockAnimation : boolean = false;
private var CoinMove : boolean = false;
private var BlockCoinAmountReset : int;


function Start()
{

}


function Update()
{
	switch (BlockState)
	{
		case EBlockType.BlockBounce:
			renderer.material = MaterialBlock1;
			if (BlockAnimation)
			{
				animation.Play("blockBounce");
				BlockAnimation = false;
				audio.Play();
			}
			
			break;
	}
}


function OnTriggerEnter(other : Collider)
{
	if (other.tag == "collisionBoxHead")
	{
		BlockAnimation = true;
	}
}