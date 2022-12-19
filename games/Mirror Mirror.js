/*
@title: Mirror Mirror
@author: Benjamin Grelk
*/

const player = "p";
const mirror = "m";
const wall = "w";
const exit = "e";

const walkEffect = tune`
65.78947368421052: d4~65.78947368421052,
65.78947368421052: d5~65.78947368421052 + f4~65.78947368421052,
1973.6842105263156`;

setLegend(
  [player, bitmap`
................
................
.....000000.....
....00990000....
....09999990....
....09099090....
....09099090....
....09999990....
.....099990.....
.....500005.....
....0.0770.0....
....0.0770.0....
......0000......
......0..0......
......3..3......
......0..0......`],
  [mirror, bitmap`
................
................
.....000000.....
....00440000....
....04444440....
....04044040....
....04044040....
....04444440....
.....044440.....
.....H0000H.....
....0.0550.0....
....0.0550.0....
......0000......
......0..0......
......D..D......
......0..0......`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [exit, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`]
  );

setSolids([player, mirror, wall]);

let level = 0;
const levels = [
  map`
p......wm..w...
.......w...w...
.......w...w...
.......w...w...
.......w...w...
.......w...w...
wwww...w.......
.......w.......
......ew......e`,
  map`
p.w....wm......
..ww...w...ww..
w..wwwww.......
.....w.w...w...
.www...wwwww.ww
...wwwww...w...
ww.....w...w...
w..ww.www......
......eww.....e`,
  map`
pw.....wm.w....
...w...w..w....
ew.....w...wwww
.......w.......
.......w..wwwww
.......w....w..
.......wwww.w..
.......w....w..
.......w......e`,
  map`
p......wm......
.......w.......
.......w.......
.......w.......
.......w.......
.......w.......
.......w.......
.......w.......
......ew......e`,
  map`
p......wm......
.......w.......
.......w.......
.......w.......
.......w.......
.......w.......
.......w.......
.......w.......
......ew......e`,
];

setMap(levels[level]);

onInput("s", () => {
  getFirst(player).y += 1;
  getFirst(mirror).y += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
  getFirst(mirror).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
  getFirst(mirror).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
  getFirst(mirror).x += 1;
});

afterInput(() => {
  playTune(walkEffect);

  let sum = tilesWith(exit, mirror).length + tilesWith(exit, player).length ;
  if (sum == 2) {
    level = level + 1

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  } else if (sum == 1) {
    
  }
});
