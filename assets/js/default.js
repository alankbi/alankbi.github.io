var currentButton = 0;
var running = 0;

function loadInfo(num)
{
	if(num != currentButton)
	{
		fadeOut(document.getElementById("aboutme"), num);
		currentButton = num;
	}
}

function fadeIn(element) 
{
	var op = 0.04;
	element.style.display = 'block';
	var timer = setInterval(function () 
	{
		if (op >= 1)
		{
			clearInterval(timer);
		}
		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op += op * 0.1;

	}, 5);
}

function fadeOut(element, num) 
{
	var op = 1;
	var timer = setInterval(function () 
	{
		if (op <= 0.04)
		{
			clearInterval(timer);
			element.style.display = 'none';
			updateText(num);
		}

		element.style.opacity = op;
		element.style.filter = 'alpha(opacity=' + op * 100 + ")";
		op -= op * 0.1;

	}, 5);
}

function updateText(num)
{
	var topic = document.getElementById("aboutmetopic");
	var text = document.getElementById("aboutmetext");

	topic.innerHTML = "";
	switch(num)
	{
		case 0: topic.innerHTML = "H";
				generateTitle("H", "ello.");
				text.innerHTML = "I am a senior at Mercer Island High School. My interests consist of computer science, violin, and table tennis. Click one of the buttons above to learn more about me.";
			break;
		case 1: topic.innerHTML = "E";
				generateTitle("E", "ducation");
				text.innerHTML = "Mercer Island High School - 3.99 GPA (Rank 8/413) <br><br> AP Courses - Computer Science A (5), Calculus AB (5), Calculus BC (5), Physics C: Mechanics (5), Chemistry (5), US History (5), Language (5) <br><br> SAT - 1570 <br> SAT Math 2 - 800 <br> SAT Chemistry - 800";
			break;
		case 2: topic.innerHTML = "T";
				generateTitle("T", "eamsCode");
				text.innerHTML = "<a href=\"https://teamscode.com/\"><u>TeamsCode</u></a> - Co-Founder, Co-President <br><br> TeamsCode is a 501(c)(3) nonprofit organization with the goal to promote interest and activity in computer science among high school students. <br><br> Sponsored by Microsoft TEALS, PSCSTA, Topcoder, and more";
			break;
		case 3: topic.innerHTML = "P";
				generateTitle("P", "rojects");
				text.innerHTML = "<a href=\"https://github.com/alankbi\"><u>GitHub</u></a> <br><br> Check out my GitHub for some of my personal projects. ";
			break;
		case 4: topic.innerHTML = "V";
				generateTitle("V", "olunteer");
				text.innerHTML = "<a href=\"http://spttc.net\"><u>SPTTC</u></a> - After-school coach, Assistant league coordinator <br><br> Help teach elementary and middle school students table tennis skills every week <br><br> Assist in the registration and group creation of weekly club tournmanent";
			break;
		case 5: topic.innerHTML = "A";
				generateTitle("A", "wards");
				text.innerHTML = "2018 PLU Programming Contest - Advanced Division Third Place <br><br> 2017 PLU Programming Contest - Novice Division First Place <br><br> 2017 WMEA All-State Symphonic Orchestra - Violinist";
			break;
	}

	fadeIn(document.getElementById("aboutme"));
}

function generateTitle(firstChar, title)
{
	var temp = 0;
	running++;
	var thisRun = running;

	var index = 0;
	var timer = setInterval(function () 
	{
		temp++;
		if(running > 1 && thisRun < running)
		{
			clearInterval(timer);
			running--;
		}
		else if (index >= title.length)
		{
			clearInterval(timer);
			running--;
			document.getElementById("aboutmetopic").innerHTML = firstChar + title;
		}
		else if(temp % 3 == 0)
		{
			document.getElementById("aboutmetopic").innerHTML += title.charAt(index++);
		}

	}, 250 / title.length);
}