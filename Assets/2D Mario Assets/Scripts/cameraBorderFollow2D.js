var cameraTarget : GameObject;
var player : GameObject;


var cameraHeight : float = 0.0;
var smoothTime : float = 0.2;
var borderX : float = 2.0;
var borderY : float = 2.0;


private var velocity : Vector2;
private var moveScreenRight : boolean = false;
private var moveScreenLeft : boolean = false;


function Start()
{
	cameraHeight = camera.transform.position.y;
}


function Update()
{
	var moveDir = player.GetComponent(playerControls);
	
	if (cameraTarget.transform.position.x > camera.transform.position.x + borderX && moveDir.playerFacingDirection == 1)
	{
		moveScreenRight = true;
	}
	if (moveScreenRight)
	{
		camera.transform.position.x = Mathf.SmoothDamp(camera.transform.position.x, camera.transform.position.x + borderX, velocity.x, smoothTime);
	}
	if (cameraTarget.transform.position.x < camera.transform.position.x - borderX)
	{
		moveScreenRight = false;
	}

	if (cameraTarget.transform.position.x < camera.transform.position.x - borderX && moveDir.playerFacingDirection == 0)
	{
		moveScreenLeft = true;
	}
	if (moveScreenLeft)
	{
		camera.transform.position.x = Mathf.SmoothDamp(camera.transform.position.x, camera.transform.position.x - borderX, velocity.x, smoothTime);
	}
	if (cameraTarget.transform.position.x > camera.transform.position.x + borderX)
	{
		moveScreenLeft = false;
	}
	
	camera.transform.position.y = cameraHeight;
}