var BreakableTime : float = 2.5;
var SoundBumpBreak : AudioClip;


function Start()
{
	audio.clip = SoundBumpBreak;
	audio.Play();
}


function Update()
{
	rigidbody.AddForce(Vector3.up * 250);
	BreakableWait();
	rigidbody.AddForce(Vector3.up * -200);
	Destroy(this.gameObject, BreakableTime);
}


function BreakableWait()
{
	yield WaitForSeconds(BreakableTime);
}