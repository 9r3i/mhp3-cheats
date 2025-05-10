# mhp3-cheats
cheats of mhp3 (ppsspp)


# talisman
sample:
```js
let code = talisman(
  '02', // poison skill one
  '02', // sleep skill two
  10, // skill point one
  10, // skill point two
  1, // has 1 slot
  2, // rare-2 (purple)
);
console.log(code);

```
output:
```
_C0 Rare 2 Charm (Poison+10/Sleep+10/Slot+1)
_L 0x2174FE14 0xA2816501
_L 0x1174FE18 0x00004202
```

## skill list
```js
let one = skillOne(),
    two = skillTwo();
console.log(one,two);

```
output:
```
----+---------------+---------------
key |skill one      |skill two      
----+---------------+---------------
10  |Guard Up       |Gluttony       
11  |Auto-Guard     |Defense        
12  |Reload Spd     |Hearing        
13  |Recoil         |Wide-Range     
14  |Normal Up      |Fire Res       
15  |Pierce Up      |ThunderRes     
16  |Pellet Up      |Dragon Res     
17  |Normal S+      |Cold Res       
18  |Pierce S+      |Gathering      
19  |Pellet S+      |Whim           
20  |Gluttony       |Tremor Res     
21  |Attack         |Crit Draw      
22  |Defense        |Constitutn     
23  |Protection     |Perception     
24  |Hearing        |PunishDraw     
25  |Anti-Theft     |Survivor       
26  |Wide-Range     |Dungmaster     
27  |Transportr     |Poison C+      
28  |Fire Res       |Sleep C+       
29  |Water Res      |C.Range C+     
30  |Gathering      |Destroyer      
31  |Spd Gather     |Stam Drain     
32  |Whim           |Stam Recov     
33  |Fate           |               
34  |Psychic        |               
35  |Rec Level      |               
36  |Combo Rate     |               
37  |Combo Plus     |               
38  |Evasion        |               
39  |Potential      |               
40  |Tremor Res     |               
41  |Evade Dist     |               
42  |Crit Draw      |               
43  |SpeedSetup     |               
44  |Constitutn     |               
45  |Tranquilzr     |               
46  |Perception     |               
47  |FastCharge     |               
48  |PunishDraw     |               
49  |Blight Res     |               
50  |Sleep C+       |               
51  |Power C+       |               
52  |C.Range C+     |               
53  |Maestro        |               
54  |Artillery      |               
55  |Gloves Off     |               
56  |Ranger         |               
57  |Def Lock       |               
58  |Fire Atk       |               
59  |Water Atk      |               
60  |Destroyer      |               
61  |KO             |               
62  |Stam Drain     |               
63  |Sheathing      |               
64  |Stam Recov     |               
65  |No Skill       |               
00  |Nothing        |Nothing        
01  |Torso Up       |Poison         
02  |Poison         |Sleep          
03  |Paralysis      |Mud/Snow       
04  |Sleep          |Health         
05  |Stun           |Sharpness      
06  |Mud/Snow       |Fencing        
07  |Sense          |Sharpener      
08  |Health         |Guard Up       
09  |Rec Speed      |Reload Spd     
0A  |Sharpness      |Normal Up      
0B  |Handicraft     |Pellet Up      
0C  |Fencing        |Pierce S+      
0D  |Expert         |Crag S+        
0E  |Sharpener      |Status         
0F  |Guard          |Bomb Boost     
1A  |Crag S+        |Psychic        
1B  |Clust S+       |Combo Rate     
1C  |Status         |Evasion        
1D  |ElementAtk     |LastingPwr     
1E  |Bomb Boost     |Loading        
1F  |Hunger         |Eating         
2A  |ThunderRes     |Artillery      
2B  |Ice Res        |Ranger         
2C  |Dragon Res     |Fire Atk       
2D  |Heat Res       |ThunderAtk     
2E  |Cold Res       |Dragon Atk     
2F  |Wind Res       |Exhaust C+     
3A  |LastingPwr     |               
3B  |Stamina        |               
3C  |Loading        |               
3D  |Precision      |               
3E  |Eating         |               
3F  |Carving        |               
4A  |Survivor       |               
4B  |Rapid Fire     |               
4C  |Dungmaster     |               
4D  |Antiseptic     |               
4E  |Poison C+      |               
4F  |Para C+        |               
5A  |ThunderAtk     |               
5B  |Ice Atk        |               
5C  |Dragon Atk     |               
5D  |Slice S+       |               
5E  |Exhaust C+     |               
5F  |Tenderizer     |               
```

