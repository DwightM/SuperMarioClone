var moveSpeed : float = 1.0;
var bounceHeight : float = 0.25;
var lifeSpan : float = 2.0;
var hitPosition : float = 0.0;
var bounceUp : boolean = false;
var heightDifference : float = 0.0;


function Start()
{
}


function Update()
{
	if (bounceUp)
	{
		transform.Translate(moveSpeed * Time.deltaTime, 0.75 * Time.deltaTime, 0);
		heightDifference = transform.position.y - hitPosition;
		if (bounceHeight <= heightDifference)
		{
			bounceUp = false;
		}
	}
	else
	{
		transform.Translate(moveSpeed * Time.deltaTime, -1.0 * Time.deltaTime, 0);
	}

	//var ySpeedFactor = bounceUp ? 0.75 : -1.0;
	//transform.Translate(moveSpeed * Time.deltaTime, ySpeedFactor * Time.deltaTime, 0);
}


function OnTriggerEnter(other : Collider)
{
	print(other.transform.tag);
	if (other.transform.tag == "Untagged")
	{
		bounceUp = true;
		hitPosition = transform.position.y;
	}
}


function KillFireball()
{
}