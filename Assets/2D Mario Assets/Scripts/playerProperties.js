enum EPlayerState
{
	MarioDead = 0,
	MarioSmall = 1,
	MarioLarge = 2,
	MarioFire = 3
}


var playerState = EPlayerState.MarioSmall;


var lives : int = 3;
var keys : int = 0;
var coins : int = 0;
var projectileFire : GameObject;
var projectileSocketLeft : Transform;
var projectileSocketRight : Transform;
var materialStandardMario : Material;
var materialFireMario : Material;


var changeMario : boolean = false;
var hasFire : boolean = false;

private var coinLife : int = 20;
private var canShoot : boolean = false;

function Update ()
{
	var playerControls = GetComponent("playerControls");

	if (changeMario)
	{
		SetPlayerState();
	}

	if (canShoot)
	{
		var clone;
		
		if (Input.GetButtonDown("Fire1") && projectileFire)
		{
			var socket = playerControls.playerFacingDirection == 0 ? projectileSocketLeft : projectileSocketRight;
			var sign = playerControls.playerFacingDirection == 0 ? -1 : 1;
			clone = Instantiate(projectileFire, socket.transform.position, transform.rotation);
			clone.rigidbody.AddForce(90 * sign, 0, 0);
		}
	}
}


function AddKey(numKeys : int)
{
	keys += numKeys;
}


function AddCoin(numCoins : int)
{
	coins += numCoins;
}


function SetPlayerState()
{
	var playerControls = GetComponent("playerControls");
	var charController = GetComponent(CharacterController);
	
	switch (playerState)
	{
		case EPlayerState.MarioSmall:
			transform.Translate(0, 0.2, 0);
			transform.localScale = Vector3(1.0, 0.75, 1.0);
			charController.height = 0.45;
			transform.renderer.material = materialStandardMario;
			canShoot = false;
			changeMario = false;
			break;
		case EPlayerState.MarioLarge:
			transform.Translate(0, 0.2, 0);
			transform.localScale = Vector3(1.0, 1.0, 1.0);
			charController.height = 0.5;
			transform.renderer.material = materialStandardMario;
			canShoot = false;
			changeMario = false;
			break;
		case EPlayerState.MarioFire:
			transform.Translate(0, 0.2, 0);
			transform.localScale = Vector3(1.0, 1.0, 1.0);
			charController.height = 0.5;
			transform.renderer.material = materialFireMario;
			canShoot = true;
			changeMario = false;
			break;
		case EPlayerState.MarioDead:
			Destroy(gameObject);
			changeMario = false;
	}
}


@script AddComponentMenu("NGS/Actor/Player Properties Script")