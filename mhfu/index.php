<?php

// source code of index.php
$text=file_get_contents(__FILE__);
header('content-type: text/plain');
header('content-length: '.strlen($text));
echo $text;

