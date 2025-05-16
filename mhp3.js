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
  rare=1,
  ){
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

function skillList(){
  let one=skillOne(),
      two=skillTwo(),
      out=[
        [
          ' ',
          '-----',
          '-----------------',
          '-----------------',
          ' ',
        ].join('+'),
        [
          '',
          'key'.padEnd(3,' '),
          'skill one'.padEnd(15,' '),
          'skill two'.padEnd(15,' '),
          '',
        ].join(' | '),
        [
          ' ',
          '-----',
          '-----------------',
          '-----------------',
          ' ',
        ].join('+'),
      ];
  for(let k in one){
    let stwo=two.hasOwnProperty(k)?two[k]:'';
    out.push(
        [
          '',
          k.padEnd(3,' '),
          one[k].padEnd(15,' '),
          stwo.padEnd(15,' '),
          '',
        ].join(' | ')
    );
  }
  out.push(
        [
          ' ',
          '-----',
          '-----------------',
          '-----------------',
          ' ',
        ].join('+')
  );
  return out.join('\n');
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




function allCheats(){
  return `
_S NPJB-40001
_G Monster Hunter Portable 3rd HD

_C0 +++++[ Personal ]+++++
_L 0x00000000 0x00000000


_C0 --------------------
_L 0x00000000 0x00000000

_C0 Health 150 (L+X)
_L 0xD0000005 0x10004100
_L 0x00E49B16 0x00000096

_C0 Health Max 150 (L+X)
_L 0xD0000005 0x10004100
_L 0x00E49B58 0x00000096

_C0 HSS (L+X)
_L 0xD0000005 0x10004100
_L 0x00E49B56 0x0000009
_L 0xD0000005 0x10004100
_L 0x00E49B58 0x00000096
_L 0xD0000005 0x10004100
_L 0x00E49B16 0x00000096
_L 0xD0000005 0x10004100
_L 0x00E4A49A 0x00000384
_L 0xD0000005 0x10004100
_L 0x20E4ACF4 0x015F0000
_L 0xD0000005 0x10004100
_L 0xE0025FA8 0x0185E610
_L 0xD0000005 0x10004100
_L 0x218F0024 0x34020001
_L 0xD0000005 0x10004100
_L 0x218F00E4 0x24130000

_C0 --------------------
_L 0x00000000 0x00000000

_C0 Attack x1 normal [Select+Start]
_L 0xD0000005 0x10000009
_L 0x200ad964 0x00000000
_L 0xD0000005 0x10000009
_L 0x200ad96c 0x00031830

_C0 Attack x2 [L+R]
_L 0xD0000005 0x10000300
_L 0x200ad964 0x00000000
_L 0xD0000005 0x10000300
_L 0x200ad96c 0x00031840

_C0 Attack x4 [L+R]
_L 0xD0000005 0x10000300
_L 0x200ad964 0x00000000
_L 0xD0000005 0x10000300
_L 0x200ad96c 0x00031880

_C0 Attack x8 [L+R]
_L 0xD0000005 0x10000300
_L 0x200ad964 0x00000000
_L 0xD0000005 0x10000300
_L 0x200ad96c 0x000318C0

_C0 Attack x16 [L+R]
_L 0xD0000005 0x10000300
_L 0x200ad964 0x00000000
_L 0xD0000005 0x10000300
_L 0x200ad96c 0x00031900

_C0 Attack x32 [L+R]
_L 0xD0000005 0x10000300
_L 0x200ad964 0x00000000
_L 0xD0000005 0x10000300
_L 0x200ad96c 0x00031940

_C0 Long Sword Gauge Max [R+L]
_L 0xD0000005 0x10000300
_L 0x00E4AD18 0x00000064

_C0 --------------------
_L 0x00000000 0x00000000

_C0 Monster Size x256 (200%)
_L 0x619B0AE0 0x40000000
_L 0x00020001 0x000000D0

_C0 Monster Size x1
_L 0x619B0AE0 0x3F010000
_L 0x00020001 0x000000D0

_C0 Monster Size x1 (Select+Down)
_L 0xD0000005 0x10000041
_L 0x619B0AE0 0x3F010000
_L 0xD0000005 0x10000041
_L 0x00020001 0x000000D0

_C0 --------------------
_L 0x00000000 0x00000000

_C0 Freeze HP
_L 0xE0015FA8 0x0185E610
_L 0x200AB41C 0x96020288

_C0 Freeze Stamina Consumption
_L 0xE0025FA8 0x0185E610
_L 0x218F07B4 0x4600A505
_L 0x218F07C4 0x4601083C

_C0 Freeze Sharpness
_L 0xE0025FA8 0x0185E610
_L 0x218F0024 0x34020001
_L 0x218F00E4 0x24130000

_C0 99x Bag Items Slot 1-8
_L 0x817AF800 0x00080004
_L 0x00000063 0x00000000

_C0 20x Bag Items Slot 1-8
_L 0x817AF800 0x00080004
_L 0x00000014 0x00000000

_C0 Long Sword Gauge Max
_L 0x00E4AD18 0x00000064
_L 0x00E4AD1A 0x00000003
_L 0x10E4AD1E 0x00000700

_C0 Unlimited Traps and Bomb Trick
_L 0x019B88EC 0x00000000
_L 0x019B890C 0x00000000

_C0 Map
_L 0xE0015FA8 0x0185E610
_L 0x2196658C 0x34020001

_C0 Auto Tracker
_L 0xE0025FA8 0x0185E610
_L 0x219698A4 0x34020080

_C0 Ammo no Reload
_L 0x00E4A4F0 0x0000000C

_C0 Bowgun Ammo +9
_L 0x00E4A4F1 0x00000009
_L 0x00E4A4B8 0x00000009

_C0 Health Regen Augmentation
_L 0xE00A03E0 0x0187B91E
_L 0x2187B91C 0x0A814028
_L 0x218500A0 0x12800007
_L 0x218500A4 0x0302D8C2
_L 0x218500A8 0x86810246
_L 0x218500AC 0x102C0004
_L 0x218500B0 0x0361D821
_L 0x218500B4 0x868C0288
_L 0x218500B8 0x036C602D
_L 0x218500BC 0xA28C0246
_L 0x218500C0 0x03E00008

_C0 All Weapons Affinity 127% and Defence +255
_L 0x80192F35 0x030E001C
_L 0x0000007F 0x00000000
_L 0x8018EB75 0x00D70050
_L 0x0000007F 0x00000000
_L 0x80192F34 0x030E001C
_L 0x000000FF 0x00000000
_L 0x8018EB74 0x00D70050
_L 0x000000FF 0x00000000

_C0 --------------------
_L 0x00000000 0x00000000

_C0 Bag Items Count #1 to #8
_L 0x817AF800 0x00010004
_L 0x00000005 0x00000000
_L 0x817AF804 0x00010004
_L 0x00000002 0x00000000
_L 0x817AF808 0x00010004
_L 0x00000014 0x00000000
_L 0x817AF80C 0x00010004
_L 0x00000008 0x00000000
_L 0x817AF810 0x00010004
_L 0x00000001 0x00000000
_L 0x817AF814 0x00010004
_L 0x00000001 0x00000000
_L 0x817AF818 0x00010004
_L 0x0000000A 0x00000000
_L 0x817AF81C 0x00010004
_L 0x00000005 0x00000000

_C0 10x Bag Item #24
_L 0x817AF85C 0x00010004
_L 0x0000000A 0x00000000

_C0 10x Bag Item #1
_L 0x817AF800 0x00010004
_L 0x0000000A 0x00000000

_C0 99x Bag Item #1
_L 0x817AF800 0x00010004
_L 0x00000063 0x00000000

_C0 99x Bag Items
_L 0x817AF800 0x00180004
_L 0x00000063 0x00000000

_C0 9x Bag Items
_L 0x817AF800 0x00180004
_L 0x00000009 0x00000000

_C0 Zero Bag Items
_L 0x817AF800 0x00180004
_L 0x00000000 0x00000000

_C0 32x All Bag Items
_L 0x817AF800 0x00180004
_L 0x00000020 0x00000000

_C0 32x All Box Items
_L 0x81752CF6 0x03D20004
_L 0x00000050 0x00000000

_C0 Max Yukumo Points
_L 0x217AC8CC 0x0098967F

_C0 No Yukumo Points
_L 0x217AC8CC 0x00000000

_C0 Max Money
_L 0x217AC8D4 0x0098967F

_C0 No Money
_L 0x217AC8D4 0x00000000

_C0 All Weapon with 3 Slots
_L 0x80192F3A 0x030E001C
_L 0x00000003 0x00000000
_L 0x8018EB74 0x00D70050
_L 0x00000003 0x00000000

_C0 All Armor with 3 Slots
_L 0x8018396E 0x046F0028
_L 0x00000003 0x00000000

_C0 Equipment Shop Unlock All
_L 0x20000C20 0x82220032
_L 0x20000C24 0x14400005
_L 0x20000C28 0x82220033
_L 0x20000C2C 0x00561021
_L 0x20000C30 0x80430000
_L 0x20000C34 0x10000003
_L 0x20000C38 0x24630005
_L 0x20000C3C 0x00571021
_L 0x20000C40 0x80430000
_L 0x20000C44 0x3C010880
_L 0x20000C4C 0x00230821
_L 0x20000C50 0x90220C70
_L 0x20000C54 0x0262102B
_L 0x20000C58 0x50400003
_L 0x20000C5C 0x3405FFFF
_L 0x20000C60 0x00032821
_L 0x20000C68 0x0A8356BA
_L 0x20000C6C 0x3402FFFF
_L 0x20000C70 0xDBD5D4E8
_L 0x20000C74 0x5D5E5BFF
_L 0x20000C78 0x43004260
_L 0x20000C7C 0x504D4755
_L 0x20000C80 0x00005552
_L 0x218D5AE0 0x0A200308
_L 0x218D5AFC 0x26620001

_C0 General Store Unlock All
_L 0x80002800 0x03D20001
_L 0x10000001 0x00000001
_L 0x200027FC 0x0000FFFF
_L 0x20002FA4 0x0000FFFF
_L 0x219961E0 0x08802800
_L 0x219961E4 0x08802800
_L 0x219961E8 0x08802800
_L 0x219961EC 0x08802800
_L 0x219961F0 0x08802800
_L 0x219961F4 0x08802800
_L 0x219961F8 0x08802800
_L 0x219961FC 0x08802800
_L 0x21996204 0x08802800
_L 0x21996208 0x08802800
_L 0x2199620C 0x08802800
_L 0x21996210 0x08802800
_L 0x21996214 0x08802800
_L 0x21996220 0x08802800
_L 0x21996228 0x08802800
_L 0x2199622C 0x08802800
_L 0x21996230 0x08802800
_L 0x21996234 0x08802800
_L 0x21996238 0x08802800
_L 0x2199623C 0x08802800
_L 0x21996240 0x08802800
_L 0x21996244 0x08802800

_C0 --------------------
_L 0x00000000 0x00000000

_C0 Rare 7 Charm (Auto-Guard+10/Guard Up+10/Slot+3)
_L 0x2174FE14 0xA2866501
_L 0x1174FE18 0x0000C811

_C0 Rare 7 Charm (Fencing+10/Hearing+15/Slot+3)
_L 0x2174FE14 0xB6866501
_L 0x1174FE18 0x0000D20C

_C0 Rare 6 Charm (Recoil+20/Reload Spd+20/Slot+3)
_L 0x2174FE14 0xCB256501
_L 0x1174FE18 0x0000C913

_C0 --------------------
_L 0x00000000 0x00000000

_C0 Felyne 01 Name on Comment
_L 0x117ACF76 0x00000000
_L 0x517ACF5E 0x0000001A
_L 0x017ACF44 0x00000000

_C0 Felyne 01 White
_L 0x017ACF9B 0x00000012

_C0 Felyne Level 20
_L 0xE0014E1C 0x0185E610
_L 0x817ACF3F 0x000500A0
_L 0x00000014 0x00000000

_C0 Felyne 5 Hearts
_L 0xE0014E1C 0x0185E610
_L 0x817ACF43 0x000500A0
_L 0x000000C8 0x00000000

_C0 Felyne 250 skill points
_L 0xE0014E1C 0x0185E610
_L 0x817ACFB6 0x00050050
_L 0x100000FA 0x00000000

_C0 --------------------
_L 0x00000000 0x00000000

_C0 HD Easy Hunter Name Change with GC Comment
_L 0x117A82F8 0x00000000
_L 0x517A82E0 0x0000001A
_L 0x0174FCAC 0x00000000
_L 0x517A82E0 0x0000001A
_L 0x017A8280 0x00000000

_C0 HD Easy Hunter Name Change with Cat01 Comment
_L 0x117ACF76 0x00000000
_L 0x517ACF5E 0x0000001A
_L 0x0174FCAC 0x00000000
_L 0x517ACF5E 0x0000001A
_L 0x017A8280 0x00000000

_C0 --------------------
_L 0x00000000 0x00000000

_C0 Joker (Select)
_L 0xD0000005 0x10000001
_C0 --------------------
_C0 0001 = Select
_C0 0008 = Start
_C0 0010 = Up
_C0 0020 = Right
_C0 0040 = Down
_C0 0080 = Left
_C0 0100 = L
_C0 0200 = R
_C0 1000 = Triangle
_C0 2000 = Circle
_C0 4000 = X
_C0 8000 = Square
_C0 --------------------
_L 0x00000000 0x00000000



_C0 --------------------
_L 0x00000000 0x00000000

_C0 Change Hunter Name with Cat01 Comment
_L 0x117ACF76 0x00000000
_L 0x517ACF5E 0x0000001A
_L 0x0174FCAC 0x00000000
_L 0x517ACF5E 0x0000001A
_L 0x017A8280 0x00000000

_C0 Change Hunter Gender (male=0/female=1)
_L 0x2174FCC7 0x00000001

_C0 Change Hunter Face to 0x07
_L 0x2174FCCA 0x00000007

_C0 Change Hunter Voice to 0x11
_L 0x2174FCC8 0x00000011

_C0 Hunter Rank 1
_L 0x01754598 0x00000000

_C0 Reset All Quests
_L 0x817544C4 0x00800001
_L 0x00000000 0x00000000

_C0 Hunter Rank 6
_L 0x01754598 0x00000005

_C0 Clear All Quests
_L 0x817544C4 0x00800001
_L 0x000000FF 0x00000000

_C0 --------------------
_L 0x00000000 0x00000000

_C0 Unlock 60fps
_L 0xE0090A00 0x100766B8
_L 0x200766B8 0x0A200A00
_L 0x200766BC 0x3C0808B7
_L 0x20002800 0x8D097B14
_L 0x20002804 0x51200002
_L 0x20002808 0x24030000
_L 0x2000280C 0x28A30002
_L 0x20002810 0x0A21D9B0
_L 0x20002814 0xACC53660
_L 0x200A6AA0 0x00000000
_L 0xE00A0A06 0x100F7128
_L 0x200F7128 0x0A200A06
_L 0x20002818 0x3C020880
_L 0x2000281C 0x8C5B27FC
_L 0x20002820 0x13600003
_L 0x20002824 0x277B0001
_L 0x20002828 0x24630001
_L 0x2000282C 0x277BFFFE
_L 0x20002830 0xAC5B27FC
_L 0x20002834 0x0A23DC4C
_L 0x20002838 0x9202000C
_L 0xE0055FA8 0x0185E610
_L 0x218B1D78 0x00000000
_L 0x21902D58 0x00000000
_L 0x218D30C0 0x00000000
_L 0x219AEBD0 0x3F800000
_L 0x219AEF40 0x42700000
_L 0xE0054E1C 0x0185E610
_L 0x219CAF10 0x3F800000
_L 0x21917098 0x00000000
_L 0x219CAE48 0x3F800000
_L 0x219CAE7C 0x3FA00000
_L 0x219CAFD4 0x3F8CCCCD

_C0 Restore 30fps
_L 0x200766B8 0x28A30002
_L 0x200766BC 0xACC53660
_L 0x200A6AA0 0x46000000
_L 0x200F7128 0x9202000C
_L 0xE0055FA8 0x0185E610
_L 0x218B1D78 0x4614A500
_L 0x21902D58 0x46000000
_L 0x218D30C0 0x46000000
_L 0x219AEF40 0x41F00000
_L 0x219AEBD0 0x40000000
_L 0xE0054E1C 0x0185E610
_L 0x219CAE48 0x40000000
_L 0x219CAE7C 0x40200000
_L 0x219CAF10 0x40000000
_L 0x21917098 0x46000000
_L 0x219CAFD4 0x400CCCCD


_C0 --------------------
_L 0x00000000 0x00000000

_C0 HP Display 1/4
_L 0xE0025FA8 0x0185E610
_L 0x2196A650 0x0A200400
_L 0x2000101C 0x00000000

_C0 HP Display 2/4 Detail
_L 0x200010A0 0x10500007

_C0 HP Display 3/4 White
_L 0x00000FFA 0x00000000

_C0 HP Display 4/4
_L 0xE0BB0880 0x10001000
_L 0x20001000 0x3C020880
_L 0x20001004 0xAC551FFC
_L 0x20001008 0xAC541FF8
_L 0x2000100C 0xAC531FF4
_L 0x20001010 0xAC521FF0
_L 0x20001014 0xAC511FEC
_L 0x20001018 0xAC501FE8
_L 0x20001020 0x34100000
_L 0x20001024 0x34110000
_L 0x20001028 0x90540FFA
_L 0x2000102C 0x3C150880
_L 0x20001030 0x3C0208A6
_L 0x20001034 0x8FC40C28
_L 0x20001038 0x3405000E
_L 0x2000103C 0x0E23A2AA
_L 0x20001040 0x3406000E
_L 0x20001044 0x3C020A1B
_L 0x20001048 0x34420AE0
_L 0x2000104C 0x00101880
_L 0x20001050 0x00431021
_L 0x20001054 0x8C520000
_L 0x20001058 0x12400014
_L 0x20001060 0x0E200696
_L 0x20001064 0x92490062
_L 0x20001070 0x864A0246
_L 0x20001074 0x864B0288
_L 0x20001078 0x34060001
_L 0x2000107C 0x34070085
_L 0x20001080 0x00F13821
_L 0x20001084 0x00142821
_L 0x2000108C 0x0E200680
_L 0x20001090 0x36A82000
_L 0x20001094 0x2631000E
_L 0x2000109C 0x92A20FFC
_L 0x200010AC 0x2A020005
_L 0x200010B0 0x1440FFDF
_L 0x200010B4 0x26100001
_L 0x200010B8 0x0A200654
_L 0x200010C0 0x00142821
_L 0x200010C4 0x340600B7
_L 0x200010C8 0x34070015
_L 0x200010CC 0x36A82009
_L 0x200010D0 0x0E200696
_L 0x200010D4 0x92490062
_L 0x200010E4 0x864A0246
_L 0x200010E8 0x864B0288
_L 0x200010EC 0x864C0BC2
_L 0x200010F0 0x864D0BC0
_L 0x200010F4 0x864E00D4
_L 0x20001100 0x0E200680
_L 0x20001110 0x00142821
_L 0x20001114 0x34060001
_L 0x20001118 0x340700D9
_L 0x2000111C 0x36A8202A
_L 0x20001120 0x8649023C
_L 0x20001124 0x864A0252
_L 0x20001128 0x864B025A
_L 0x2000112C 0x864C0258
_L 0x20001130 0x0E200680
_L 0x20001138 0x00142821
_L 0x2000113C 0x34060001
_L 0x20001140 0x340700F5
_L 0x20001144 0x36A82044
_L 0x20001148 0x8649024E
_L 0x2000114C 0x864A024C
_L 0x20001150 0x864B0C5C
_L 0x20001154 0x864C0C5E
_L 0x20001158 0x0E200680
_L 0x20001170 0x00142821
_L 0x20001174 0x34060055
_L 0x20001178 0x340700F5
_L 0x2000117C 0x36A8205E
_L 0x20001180 0x86490B32
_L 0x20001184 0x864A0B34
_L 0x2000118C 0x864B0B3A
_L 0x20001190 0x864C0B3C
_L 0x20001198 0x0E200680
_L 0x200011A0 0x00142821
_L 0x200011A4 0x3406008D
_L 0x200011A8 0x340700F5
_L 0x200011AC 0x36A8205E
_L 0x200011B0 0x86490B42
_L 0x200011B4 0x864A0B44
_L 0x200011BC 0x864B0B4A
_L 0x200011C0 0x864C0B4C
_L 0x200011C8 0x0E200680
_L 0x200011D0 0x00142821
_L 0x200011D4 0x340600C5
_L 0x200011D8 0x340700F5
_L 0x200011DC 0x36A8205E
_L 0x200011E0 0x86490B52
_L 0x200011E4 0x864A0B54
_L 0x200011EC 0x864B0B5A
_L 0x200011F0 0x864C0B5C
_L 0x200011F8 0x0E200680
_L 0x20001200 0x00142821
_L 0x20001204 0x340600FD
_L 0x20001208 0x340700F5
_L 0x2000120C 0x36A8205E
_L 0x20001210 0x86490B62
_L 0x20001214 0x864A0B64
_L 0x2000121C 0x864B0B6A
_L 0x20001220 0x864C0B6C
_L 0x20001228 0x0E200680
_L 0x20001948 0x0A20042B
_L 0x20001950 0x3C0208B4
_L 0x20001954 0x9444885C
_L 0x20001958 0x3C020880
_L 0x2000195C 0x34450FF0
_L 0x20001960 0x38810110
_L 0x20001964 0x2407FFFF
_L 0x20001968 0x10200003
_L 0x2000196C 0x38810140
_L 0x20001970 0x14200012
_L 0x20001974 0x24070001
_L 0x20001978 0x90A6000E
_L 0x2000197C 0x20C60001
_L 0x20001980 0x28C10008
_L 0x20001984 0x1420000C
_L 0x2000198C 0x80A6000C
_L 0x20001990 0x00C73020
_L 0x20001994 0x04C10002
_L 0x2000199C 0x24060000
_L 0x200019A0 0x28C10005
_L 0x200019A4 0x14200002
_L 0x200019AC 0x24060005
_L 0x200019B0 0xA0A6000C
_L 0x200019B4 0x24060000
_L 0x200019B8 0xA0A6000E
_L 0x200019BC 0x3C020880
_L 0x200019C0 0x8C551FFC
_L 0x200019C4 0x8C541FF8
_L 0x200019C8 0x8C531FF4
_L 0x200019CC 0x8C521FF0
_L 0x200019D0 0x8C511FEC
_L 0x200019D4 0x8C501FE8
_L 0x200019D8 0x00210825
_L 0x200019DC 0x8FA40008
_L 0x200019E0 0x8FA20004
_L 0x200019E4 0x0A85A996
_L 0x20001A00 0x8FC40C28
_L 0x20001A08 0xA085012E
_L 0x20001A0C 0xA4860120
_L 0x20001A10 0xA4870122
_L 0x20001A14 0x01002821
_L 0x20001A18 0x01203021
_L 0x20001A1C 0x01403821
_L 0x20001A20 0x01604021
_L 0x20001A24 0x01804821
_L 0x20001A28 0x01A05021
_L 0x20001A2C 0x01C05821
_L 0x20001A30 0x0A23B147
_L 0x20001A58 0x3C0108A4
_L 0x20001A5C 0x3421070C
_L 0x20001A60 0x2522017E
_L 0x20001A64 0x00021080
_L 0x20001A68 0x00221021
_L 0x20001A6C 0x8C420004
_L 0x20001A70 0x00414821
_L 0x20001A74 0x03E00008
_L 0x20002000 0x253A7325
_L 0x20002004 0x64252F64
_L 0x20002008 0x3A732500
_L 0x2000200C 0x252F6425
_L 0x20002010 0x530A0D64
_L 0x20002014 0x253A6174
_L 0x20002018 0x252F6434
_L 0x2000201C 0x532064C5
_L 0x20002020 0x253A7A69
_L 0x20002024 0x20252564
_L 0x20002028 0x6F500000
_L 0x2000202C 0x33253A69
_L 0x20002030 0x33252F64
_L 0x20002034 0x500A0D64
_L 0x20002038 0x253A7261
_L 0x2000203C 0x252F6433
_L 0x20002040 0x00006433
_L 0x20002044 0x3A706C53
_L 0x20002048 0x2F643325
_L 0x2000204C 0x0D643325
_L 0x20002050 0x204F4B0A
_L 0x20002054 0x6433253A
_L 0x20002058 0x6433252F
_L 0x2000205C 0x34250000
_L 0x20002060 0x64252F64
_L 0x20002064 0x34250A0D
_L 0x20002068 0x64252F64
_L 0x0000201C 0x00000034

_C0 --------------------
_L 0x00000000 0x00000000
  `;
}


