var startPoint : Transform;
var soundDie : AudioClip;


private var soundRate : float = 0.0;
private var soundDelay : float = 0.0;
private var currentSavePosition : Vector3;


function Update()
{
	
}


function OnTriggerEnter(other : Collider)
{
	if (other.tag == "savePoint")
	{
		currentSavePosition = transform.position;
	}
	if (other.tag == "killbox")
	{
		PlaySound(soundDie, 0);
		transform.position = currentSavePosition;
	}
}


function Start()
{
	if (startPoint != null)
	{
		transform.position = startPoint.position;
	}
}


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