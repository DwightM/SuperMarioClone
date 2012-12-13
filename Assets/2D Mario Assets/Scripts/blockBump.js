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
	BreakableGeometry,
	BreakableParticles
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
	CoinPos = Vector3(transform.position.x, transform.position.y, transform.position.z + .2);
	BreakablePos = Vector3(transform.position.x, transform.position.y + .25, transform.position.z - 9);
	PickupPos = Vector3(transform.position.x, transform.position.y + .45, transform.position.z - .1);
	audio.clip = SoundBump;
	BlockCoinAmountReset = BlockCoinAmount;
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

				audio.clip = SoundBump;
				audio.Play();
			}

			break;
		case EBlockType.BlockCoin:
			renderer.material = MaterialBlock1;
			if (BlockAnimation)
			{
				animation.Play("blockBounce");
				BlockAnimation = false;
				
				var _coin = Instantiate(PickupCoin, CoinPos, transform.rotation);
				
				BlockCoinAmount--;
				
				audio.clip = SoundBump;
				audio.Play();
			}
			if (BlockCoinAmount == 0)
			{
				if (BlockStateAfter == EBlockType.BlockCoin)
				{
					BlockStateAfter = EBlockType.BlockBreakable;
				}

				BlockState = BlockStateAfter;
			}

			break;
		case EBlockType.BlockBreakable:
			renderer.material = MaterialBlock1;
			if (BlockAnimation)
			{
				animation.Play("blockBounce");
				BlockAnimation = false;

				if (BreakState == EBreakType.BreakableGeometry)
				{
					Instantiate(BreakableGeometry, BreakablePos, transform.rotation);
				}
				if (BreakState == EBreakType.BreakableParticles)
				{
					Instantiate(BreakableParticles, transform.position, transform.rotation);
				}

				// Delete complete hierarchy.
				Destroy(transform.parent.gameObject);
			}

			break;
		case EBlockType.BlockSolid:
			renderer.material = MaterialBlock2;
			if (BlockAnimation)
			{
				BlockAnimation = false;
			
				audio.clip = SoundBump;
				audio.Play();
			}

			break;
		case EBlockType.BlockQuestion:
			renderer.material = MaterialBlock4;
			if (BlockAnimation)
			{
				animation.Play("blockBounce");
				BlockAnimation = false;

				Instantiate(GetPickupItem(), PickupPos, transform.rotation);

				audio.clip = SoundPickup;
				audio.Play();
				
				BlockState = BlockStateAfter;
			}
			
			var _offset : float = Time.time * BlockQuestionScrollSpeed;
			renderer.material.mainTextureOffset = Vector2(_offset, 0);

			break;
		default:
			break;
	}
}


function GetPickupItem()
{
	switch (PickupState)
	{
		case EPickUpType.MushroomGrow:
			return PickupMushroomGrow;
		case EPickUpType.MushroomLife:
			return PickupMushroomLife;
		case EPickUpType.FireFlower:
			return PickupFireFlower;
		default:
			return null;
	}
}


function OnTriggerEnter(other : Collider)
{
	if (other.tag == "collisionBoxHead")
	{
		BlockAnimation = true;
	}
}