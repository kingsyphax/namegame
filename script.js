var rawFemaleNamesEarlier;
var rawMaleNamesEarlier;
var rawFemaleNamesLater;
var rawMaleNamesLater;

var femaleNamesEarlier;
var femaleNamesListEarlier;
var femaleTotalEarlier;
var maleNamesEarlier;
var maleNamesListEarlier;
var maleTotalEarlier;
var femaleNamesLater;
var femaleNamesListLater
var femaleTotalLater
var maleNamesLater;
var maleNamesListLater;
var maleTotalLater;

var firstYearChosen = false;
var secondYearChosen = false;

$(function() {
	$("#whatislink").click(function(e) {
		e.preventDefault();
		
		$("#whatis").slideToggle("slow");
	});

	$("#select1").change(function() {
		if (!firstYearChosen) {
			$("#select1").blur();
			$("#choice1").animate({right: "25%"}, 800, function() {
				var year1 = $("#select1").val() - 0;
				for (var i = 1880; i <= year1; i++)
				{
					$("#select2 > option." + i + "option").remove();//.attr("disabled", "disabled");
				}
				if (year1 > 1881)
				{
					$("#select2 > .defaultoption").after("<option disabled class=\"1880option\">1880</option><option disabled class=\"etcoption\">...</option>");
				}
				else if (year1 == 1881)
					$("#select2 > .defaultoption").after("<option disabled class=\"1880option\">1880</option>");
				
				$("#choice2").fadeIn();
				$("#select2").focus();
			});
		}
	});
	
	$("#select2").change(function() {
		if (!secondYearChosen) {
			$("#select2").blur();
			$("#choice2").animate({left: "25%"}, 800, function() {
				var year1 = $("#select1").val() - 0;
				var year2 = $("#select2").val() - 0;
				
				var distance = year2 - year1;
				
				$("#distancetext").html(distance);
				
				$("#distance").fadeIn("normal", function() {
					$("#continue").fadeIn();
					$("#continuebutton").focus();
				});
			});
		}
	});
	
	$("#continuebutton").click(function() {
		$("#maininner").css({"transform": "translateX(-896px)", "-webkit-transform": "translateX(-896px)", "-moz-transform": "translateX(-896px)", "-ms-transform": "translateX(-896px)"});
		
		var year1 = $("#select1").val() - 0;
		var year2 = $("#select2").val() - 0;
		
		$(".earlieryear").html(year1);
		$(".lateryear").html(year2);
		
		getFemaleNamesEarlier(year1);
		getMaleNamesEarlier(year1);
		getFemaleNamesLater(year2);
		getMaleNamesLater(year2);
		
		setTimeout(function() {
			femaleNamesEarlier = {};
			femaleNamesListEarlier = [];
			femaleTotalEarlier = 0;
			
			for (var i = 0; i < rawFemaleNamesEarlier.length; i += 2)
			{
				var name = rawFemaleNamesEarlier[i];
				var count = rawFemaleNamesEarlier[i+1] - 0;
				
				femaleNamesEarlier[name] = count;
				femaleNamesListEarlier[femaleNamesListEarlier.length] = name;
				
				femaleTotalEarlier += count;
			}
			
			maleNamesEarlier = {};
			maleNamesListEarlier = [];
			maleTotalEarlier = 0;
			
			for (var i = 0; i < rawMaleNamesEarlier.length; i += 2)
			{
				var name = rawMaleNamesEarlier[i];
				var count = rawMaleNamesEarlier[i+1] - 0;
				
				maleNamesEarlier[name] = count;
				maleNamesListEarlier[maleNamesListEarlier.length] = name;
				
				maleTotalEarlier += count;
			}
			
			femaleNamesLater = {};
			femaleNamesListLater = [];
			femaleTotalLater = 0;
			
			for (var i = 0; i < rawFemaleNamesLater.length; i += 2)
			{
				var name = rawFemaleNamesLater[i];
				var count = rawFemaleNamesLater[i+1] - 0;
				
				femaleNamesLater[name] = count;
				femaleNamesListLater[femaleNamesListLater.length] = name;
				
				femaleTotalLater += count;
			}
			
			maleNamesLater = {};
			maleNamesListLater = [];
			maleTotalLater = 0;
			
			for (var i = 0; i < rawMaleNamesLater.length; i += 2)
			{
				var name = rawMaleNamesLater[i];
				var count = rawMaleNamesLater[i+1] - 0;
				
				maleNamesLater[name] = count;
				maleNamesListLater[maleNamesListLater.length] = name;
				
				maleTotalLater += count;
			}
			
			makeGame();
		}, 500); //give AJAX time to happen
	});
	
	$(".draggable").draggable({containment: "#game", start: function(event, ui) {
		$(this).css("margin", "0");
	}});
});

