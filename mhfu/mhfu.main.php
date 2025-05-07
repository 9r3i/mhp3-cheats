<?php
chdir(__DIR__);
$input='mhfu.main.ini';
$output='/sdcard/psp/cheats/ULUS10391.ini';
$raw=file_get_contents($input);
$out=file_put_contents($output,$raw);
echo $out."\n";


