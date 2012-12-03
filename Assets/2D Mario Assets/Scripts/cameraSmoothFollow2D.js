var cameraTarget : GameObject;
var player : GameObject;


var smoothTime : float = 0.1;
var cameraFollowX : boolean = true;
var cameraFollowY : boolean = false;
var cameraFollowHeight : boolean = false;
var cameraHeight : float = 2.5;
var cameraZoom : boolean = false;
var cameraZoomMax : float = 4.0;
var cameraZoomMin : float = 2.6;
var cameraZoomTime : float = 0.03;
var velocity : Vector2;

private var currentPosition : float = 0.0;
private var playerJumpHeight : float = 0.0;


function Update()
{
	if (cameraFollowX)
	{
		transform.position.x = Mathf.SmoothDamp(transform.position.x, cameraTarget.transform.position.x, velocity.x, smoothTime);
	}
	if (cameraFollowY)
	{
		transform.position.y = Mathf.SmoothDamp(transform.position.y, cameraTarget.transform.position.y, velocity.y, smoothTime);
	}
	if (cameraFollowHeight && !cameraFollowY)
	{
		camera.transform.position.y = cameraHeight;
	}

	var playerController = player.GetComponent(playerControls);
	if (cameraZoom)
	{
		currentPosition = player.transform.position.y;
		playerJumpHeight = currentPosition - playerController.startPos;

		// Keep jump height in range.
		playerJumpHeight = Mathf.Abs(playerJumpHeight);
		playerJumpHeight = Mathf.Min(playerJumpHeight, cameraZoomMax);
		
		camera.orthographicSize = Mathf.Lerp(camera.orthographicSize, playerJumpHeight + cameraZoomMin, Time.time * cameraZoomTime);
	}
}