function makeGame()
{
	var choice = maleTotalEarlier * Math.random();
	var counter = 0;
	var index = 0;
	while (counter < choice)
	{
		counter += maleNamesEarlier[maleNamesListEarlier[index]];
		index += 1;
	}
	var maleNameEarlier = maleNamesListEarlier[index-1];
	
	var choice = femaleTotalEarlier * Math.random();
	var counter = 0;
	var index = 0;
	while (counter < choice)
	{
		counter += femaleNamesEarlier[femaleNamesListEarlier[index]];
		index += 1;
	}
	var femaleNameEarlier = femaleNamesListEarlier[index-1];
	
	var choice = maleTotalLater * Math.random();
	var counter = 0;
	var index = 0;
	while (counter < choice)
	{
		counter += maleNamesLater[maleNamesListLater[index]];
		index += 1;
	}
	var maleNameLater = maleNamesListLater[index-1];
	
	var choice = femaleTotalLater * Math.random();
	var counter = 0;
	var index = 0;
	while (counter < choice)
	{
		counter += femaleNamesLater[femaleNamesListLater[index]];
		index += 1;
	}
	var femaleNameLater = femaleNamesListLater[index-1];
	
	var all = [maleNameEarlier, femaleNameEarlier, maleNameLater, femaleNameLater];
	var numbers = {};
	
	var first = all[Math.floor(4 * Math.random())];
	var second = all[Math.floor(4 * Math.random())];
	while (second == first)
		second = all[Math.floor(4 * Math.random())];
	var third = all[Math.floor(4 * Math.random())];
	while (third == first || third == second)
		third = all[Math.floor(4 * Math.random())];
	var fourth = all[Math.floor(4 * Math.random())];
	while (fourth == first || fourth == second || fourth == third)
		fourth = all[Math.floor(4 * Math.random())];
		
	while (first == maleNameEarlier && second == femaleNameEarlier && third == maleNameLater && fourth && maleNameLater) //make sure they aren't in sorted order
	{
		var first = all[Math.floor(4 * Math.random())];
		var second = all[Math.floor(4 * Math.random())];
		while (second == first)
			second = all[Math.floor(4 * Math.random())];
		var third = all[Math.floor(4 * Math.random())];
		while (third == first || third == second)
			third = all[Math.floor(4 * Math.random())];
		var fourth = all[Math.floor(4 * Math.random())];
		while (fourth == first || fourth == second || fourth == third)
			fourth = all[Math.floor(4 * Math.random())];
	}
	
	numbers[first] = "first";
	numbers[second] = "second";
	numbers[third] = "third";
	numbers[fourth] = "fourth";

	$("#first > .inner").html(first);
	$("#second > .inner").html(second);
	$("#third > .inner").html(third);
	$("#fourth > .inner").html(fourth);
	
	
	$(".draggable").animate({left: 0, top: 0});
	$(".draggable").draggable("enable");
	$(".draggable").css("cursor", "move");
	$(".droppable").removeClass("correct");
	$("#maleEarlier").droppable({accept: ".draggable", tolerance: "fit", drop: function(event, ui) {
		if ($(ui.draggable).attr("id") == numbers[maleNameEarlier]) // valid
		{
			$(this).addClass("correct");
			$("#" + numbers[maleNameEarlier]).draggable("disable").addClass("done");
			if ($(".droppable:not(.correct)").length == 0) //all have been correctly matched
			{
				$("#success").html("Congratulations! <a href='#' id='playagainlink'>Click to play again</a>").fadeIn();
				
				$("#playagainlink").click(function(e) {
					e.preventDefault();
					
					$("#success").fadeOut().html("");
					
					makeGame();
				});
			}
		}
		else
			$(this).addClass("incorrect");
	}, out: function(event, ui) {
		$(this).removeClass("incorrect");
	}});
	$("#femaleEarlier").droppable({accept: ".draggable", tolerance: "fit", drop: function(event, ui) {
		if ($(ui.draggable).attr("id") == numbers[femaleNameEarlier]) // valid
		{
			$(this).addClass("correct");
			$("#" + numbers[femaleNameEarlier]).draggable("disable").addClass("done");
			if ($(".droppable:not(.correct)").length == 0) //all have been correctly matched
			{
				$("#success").html("Congratulations! <a href='#' id='playagainlink'>Click to play again</a>").fadeIn();
				
				$("#playagainlink").click(function(e) {
					e.preventDefault();
					
					$("#success").fadeOut().html("");
					
					makeGame();
				});
			}
		}
		else
			$(this).addClass("incorrect");
	}, out: function(event, ui) {
		$(this).removeClass("incorrect");
	}});
	$("#maleLater").droppable({accept: ".draggable", tolerance: "fit", drop: function(event, ui) {
		if ($(ui.draggable).attr("id") == numbers[maleNameLater]) // valid
		{
			$(this).addClass("correct");
			$("#" + numbers[maleNameLater]).draggable("disable").addClass("done");
			if ($(".droppable:not(.correct)").length == 0) //all have been correctly matched
			{
				$("#success").html("Congratulations! <a href='#' id='playagainlink'>Click to play again</a>").fadeIn();
				
				$("#playagainlink").click(function(e) {
					e.preventDefault();
					
					$("#success").fadeOut().html("");
					
					makeGame();
				});
			}
		}
		else
			$(this).addClass("incorrect");
	}, out: function(event, ui) {
		$(this).removeClass("incorrect");
	}});
	$("#femaleLater").droppable({accept: ".draggable", tolerance: "fit", drop: function(event, ui) {
		if ($(ui.draggable).attr("id") == numbers[femaleNameLater]) // valid
		{
			$(this).addClass("correct");
			$("#" + numbers[femaleNameLater]).draggable("disable").addClass("done");
			if ($(".droppable:not(.correct)").length == 0) //all have been correctly matched
			{
				$("#success").html("Congratulations! <a href='#' id='playagainlink'>Click to play again</a>").fadeIn();
				
				$("#playagainlink").click(function(e) {
					e.preventDefault();
					
					$("#success").fadeOut().html("");
					
					makeGame();
				});
			}
		}
		else
			$(this).addClass("incorrect");
	}, out: function(event, ui) {
		$(this).removeClass("incorrect");
	}});
}

