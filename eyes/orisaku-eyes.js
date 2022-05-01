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
var x2 = xSize*1;
var y2 = (ySize/2 + ySize/4)*1;
// 直交する線上の点
var vert = -(x2-x1)/(y2-y1);
var xx1 = x1;
var yy1 = y1 + ySize/6;
var xx2 = x1 + xSize/6;
var yy2 = yy1 + vert * (xx2-xx1);
var vv1 = x2 - xSize/10;
var ww1 = y2 + ySize/6;
var vv2 = x2 + xSize/16;
var ww2 = ww1 + vert * (vv2-vv1);

// パーリンノイズ初期値
var paraNoiseL = 0.005;
var paraNoiseR = 0.01;

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
    // #########################################
    // ランダムとパーリンノイズの切り替えポイントその1
    // #########################################
    // ランダム関数の場合
    let placeDiceLeftFloat = random(leftCells.length);
    let placeDiceRightFloat = random(rightCells.length);
    let placeDiceLeft = int(placeDiceLeftFloat);
    let placeDiceRight = int(placeDiceRightFloat);

    let colorDiceLeft = int(random(colorList.length));
    let colorDiceRight = int(random(colorList.length));

    let mapToColorL = map(placeDiceLeft, 0,leftCells.length,0,colorList.length);
    let mapToColorR = map(placeDiceRight, 0, rightCells.length, 0, colorList.length);
    //let colorDiceLeft = int(mapToColorL);
    //let colorDiceRight = int(mapToColorR);

    // パーリンノイズの場合
    let placeNoiseLeftFloat = noise(paraNoiseL);
    let placeNoiseLeftMap = map(placeNoiseLeftFloat, 0, 1, 0, leftCells.length);
    let placeNoiseLeft = int(placeNoiseLeftMap);
    let placeNoiseRightFloat = noise(paraNoiseR);
    let placeNoiseRightMap = map(placeNoiseRightFloat, 0, 1, 0, rightCells.length);
    let placeNoiseRight = int(placeNoiseRightMap);
    
    // ##############################################
    // ランダムとパーリンノイズの切り替えポイントその1 ここまで
    // ##############################################

    // 背景の曲線の描画
    stroke(255,0,0);
    noFill();
    //line(x1, y1, x2,y2);
    //line(xx1, yy1, xx2, yy2);
    //line(vv1, ww1, vv2, ww2);


    // #########################################
    // ランダムとパーリンノイズの切り替えポイントその2
    // #########################################
    // ランダムの場合
    // 開始アンカーポイント
    var anchorx1 = xx1 + (xx2-xx1)*(leftCells.length - placeDiceLeftFloat)/leftCells.length;
    var anchory1 = vert * (anchorx1 - xx1) + yy1;
    // 終了アンカーポイント
    var anchorx2 = vv1 + (vv2-vv1)*(rightCells.length - placeDiceRightFloat)/rightCells.length;
    var anchory2 = vert * (anchorx2 - vv1) + ww1;
    // アンカーポイントを描画
    //rect(anchorx1, anchory1, scal, scal);
    //rect(anchorx2, anchory2, scal, scal);

    /*
    // パーリンノイズの場合
    // 開始アンカーポイント
    var anchorx1 = xx1 + (xx2-xx1)*placeNoiseLeft/10;
    var anchory1 = vert * (anchorx1 - xx1) + yy1;
    // 終了アンカーポイント
    var anchorx2 = vv1 + (vv2-vv1)*placeNoiseRight/10;
    var anchory2 = vert * (anchorx2 - vv1) + ww1;
    // アンカーポイントを描画
    //rect(anchorx1, anchory1, scal, scal);
    //rect(anchorx2, anchory2, scal, scal);
    */
    // ノイズの更新
    paraNoiseL += 0.1;
    paraNoiseR += 0.3;
    // ##############################################
    // ランダムとパーリンノイズの切り替えポイントその2 ここまで
    // ##############################################


    stroke(103,96,127,30);
    strokeWeight(2);
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
    // #######################################
    // ランダムとパーリンノイズの切り替えポイントその2
    // #######################################

    // ランダムの場合
    fill(colorList[colorDiceRight][1]);// 右目
    noStroke();
    rect(rightCells[placeDiceRight][0] +a, rightCells[placeDiceRight][1] +b, scal, scal);
    fill(colorList[colorDiceLeft][1]);// 左目
    noStroke();
    rect(leftCells[placeDiceLeft][0] +a, leftCells[placeDiceLeft][1] +b, scal, scal);
    /*
    // パーリンノイズの場合
    fill(colorList[colorDiceRight][1]);// 右目
    noStroke();
    rect(rightCells[placeNoiseRight][0] +a, rightCells[placeNoiseRight][1] +b, scal, scal);
    fill(colorList[colorDiceLeft][1]);// 左目
    noStroke();
    rect(leftCells[placeNoiseLeft][0] +a, leftCells[placeNoiseLeft][1] +b, scal, scal);
    */
    // ##############################################
    // ランダムとパーリンノイズの切り替えポイントその2 ここまで
    // ##############################################

    // テキストの描画
    fill(255);
    rect(width-30, ySize/3-28*2, 28, (20+28)*4);
	fill(103,96,127);
	noStroke();
    textSize(24);
    textFont(font);
    textAlign(RIGHT);
	text("placeDiceLeft: " + placeDiceLeft, 0,38-28*2+ySize/3, width);
	text("placeDiceRight: " + placeDiceRight, 0,38-28+ySize/3, width);
	text("placeNoiseLeft: " + placeNoiseLeft, 0,38+ySize/3, width);
	text("placeNoiseRight: " + placeNoiseRight, 0, 38+28+ySize/3, width);
	text("colorDiceLeft: " + colorDiceLeft, 0, 38+28*2+ySize/3, width);
	text("colorDiceRight: " + colorDiceRight, 0, 38+28*3+ySize/3, width);

    fill(255);
    noStroke();
    textSize(10);
    text("#ドット絵再考察", 0, y2-15, width);
    text("さよならさんすう", 0, y2, width);
}
