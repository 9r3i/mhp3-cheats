/* mhp3.js */


function def(){
  
}
  
function x(s1,s2){
  let dec=((s2+30)*64)+(s1+30);
  return dec.toString(16).toUpperCase();
}



/* non-HD version */
function guildCardName(str=''){
  let chars=nameChars(),
  out=['_C0 Guild Card Name Change to '+str],
  base=0x7D0;
  for(let i=0;i<8;i++){
    let addr=(base+(i*2)).toString(16).padStart(3,'0').toUpperCase(),
    char=str[i]&&chars.hasOwnProperty(str[i])?chars[str[i]]:'0000';
    out.push('_L 0x11349'+addr+' 0x0000'+char);
  }
  return out.join('\n');
}

/* non-HD version */
function changeName(str=''){
  let chars=nameChars(),
  out=['_C0 Name Change to '+str],
  base=0x1FC;
  for(let i=0;i<8;i++){
    let addr=(base+(i*2)).toString(16).padStart(3,'0').toUpperCase(),
    char=str[i]&&chars.hasOwnProperty(str[i])?chars[str[i]]:'0000';
    out.push('_L 0x11349'+addr+' 0x0000'+char);
  }
  return out.join('\n');
}


function bagItemCountOne(k=1,n=1){
  let na=((k-1)*4).toString(16)
    .padStart(2,'0').toUpperCase(),
  nc=Math.min(99,Math.max(n,1))
    .toString(16).padStart(2,'0').toUpperCase();
  let out=[
    '_C0 Bag Items Count #'+k+' x'+n,
    '_L 0x817AF8'+na+' 0x00010004',
    '_L 0x000000'+nc+' 0x00000000',
  ];
  return out.join('\n');
}

function bagItemCount(){
  let args=arguments,
  length=args.length,
  addr=0,
  out=['_C0 Bag Items Count #1 to #'+length];
  if(length<1){
    return '';
  }
  for(let i=0;i<args.length;i++){
    let na=(addr+(i*4)).toString(16)
      .padStart(2,'0').toUpperCase(),
    nc=Math.min(99,Math.max(args[i],1))
      .toString(16).padStart(2,'0').toUpperCase();
    out.push('_L 0x817AF8'+na+' 0x00010004');
    out.push('_L 0x000000'+nc+' 0x00000000');
  }
  return out.join('\n');
}


function money(n=0){
  let dex=n.toString(16).padStart(8,'0').toUpperCase(),
  out=[
    '_C0 Money '+n+' zenny',
    '_L 0x217AC8D4 0x'+dex,
  ];
  return out.join('\n');
}

/*
_C0 Rare 7 Charm (Auto-Guard+10/Fencing+10/Slot+3)
_L 0x2174FE14 0xA2866501
_L 0x1174FE18 0x0000C611

+64 / 0x40 on skill 2 for +1 slot
*/
function talisman(
  snOne='00',
  snTwo='00',
  spOne=0,
  spTwo=0,
  slot=0,
  rare=1){
  let sOne=skillOne(),
  sTwo=skillTwo(),
  pts=skillPoint(spOne,spTwo),
  rrs=Math.min(7,Math.max(rare,1)),
  slotPlus=slot*64,
  skTwo=(parseInt(snTwo,16)+slotPlus)
    .toString(16).toUpperCase().padStart(2,'0'),
  skOne=parseInt(snOne,16)
    .toString(16).toUpperCase().padStart(2,'0'),
  lineOne='_L 0x2174FE14 0x'+pts+(rrs-1)+'6501',
  lineTwo='_L 0x1174FE18 0x0000'+skTwo+skOne,
  snameOne=sOne.hasOwnProperty(snOne)?sOne[snOne]:sOne[00],
  snameTwo=sTwo.hasOwnProperty(snTwo)?sTwo[snTwo]:sTwo[00],
  lineZero='_C0 Rare '+rrs+' Charm ('
    +snameOne+(spOne>=0?'+':'-')+spOne
    +'/'
    +snameTwo+(spTwo>=0?'+':'-')+spTwo
    +'/Slot+'+slot+')';
  return [
    lineZero,
    lineOne,
    lineTwo,
  ].join('\n');
}

function skillPoint(s1,s2){
  let dec=((s2+30)*64)+(s1+30);
  return dec.toString(16).toUpperCase().padStart(2,'0');
}

