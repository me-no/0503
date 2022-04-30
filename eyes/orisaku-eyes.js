var colorList = [//name, code, tileNumber
 ["blueline" , "#002136"],
 ["darkbrown" , "#684c3c"],
 ["lightbrown" , "#c39a5a"],
 ["skin", "#f3d48f"],
 ["white" , "#ffffff"],
 ["birth", "#438cb5"],//438cb5
];

// キャンバスサイズに関わる変数
var scal = 4;
var xSize = 128*scal;
var ySize = 128*scal;

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

// ベジェ曲線の固定点
var x1 = 0;
var y1 = ySize/2 + ySize/4;
var x2 = xSize;
var y2 = ySize/2 + ySize/4;

// その他の変数
var squareList = [];

let font;
let imgDiceFloat = Math.random()*10;

function preload() {
    // Font
    font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    imgskirt = loadImage("../assets/eyes/eyes-skirt.png");
    imgpant = loadImage("../assets/eyes/eyes-pant.png");
    imgskirtbtm = loadImage("../assets/eyes/eyes-skirt-bottom.png");
    imgpantbtm = loadImage("../assets/eyes/eyes-pant-bottom.png");
}

function setup () {
    createCanvas(xSize, ySize);
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
    // ダイスを整数化
    let imgDice = int(imgDiceFloat);

    fill(0,0,30);
    noStroke();
    rect(0,ySize/3,width,ySize);
    // 変数の決定
    let placeDiceLeft = int(random(leftCells.length));
    let placeDiceRight = int(random(rightCells.length));

    let colorDiceLeft = int(random(colorList.length));
    let colorDiceRight = int(random(colorList.length));
    
    // 背景の曲線の描画
    stroke(255,255,255,50);
    strokeWeight(5);
    noFill();
    bezier(x1,y1,xSize/4,placeDiceLeft*100+ySize/4, (xSize/4)*3, (ySize-placeDiceRight*100)+ySize/4,x2,y2);
    stroke(255,255,255,90);
    strokeWeight(1);
    noFill();
    bezier(x1,y1,xSize/4,placeDiceLeft*100+ySize/4, (xSize/4)*3, (ySize-placeDiceRight*100)+ySize/4,x2,y2);

    // 曲線の上からドット絵を描画
    if(imgDice%2 === 0) {
        image(imgpantbtm, 0, 0, 96*scal, 96*scal);
    } else {
        image(imgskirtbtm, 0, 0, 96*scal, 96*scal);
    }


    // 目の描画
    fill(colorList[colorDiceRight][1]);
    noStroke();
    rect(rightCells[placeDiceRight][0], rightCells[placeDiceRight][1], scal, scal);

    fill(colorList[colorDiceLeft][1]);
    noStroke();
    rect(leftCells[placeDiceLeft][0], leftCells[placeDiceLeft][1], scal, scal);

    // テキストの描画
    fill(0,0,30);
    rect(width-30, 0, 28, (20+28)*2);
	fill(255, 255, 255);
	noStroke();
    textSize(28);
    textFont(font);
    textAlign(RIGHT);
	text("colorDiceRight: " + colorDiceRight, 10,38, width);
	text("colorDiceLeft: " + colorDiceLeft, 10,38*2, width);

    //console.log(colorDiceLeft);
}
