var colorList = [//name, code, tileNumber
 ["birth", "#438cb5"],//438cb5
 ["blueline" , "#002136"],
 ["lightbrown" , "#c39a5a"],
 ["darkbrown" , "#684c3c"],
 ["white" , "#ffffff"],
 ["skin", "#f3d48f"],
];

var scal = 6;

// 描画する座標情報
var r1 = [21*scal, 24*scal];
var r2 = [22*scal, 24*scal];
var r3 = [23*scal, 24*scal];
var r4 = [22*scal, 25*scal];
var r5 = [23*scal, 25*scal];
var r6 = [24*scal, 25*scal];

var rightCells = [r1,r2,r3,r4,r5,r6];

var l1 = [30*scal, 26*scal];
var l2 = [31*scal, 26*scal];
var l3 = [32*scal, 26*scal];
var l4 = [33*scal, 26*scal];
var l5 = [31*scal, 27*scal];
var l6 = [32*scal, 27*scal];
var l7 = [33*scal, 27*scal];
var l8 = [34*scal, 27*scal];

var leftCells = [l1,l2,l3,l4,l5,l6,l7,l8];

var squareList = [];

let font;
let imgDiceFloat = Math.random()*10;

function preload() {
    // Font
    font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    imgskirt = loadImage("../assets/eyes/eyes-skirt.png");
    imgpant = loadImage("../assets/eyes/eyes-pant.png");
}

function setup () {
    createCanvas(128*scal, 128*scal);
    noFill();
    background(0,0,30);
    for (col of colorList) {
        for(i = 0; i < col[2]; i++) {
            squareList.push(col[1]);
        }
    }
    var frate = 20;
    frameRate(frate);

    // ダイスを整数化
    let imgDice = int(imgDiceFloat);

    //読み込んだ画像の表示
    if (imgDice%2 === 0){
        image(imgpant, 0, 0, 96*scal, 96*scal);
    } else {
        image(imgskirt, 0,0, 96*scal, 96*scal);
    }
    console.log(imgDiceFloat);
}

function draw() {    
    let placeDiceLeft = int(random(leftCells.length));
    let placeDiceRight = int(random(rightCells.length));

    let colorDiceLeft = int(random(colorList.length));
    let colorDiceRight = int(random(colorList.length));
    
    fill(colorList[colorDiceRight][1]);
    noStroke();
    rect(rightCells[placeDiceRight][0], rightCells[placeDiceRight][1], scal, scal);

    fill(colorList[colorDiceLeft][1]);
    noStroke();
    rect(leftCells[placeDiceLeft][0], leftCells[placeDiceLeft][1], scal, scal);

	fill(255, 255, 255);
	noStroke();
    textSize(28);
    textFont(font);
    textAlign(RIGHT);
	text("colorDiceRight: " + colorDiceRight, 10,38, width);

    //console.log(colorDiceLeft);
}
