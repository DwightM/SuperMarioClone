enum EPickupType
{
	Grow = 0,
	Key = 1,
	Coin = 2,
	Fireball = 3,
	ExtraLife = 4,
	GameTime = 5
}


var pickupType = EPickupType.Grow;
var pickupValue : int = 1;
var itemParticle : Transform;
var soundItemPickup : AudioClip;
var soundDelay : float = 0.0;
var soundRate : float = 0.0;


private var playerGameObject : GameObject;
private var hudGameObject : GameObject;
private var extraLifeEnabled : boolean = false;


function Start()
{
	playerGameObject = GameObject.FindWithTag("Player");
	hudGameObject = GameObject.FindWithTag("hud");
}


function OnTriggerEnter(other : Collider)
{
	if (other.tag == "collisionBoxBody")
	{
		var pProp = playerGameObject.GetComponent(playerProperties);
		ApplyPickup(pProp);
		
		renderer.enabled = false;
		
		if (itemParticle)
		{
			Instantiate(itemParticle, transform.position, transform.rotation);
		}
	}
}


function ApplyPickup(playerStatus : playerProperties)
{
	var hudController = hudGameObject.GetComponent(hudController);

	switch (pickupType)
	{
		case EPickupType.Grow:
			if (playerStatus.playerState != EPlayerState.MarioFire)
			{
				playerStatus.playerState = EPlayerState.MarioLarge;
				playerStatus.changeMario = true;
			}
			
			break;
		case EPickupType.Key:
			playerStatus.AddKeys(pickupValue);

			break;
		case EPickupType.Coin:
			playerStatus.AddCoin(pickupValue);
			hudController.coins += pickupValue;

			break;
		case EPickupType.Fireball:
			playerStatus.playerState = EPlayerState.MarioFire;
			playerStatus.hasFire = true;
			playerStatus.changeMario = true;

			break;
		case EPickupType.ExtraLife:
			extraLifeEnabled = true;

			break;
		case EPickupType.GameTime:
			break;
	}
}


function PlaySound(soundName, soundDelay)
{
	if (!audio.isPlaying && Time.time > soundRate)
	{
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
	}
}

@script AddComponentMenu ("NGS/Interactive/PickupScript")