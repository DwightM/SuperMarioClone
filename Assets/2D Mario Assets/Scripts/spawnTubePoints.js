var _PortalDestination : Transform;
var _TimeToPort : float = 2.0;
var _SoundTube : AudioClip;


private var _MoveDown : boolean = false;
private var _MoveUp : boolean = false;

private var _Latch : boolean = true;
private var _Latch2 : boolean = false;


private var _Other : Collider;


function OnTriggerStay(other : Collider)
{
	if (other.tag == "Player" && Input.GetAxis("Vertical") < 0)
	{
		if (_Latch)
		{
			_Latch = false;
			
			var _playerControls = other.GetComponent(playerControls);
			_playerControls.enabled = false;
			var _previousGravity = _playerControls.gravity;
			_playerControls.gravity = 0.0;
			
			_playerControls.PlaySound(_SoundTube, 0);
			
			//transform.parent.renderer.enabled = false;
			//_PortalDestination.parent.renderer.enabled = false;

			// First sink Mario into the pipe.
			var _minDropPositionY = transform.parent.position.y - 0.12;
			while (other.transform.position.y >= _minDropPositionY)
			{
				other.transform.Translate(0, -1 * Time.deltaTime, 0);
				yield WaitForEndOfFrame();
			}
			
			if (_PortalDestination == null)
			{
				_PortalDestination = transform;
			}
			
			// Now hide Mario and move him to the other pipe.
			other.renderer.enabled = false;
			other.transform.position = _PortalDestination.transform.position;
			
			yield WaitForSeconds(_TimeToPort);
			
			other.renderer.enabled = true;
			_playerControls.PlaySound(_SoundTube, 0);
			
			// First sink Mario into the pipe.
			var _maxPushPositionY = transform.parent.position.y + .5;
			while (other.transform.position.y < _maxPushPositionY)
			{
				other.transform.Translate(0, 1 * Time.deltaTime, 0);
				yield WaitForEndOfFrame();
			}
			
			_playerControls.enabled = true;
			_playerControls.gravity = _previousGravity;
			
			_Latch = true;
		}
	}
}


function Update()
{
	if (_Latch2)
	{
		var _yFactor = -1 * Time.deltaTime;
		if (_Other == null)
		{
			print("_Other is null!");
		}
		else
		{
			print("Sinking...");
		}
		_Other.transform.Translate(0, _yFactor, 0);		
	}
}



/*
function OnTriggerStay(other : Collider)
{
	if (other.tag == "Player")
	{
		if (Input.GetAxis("Vertical") < 0)
		{
			var _playerControls = other.GetComponent(playerControls);

			_playerControls.enabled = false;
			_playerControls.gravity = 0.0;

			if (other.transform.position.y >= _PortalDestination.transform.position.y)
			{
				other.transform.Translate(0, -5 * Time.deltaTime, 0);
			}
			
			print("strange shit" + (-5 * Time.deltaTime));

			_playerControls.PlaySound(_SoundTube, 0);

			yield WaitForSeconds(0.2);

			//other.renderer.enabled = false;

			yield WaitForSeconds(_TimeToPort);
			other.transform.position = _PortalDestination.transform.position;
			_PortalDestination.renderer.enabled = false;

			yield WaitForSeconds(1);
			_playerControls.PlaySound(_SoundTube, 0);
			other.renderer.enabled = true;
			
			other.transform.Translate(0, 5 * Time.deltaTime, 0);
			
			_playerControls.enabled = true;
			_playerControls.gravity = 20;
		}
	}
}
*/


/*function OnTriggerStay(other : Collider)
{
	print("first part");
	yield WaitForSeconds(10);
	
	print("second part");
	yield WaitForSeconds(10);
	
	print("third part");
	yield WaitForSeconds(10);
	
	print("fourth part");
}*/

/*
function OnTriggerEnter(other : Collider)
{
	print("first part");
	yield WaitForSeconds(1);
	
	print("second part");
	yield WaitForSeconds(1);
	
	print("third part");
	yield WaitForSeconds(1);
	
	print("fourth part");
}
*/

/*
function OnTriggerStay(other : Collider)
{
	print(Time.time + " before");
	
	yield WaitForSeconds(5);
	
	print(Time.time + "after");
}*/