function skillOne(){
  return {
    "00":"Nothing",
    "01":"Torso Up",
    "02":"Poison",
    "03":"Paralysis",
    "04":"Sleep",
    "05":"Stun",
    "06":"Mud/Snow",
    "07":"Sense",
    "08":"Health",
    "09":"Rec Speed",
    "0A":"Sharpness",
    "0B":"Handicraft",
    "0C":"Fencing",
    "0D":"Expert",
    "0E":"Sharpener",
    "0F":"Guard",
    "10":"Guard Up",
    "11":"Auto-Guard",
    "12":"Reload Spd",
    "13":"Recoil",
    "14":"Normal Up",
    "15":"Pierce Up",
    "16":"Pellet Up",
    "17":"Normal S+",
    "18":"Pierce S+",
    "19":"Pellet S+",
    "1A":"Crag S+",
    "1B":"Clust S+",
    "1C":"Status",
    "1D":"ElementAtk",
    "1E":"Bomb Boost",
    "1F":"Hunger",
    "20":"Gluttony",
    "21":"Attack",
    "22":"Defense",
    "23":"Protection",
    "24":"Hearing",
    "25":"Anti-Theft",
    "26":"Wide-Range",
    "27":"Transportr",
    "28":"Fire Res",
    "29":"Water Res",
    "2A":"ThunderRes",
    "2B":"Ice Res",
    "2C":"Dragon Res",
    "2D":"Heat Res",
    "2E":"Cold Res",
    "2F":"Wind Res",
    "30":"Gathering",
    "31":"Spd Gather",
    "32":"Whim",
    "33":"Fate",
    "34":"Psychic",
    "35":"Rec Level",
    "36":"Combo Rate",
    "37":"Combo Plus",
    "38":"Evasion",
    "39":"Potential",
    "3A":"LastingPwr",
    "3B":"Stamina",
    "3C":"Loading",
    "3D":"Precision",
    "3E":"Eating",
    "3F":"Carving",
    "40":"Tremor Res",
    "41":"Evade Dist",
    "42":"Crit Draw",
    "43":"SpeedSetup",
    "44":"Constitutn",
    "45":"Tranquilzr",
    "46":"Perception",
    "47":"FastCharge",
    "48":"PunishDraw",
    "49":"Blight Res",
    "4A":"Survivor",
    "4B":"Rapid Fire",
    "4C":"Dungmaster",
    "4D":"Antiseptic",
    "4E":"Poison C+",
    "4F":"Para C+",
    "50":"Sleep C+",
    "51":"Power C+",
    "52":"C.Range C+",
    "53":"Maestro",
    "54":"Artillery",
    "55":"Gloves Off",
    "56":"Ranger",
    "57":"Def Lock",
    "58":"Fire Atk",
    "59":"Water Atk",
    "5A":"ThunderAtk",
    "5B":"Ice Atk",
    "5C":"Dragon Atk",
    "5D":"Slice S+",
    "5E":"Exhaust C+",
    "5F":"Tenderizer",
    "60":"Destroyer",
    "61":"KO",
    "62":"Stam Drain",
    "63":"Sheathing",
    "64":"Stam Recov",
    "65":"No Skill",
  };
}

function skillTwo(){
  return {
    "00":"Nothing",
    "01":"Poison",
    "02":"Sleep",
    "03":"Mud/Snow",
    "04":"Health",
    "05":"Sharpness",
    "06":"Fencing",
    "07":"Sharpener",
    "08":"Guard Up",
    "09":"Reload Spd",
    "0A":"Normal Up",
    "0B":"Pellet Up",
    "0C":"Pierce S+",
    "0D":"Crag S+",
    "0E":"Status",
    "0F":"Bomb Boost",
    "10":"Gluttony",
    "11":"Defense",
    "12":"Hearing",
    "13":"Wide-Range",
    "14":"Fire Res",
    "15":"ThunderRes",
    "16":"Dragon Res",
    "17":"Cold Res",
    "18":"Gathering",
    "19":"Whim",
    "1A":"Psychic",
    "1B":"Combo Rate",
    "1C":"Evasion",
    "1D":"LastingPwr",
    "1E":"Loading",
    "1F":"Eating",
    "20":"Tremor Res",
    "21":"Crit Draw",
    "22":"Constitutn",
    "23":"Perception",
    "24":"PunishDraw",
    "25":"Survivor",
    "26":"Dungmaster",
    "27":"Poison C+",
    "28":"Sleep C+",
    "29":"C.Range C+",
    "2A":"Artillery",
    "2B":"Ranger",
    "2C":"Fire Atk",
    "2D":"ThunderAtk",
    "2E":"Dragon Atk",
    "2F":"Exhaust C+",
    "30":"Destroyer",
    "31":"Stam Drain",
    "32":"Stam Recov",
  };
}



function nameChars(){
  return {
    ":": "003A",
    ";": "003B",
    "<": "003C",
    "=": "003D",
    ">": "003E",
    "?": "003F",
    "@": "0040",
    "A": "0041",
    "B": "0042",
    "C": "0043",
    "D": "0044",
    "E": "0045",
    "F": "0046",
    "G": "0047",
    "H": "0048",
    "I": "0049",
    "J": "004A",
    "K": "004B",
    "L": "004C",
    "M": "004D",
    "N": "004E",
    "O": "004F",
    "P": "0050",
    "Q": "0051",
    "R": "0052",
    "S": "0053",
    "T": "0054",
    "U": "0055",
    "V": "0056",
    "W": "0057",
    "X": "0058",
    "Y": "0059",
    "Z": "005A",
    "[": "005B",
    "\\": "00A5",
    "]": "005D",
    "^": "005E",
    "_": "005F",
    "`": "0060",
    "a": "0061",
    "b": "0062",
    "c": "0063",
    "d": "0064",
    "e": "0065",
    "f": "0066",
    "g": "0067",
    "h": "0068",
    "i": "0069",
    "j": "006A",
    "k": "006B",
    "l": "006C",
    "m": "006D",
    "n": "006E",
    "o": "006F",
    "p": "0070",
    "q": "0071",
    "r": "0072",
    "s": "0073",
    "t": "0074",
    "u": "0075",
    "v": "0076",
    "w": "0077",
    "x": "0078",
    "y": "0079",
    "z": "007A",
    "{": "007B",
    "|": "007C",
    "}": "007D",
    "~": "203E",
  };
}


