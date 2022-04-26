var scal = 4;

var topX_1 = 83*scal;
var topY_1 = 64*scal;
var topX_2 = 100*scal;
var topY_2 = 102*scal;
var topX_3 = 109*scal;
var topY_3 = 121*scal;

var width_1 = 98*scal;
var height_1 = 118*scal;
var width_2 = 60*scal; 
var height_2 = 71*scal;
var width_3 = 41*scal; 
var height_3 = 47*scal;

var nisX = topX_1;
var nisY = topY_1;

var noiseValX = Math.random()*100;
var noiseValY = Math.random()*100;

var yval = 0;
var yval2 = 1;
var yval3 = 0.5;
var ylefttop = Math.random(1);
var yleftmid = Math.random(1,2);
var yrighttop = Math.random(2,3);
var yrightmid = Math.random(3,4);

let img;

var noiseVar = 1;

function preload() {
    // Font
    font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    imgbk = loadImage("../assets/koi/koi_bk.png");
    imghk = loadImage("../assets/koi/hackle_koi.png");
    koibl = loadImage("../assets/koi/koibl.png");// 鯉たちは1/4スケールで描画すること. 144x256
    koiaq = loadImage("../assets/koi/koiaq.png");
    koiye = loadImage("../assets/koi/koiye.png");
    koired = loadImage("../assets/koi/koired.png");
}

function setup () {
    createCanvas(1024, 1024);
    noFill();
    background(255);
}

function draw() {
    //読み込んだ画像の表示
    image(imgbk, 0, 0, 1024, 1024);

    // 左斜一段目
    var xlefttop = 0;
    for (i = 0; i < 12; i++){
        var y = map(noise(xlefttop, ylefttop), 0, 1, topY_1-4*scal, topY_1+4*scal);
        var x = topX_3 - (topX_3-topX_1)/10*i;
        var wid_i = map(i, 0, 11, 9, 36);
        var hei_i = map(i, 0, 11, 16, 64);
        var k = (topY_3-topY_1)/(topX_3-topX_1);
        image(koiye, x, y+scal*4+k*(x-topX_1) , wid_i, hei_i);
        xlefttop += 0.02;
    }
    ylefttop += 0.01;

    // 左斜2段目
    var xleftmid = 0;
    for (i = 0; i < 12; i++){
        var y = map(noise(xleftmid, yleftmid), 0, 1, topY_1-4*scal, topY_1+4*scal);
        var x = topX_3 - (topX_3-topX_1)/10*i;
        var wid_i = map(i, 0, 11, 9, 36);
        var hei_i = map(i, 0, 11, 16, 64);
        var k = (topY_3-topY_1)/(2*(topX_3-topX_1));
        image(koiye, x, y+scal*4+k*(x-topX_1) + height_1/3, wid_i, hei_i);
        xleftmid += 0.02;
    }
    yleftmid += 0.01;

    // 右斜一段目
    var xrighttop = 0;
    for (i = 0; i < 12; i++){
        var y = map(noise(xrighttop, yrighttop), 0, 1, topY_3-4*scal, topY_3+4*scal);
        var x = topX_3+width_3 + (topX_3-topX_1)/10*i;
        var wid_i = map(i, 0, 11, 9, 36);
        var hei_i = map(i, 0, 11, 16, 64);
        var k = (topY_3-topY_1)/(topX_3-topX_1);
        image(koiaq, x-36, y+scal*4-k*(x-(topX_3+width_3)), wid_i, hei_i);
        xrighttop += 0.02;
    }
    yrighttop += 0.01;

    // 右斜2段目
    var xrightmid = 0;
    for (i = 0; i < 12; i++){
        var y = map(noise(xrightmid, yrightmid), 0, 1, topY_3-4*scal, topY_3+4*scal);
        var x = topX_3+width_3 + (topX_3-topX_1)/10*i;
        var wid_i = map(i, 0, 11, 9, 36);
        var hei_i = map(i, 0, 11, 16, 64);
        var k = (topY_3-topY_1)/(2*(topX_3-topX_1));
        image(koired, x-36, y+scal*4-k*(x-(topX_3+width_3)) + height_3/4, wid_i, hei_i);
        xrightmid += 0.02;
    }
    yrightmid += 0.01;

    // 横1列目
    var xval = 0;
    for (i = 0; i < 9; i++) {
        var y =  map(noise(xval, yval), 0, 1, topY_1-4*scal, topY_1+4*scal);

        image(koibl, topX_1 + (width_1 / 10 * i)+y-topY_1, y , 36,64);
        xval += 0.05;
    }
    //endShape(CLOSE);
    yval += 0.015;
    
    // 横2列目
    var xval2 = 0;
    for (i = 0; i < 9; i++) {
        var y =  map(noise(xval2, yval2), 0, 1, topY_2-4*scal, topY_2+4*scal);

        image(koiaq, topX_2 + (width_2 / 10 * i)+y-topY_2, y , 18,32);
        xval2 += 0.03;
    }
    //endShape(CLOSE);
    yval2 += 0.01;
    
    // 横3列目
    var xval3 = 0.1;
    for (i = 0; i < 9; i++) {
        var y =  map(noise(xval3, yval3), 0, 1, topY_3-4*scal, topY_3+4*scal);

        image(koired, topX_3 + (width_3 / 10 * i)+y-topY_3, y , 12,24);
        xval3 += 0.02;
    }
    //endShape(CLOSE);
    yval3 += 0.005;
    
    /*
    for (i = 0; i < 9; i++) {
        image(koired, topX_3 + (width_3 / 10 * i), topY_3+noise(nisY)*10/2, 12, 24);
        nisY += noise(noiseValY);
        noiseValY += 0.002;
    }
    */

    // Hackle くんの表示
    image(imghk, 0,0,1024,1024);
}

/*
function Gaussian(x){
    return 1/(pow(2*PI,1/2)) * Math.exp(- pow(x,2)/2)
}
*/