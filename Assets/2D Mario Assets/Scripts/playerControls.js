var walkSpeed : float = 1.5;
var runSpeed : float = 2.0;
var fallSpeed : float = 2.0;
var walkJump : float = 6.2;
var runJump : float = 9.0;
var crouchJump : float = 10.0;
var gravity : float = 20.0;
var startPos : float = 0.0;
var playerFacingDirection : int = 1;

var soundJump : AudioClip;
var soundCrouchJump : AudioClip;

var particleJump : Transform;


var velocity : Vector3 = Vector3.zero;
private var jumpEnabled : boolean = false;
private var runJumpEnabled : boolean = false;
private var crouchJumpEnabled : boolean = false;
private var afterHitForceDown : float = 1.0;

private var soundRate : float = 0.0;
private var soundDelay : float = 0.0;


function PlaySound(soundName, soundDelay)
{
	if (!audio.isPlaying && Time.time > soundRate)
	{
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();

		yield WaitForSeconds(audio.clip.length);
	}
}


function Update()
{
	var particlePlacement : Vector3 = Vector3(transform.position.x, transform.position.y - 0.5, transform.position.z);
	var aniPlay = GetComponent("aniSprite");

    var controller : CharacterController = GetComponent(CharacterController);

    // Check if the object is on the ground or in the air.
    if (controller.isGrounded)
    {
		jumpEnabled = false;
		runJumpEnabled = false;
		crouchJumpEnabled = false;
		
		startPos = transform.position.y;

        // We are grounded, so recalculate move direction directly from axes.
        velocity = Vector3(Input.GetAxis("Horizontal"), 0, 0);

		// Idle.
		if (velocity.x == 0)
		{
			var idx = playerFacingDirection == 0 ? 1 : 0;
			aniPlay.aniSprite(16, 16, 0, idx, 16, 12);
		}
		// Walking.
		if (velocity.x != 0)
		{
			var idx2 = playerFacingDirection == 0 ? 3 : 2;
			aniPlay.aniSprite(16, 16, 0, idx2, 10, 15);

			velocity *= walkSpeed;
		}
		// Running.
		if (velocity.x != 0 && Input.GetButton("Fire1"))
		{
			var idx4 = playerFacingDirection == 0 ? 5 : 4;
			aniPlay.aniSprite(16, 16, 0, idx4, 16, 24);

			velocity *= runSpeed * walkSpeed;
		}
		// Crouch.
		if (velocity.x == 0 && Input.GetAxis("Vertical") < 0)
		{
			var idx5 = playerFacingDirection == 0 ? 9 : 8;
			aniPlay.aniSprite(16, 16, 0, idx5, 16, 24);
		}
		// WalkJump.
        if (Input.GetButtonDown("Jump")
            && (!Input.GetButton("Fire1") || (Input.GetButton("Fire1") && velocity.x == 0))
            && Input.GetAxis("Vertical") >= 0)
        { 
        	jumpEnabled = true;

			PlaySound(soundJump, 0);
			
			Instantiate(particleJump, particlePlacement, transform.rotation);

        	var idx3 = playerFacingDirection == 0 ? 5 : 4;
			aniPlay.aniSprite(16, 16, 0, idx2, 10, 12);

        	velocity.y = walkJump;
        }
        // RunJump.
        if (Input.GetButtonDown("Jump") && Input.GetButton("Fire1") && velocity.x != 0)
        {
        	runJumpEnabled = true;

			PlaySound(soundJump, 0);

			Instantiate(particleJump, particlePlacement, transform.rotation);

        	velocity.y = runJump;
        }
        // CrouchJump.
        if (Input.GetButton("Jump") && velocity.x == 0 && Input.GetAxis("Vertical") < 0)
        {
        	crouchJumpEnabled = true;

			PlaySound(soundCrouchJump, 0);

			Instantiate(particleJump, particlePlacement, transform.rotation);

        	velocity.y = crouchJump;
        }
    }
    else
    { 
        velocity.x = Input.GetAxis("Horizontal");
        
		// When the jump button is not held anymore, limit the height of the jump.
    	if (Input.GetButtonUp("Jump"))
    	{ 
    		velocity.y = velocity.y - fallSpeed;
    	}
 
 		if (jumpEnabled)
 		{ 
        	var idx6 = playerFacingDirection == 0 ? 3 : 2;
			aniPlay.aniSprite(16, 16, 11, idx6, 4, 12);

   	        velocity.x *= walkSpeed;   	
 		}
 		if (runJumpEnabled)
 		{
        	var idx7 = playerFacingDirection == 0 ? 3 : 2;
			aniPlay.aniSprite(16, 16, 11, idx7, 4, 12);

 			velocity.x *= runSpeed * walkSpeed;
 		}
 		if (crouchJumpEnabled)
 		{ 
        	var idx8 = playerFacingDirection == 0 ? 11 : 10;
			aniPlay.aniSprite(16, 16, 12, idx8, 4, 12);

 			velocity.x *= walkSpeed;
 		}
    }

	if (velocity.x != 0)
	{
    	playerFacingDirection = velocity.x < 0 ? 0 : 1;
	}

    if (controller.collisionFlags == CollisionFlags.Above)
    {
    	velocity.y = -afterHitForceDown;
    }

    // Apply gravity and move the controller.
    velocity.y -= gravity * Time.deltaTime;
    controller.Move(velocity * Time.deltaTime);
}