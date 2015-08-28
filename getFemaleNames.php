<?php
	$year = $_REQUEST["year"];

	$namesfile = fopen("resources/yob$year.txt", "r");

	$resultstring = "";
	
	$continuing = TRUE;
	while ($line = trim(fgets($namesfile)))
	{
		if ($continuing && ($position = strpos($line, ",F,"))) // this is a female name line
		{
			$name = substr($line, 0, $position);
			$count = intval(substr($line, $position+3));
			if ($count > 100)
				$resultstring .= "$name, $count, ";
			else
				$continuing = FALSE;
		}
	}
	
	echo substr($resultstring, 0, -2); //cut off last ", "
?>