function getFemaleNamesEarlier(year)
{
	var nameGetter = new XMLHttpRequest();

	nameGetter.onreadystatechange = function() {
		if (nameGetter.readyState == 4 && nameGetter.status == 200)
		{
			var result = nameGetter.responseText;
			
			//alert(result);
			rawFemaleNamesEarlier = result.split(", ");
		}
	}

	nameGetter.open("POST", "getFemaleNames.php", true);
	nameGetter.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	nameGetter.send("year=" + year);
}

function getFemaleNamesLater(year)
{
	var nameGetter = new XMLHttpRequest();

	nameGetter.onreadystatechange = function() {
		if (nameGetter.readyState == 4 && nameGetter.status == 200)
		{
			var result = nameGetter.responseText;
			
			//alert(result);
			
			rawFemaleNamesLater = result.split(", ");
		}
	}

	nameGetter.open("POST", "getFemaleNames.php", true);
	nameGetter.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	nameGetter.send("year=" + year);
}

function getMaleNamesEarlier(year)
{
	var nameGetter = new XMLHttpRequest();

	nameGetter.onreadystatechange = function() {
		if (nameGetter.readyState == 4 && nameGetter.status == 200)
		{
			var result = nameGetter.responseText;
			
			//alert(result);
			
			rawMaleNamesEarlier = result.split(", ");
		}
	}

	nameGetter.open("POST", "getMaleNames.php", true);
	nameGetter.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	nameGetter.send("year=" + year);
}

function getMaleNamesLater(year)
{
	var nameGetter = new XMLHttpRequest();

	nameGetter.onreadystatechange = function() {
		if (nameGetter.readyState == 4 && nameGetter.status == 200)
		{
			var result = nameGetter.responseText;
			
			//alert(result);
			
			rawMaleNamesLater = result.split(", ");
		}
	}

	nameGetter.open("POST", "getMaleNames.php", true);
	nameGetter.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	nameGetter.send("year=" + year);
}