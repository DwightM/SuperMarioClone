var mushroomDirection : GameObject;
var mushroomSpeed : float = 1.0;

function Update ()
{
	var moveDirection = mushroomDirection.GetComponent(mushroomCollider).mushroomDirection;
	
	if (moveDirection)
	{
		// right.
		mushroomSpeed = 1;
	}
	else
	{
		mushroomSpeed = -1.0;
	}
	
	transform.Translate(mushroomSpeed * Time.deltaTime, 0, 0);
}