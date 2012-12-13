var CoinValue : int = 1;
var CoinParticle : Transform;
var SoundCoinPickup : AudioClip;
private var PlayerGameObject : GameObject;
private var HudGameObject : GameObject;


private var CoinTime : float = 0.2;


function Start()
{
	HudGameObject = GameObject.FindWithTag("hud");
	PlayerGameObject = GameObject.FindWithTag("Player");
	
	audio.clip = SoundCoinPickup;
	audio.Play();
}


function Update ()
{
	var _animationPlay = GetComponent("aniSprite");
	_animationPlay.aniSprite(16, 2, 0, 0, 21, 12);
	
	transform.Translate(0, Time.deltaTime * 5, 0);
	
	KillCoin();
}


function KillCoin()
{
	yield WaitForSeconds(CoinTime);
	Instantiate(CoinParticle, transform.position, transform.rotation);
	AddToCoins();
	Destroy(gameObject);
}


function AddToCoins()
{
	var _hudController = HudGameObject.GetComponent(hudController);
	_hudController.coin += CoinValue;
	
	var _playerProperties = PlayerGameObject.GetComponent(playerProperties);
	_playerProperties.coins += CoinValue;
}