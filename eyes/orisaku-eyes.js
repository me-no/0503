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
var xSize = 256*scal;
var ySize = 256*scal;
// 絵の開始点
var a = xSize/6;
var b = ySize/6;

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
var x1 = 50*scal+a;
var y1 = 70*scal+b;
var x2 = xSize;
var y2 = ySize/2 + ySize/4;
// 直交する線上の点
var vert = -(x2-x1)/(y2-y1);
var xx1 = x1;
var yy1 = y1 + ySize/6;
var xx2 = x1 + xSize/8;
var yy2 = yy1 + vert * (xx2-xx1);


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
    background(255);
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
        image(imgpant, a, b, 96*scal, 96*scal);
    } else {
        image(imgskirt, a, b, 96*scal, 96*scal);
    }
    console.log(imgDiceFloat);
}

function draw() {    
    // ダイスを整数化
    let imgDice = int(imgDiceFloat);

    fill(0,0,30);
    noStroke();
    //rect(0,ySize/3,width,ySize);
    // 変数の決定
    let placeDiceLeftFloat = random(leftCells.length);
    let placeDiceRightFloat = random(rightCells.length);
    let placeDiceLeft = int(placeDiceLeftFloat);
    let placeDiceRight = int(placeDiceRightFloat);

    let colorDiceLeft = int(random(colorList.length));
    let colorDiceRight = int(random(colorList.length));
    
    // 背景の曲線の描画
    stroke(255,0,0);
    noFill();
    line(x1, y1, x2,y2);
    line(xx1, yy1, xx2, yy2);

    //bezier(x1,y1,x1+(x2-x1)/2,placeDiceLeftFloat*30+y1+(y2-y1)/4,x1+(x2-x1)/2,placeDiceLeftFloat*30+y1+(y2-y1)/4,x2,y2);
    // 交点
    var x0 = x1+(x2-x1)/4;
    var y0 = (y2+3*y1)/4;
    // 開始アンカーポイント
    var parax = xx1 + (xx2-xx1)*(leftCells.length - placeDiceLeftFloat)/leftCells.length;
    var paray = vert * (parax - xx1) + yy1;
    var anchorx1 = parax;//(-leftCells.length + placeDiceLeftFloat)*10+x1;
    var anchory1 = paray;//(-x2+x1)/(y2-y1)*(anchorx1-x0)+y0;
    var anchorx2 = (-rightCells.length + placeDiceRightFloat)*10+x2;
    var anchory2 = (-x2+x1)/(y2-y1)*(anchorx2-(x2-x1)/4-x2)+(y2-y1)/4+y2;
    // アンカーポイントを描画
    rect(anchorx1, anchory1, scal, scal);
    rect(anchorx2, anchory2, scal, scal);
    console.log(paray);

    stroke(103,96,127,10);
    strokeWeight(7);
    noFill();
    // 曲線を描画
    bezier(x1,y1,anchorx1, anchory1,anchorx2,anchory2,x2,y2);
    stroke(103,96,127,30);
    strokeWeight(1);
    noFill();
    //bezier(x1,y1,x1+(x2-x1)/2,placeDiceLeftFloat*30+y1+(y2-y1)/4,x1+(x2-x1)/2,placeDiceLeftFloat*30+y1+(y2-y1)/4,x2,y2);
    //console.log(-leftCells.length + placeDiceLeftFloat);

    // 曲線の上からドット絵を描画
    if(imgDice%2 === 0) {
        image(imgpantbtm, a, b, 96*scal, 96*scal);
    } else {
        image(imgskirtbtm, a, b, 96*scal, 96*scal);
    }


    // 目の描画
    fill(colorList[colorDiceRight][1]);
    noStroke();
    rect(rightCells[placeDiceRight][0] +a, rightCells[placeDiceRight][1] +b, scal, scal);

    fill(colorList[colorDiceLeft][1]);
    noStroke();
    rect(leftCells[placeDiceLeft][0] +a, leftCells[placeDiceLeft][1] +b, scal, scal);

    // テキストの描画
    fill(255);
    rect(width-30, ySize/3, 28, (20+28)*2);
	fill(103,96,127);
	noStroke();
    textSize(28);
    textFont(font);
    textAlign(RIGHT);
	text("colorDiceRight: " + colorDiceRight, 10,38+ySize/3, width);
	text("colorDiceLeft: " + colorDiceLeft, 10, 38*2+ySize/3, width);

    //console.log(colorDiceLeft);
}
