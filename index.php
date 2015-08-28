<?php
	//$mysql = mysqli_connect("localhost", ...)
?>

<!DOCTYPE html>
<html>
	<head>
		<title>the NAME GAME</title>

		<link rel="stylesheet" type="text/css" href="jquery-ui/jquery-ui.css" />
		<link rel="stylesheet" type="text/css" href="style.css" />
		
		<script type="text/javascript" src="jquery.js"></script>
		<script type="text/javascript" src="jquery-ui/jquery-ui.js"></script>
		
		<script type="text/javascript" src="script.js"></script>
	</head>
	<body>
		<div id="main">
			<div id="header">
				<h3 id="welcome">Welcome to...</h3>
				<img id="headerimage" src="header.jpg" alt="the Name Game" />
				
				<a href="#" id="whatislink"><h4 id="whatisheader">What is the NAME GAME?</h4></a>
				
				<div id="whatis">
					The NAME GAME tests your knowledge of a fascinating subject&mdash;namely, the changing popularities of baby names. You can select any two years from 1880 to 2013. Using Social Security records (available <a href="http://www.ssa.gov/OACT/babynames/" title="Social Security Baby Names site">here</a>), a male and female name from each year are randomly chosen, with names more popular in that year being more likely. You then try to match up the name with the correct year and gender.
				</div> <!--whatis-->
			</div>
			
			<div id="maininner">
				<div id="choices">
					<h3 class="instructions"><span class="inlinetitle">First</span>, choose two birth years; the <span class="emphasis">bigger</span> the difference, the <span class="emphasis">easier</span> the game</h3>
					
					<div id="choice1">
						<select id="select1">
							<option selected disabled class="defaultoption">1st</option>
							<?php foreach (range(1880, 2012) as $year): ?>
								<option class="<?php echo $year ?>option"><?php echo $year ?></option>
							<?php endforeach; ?>
							<option disabled class="2013option">2013</option>
						</select>
					</div> <!--choice1-->
	
					<div id="choice2">
						<select id="select2">
							<option selected disabled class="defaultoption">2nd</option>
							<?php foreach (range(1880, 2013) as $year): ?>
								<option class="<?php echo $year ?>option"><?php echo $year ?></option>
							<?php endforeach; ?>
						</select>
					</div> <!--choice2-->
					
					<div id="distance">
						<div id="leftarrowcontainer"><img id="leftarrow" src="arrow.png" /></div>
						<div id="distancetextcontainer"><div id="distancetextinner"><span id="distancetext"></span></div></div>
						<div id="rightarrowcontainer"><img id="rightarrow" src="arrow.png" /></div>
					</div>

					<div id="continue">
						<input type="button" id="continuebutton" value="Continue" />
					</div>
				</div> <!--choices-->
				
				<div id="game">
					<h3 class="instructions"><span class="inlinetitle">How to play</span>: Drag each name <span class="emphasis">completely</span> onto the corresponding box</h3>
	
					<div id="droppables">
						<div class="droppable male" id="maleEarlier"><div class="inner">Male, <span class="earlieryear">1920</span></div></div>
						<div class="droppable female" id="femaleEarlier"><div class="inner">Female, <span class="earlieryear">1920</span></div></div>
						<div class="droppable male" id="maleLater"><div class="inner">Male, <span class="lateryear">2000</span></div></div>
						<div class="droppable female" id="femaleLater"><div class="inner">Female, <span class="lateryear">2000</span></div></div>
					</div> <!--droppables-->
					
					<div id="draggables">
						<div class="draggablecontainer">
							<div class="draggable" id="first"><div class="inner"></div></div>
						</div>
						<div class="draggablecontainer">
							<div class="draggable" id="second"><div class="inner"></div></div>
						</div>
						<div class="draggablecontainer">
							<div class="draggable" id="third"><div class="inner"></div></div>
						</div>
						<div class="draggablecontainer">
							<div class="draggable" id="fourth"><div class="inner"></div></div>
						</div>
					</div> <!--draggables-->
					
					<div id="success"></div>
				</div> <!--game-->
			</div> <!--maininner-->
		</div> <!--main-->
	</body>
</html>

<?php

?>