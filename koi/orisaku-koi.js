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
    background(0,33,54);
}

function draw() {
    //読み込んだ画像の表示
    image(imgbk, 0, 0, 1024, 1024);

    // 左斜一段目
    var xlefttop = 0;
    for (i = 0; i < 9; i++){
        var y = map(noise(xlefttop, ylefttop), 0, 1, topY_1-4*scal, topY_1+4*scal);
        var x = ((topX_3-topX_1)/10*i);
        image(koiye, topX_1 + x, y+(topY_3-topY_1)/(topX_3-topX_1)*x , 18,24);
        xlefttop += 0.02;
    }
    ylefttop += 0.01;

    // 横1列目
    /*
    for (i = 0; i < 9; i++) {
        image(koibl, nisX + (width_1 / 10 *i), topY_1 + nisY , 36, 64);
        //nisX += noise(noiseValX)-0.4;
        nisY = noise(noiseValY);
        noiseValY += 0.02;
        //noiseValX += 0.02;
        //console.log(nisY);
    }*/
    //beginShape();
    var xval = 0;
    for (i = 0; i < 9; i++) {
        var y =  map(noise(xval, yval), 0, 1, topY_1-4*scal, topY_1+4*scal);

        //Gaussian
        /*
        var distX = mouseX - i;
        var gaussianX = map(distX, -width, width, -5, 5);
        var gaussianY = map(Gaussian(gaussianX), 0, 0.4, mouseY/4, 0);
        
        image(koibl, topX_1 + (width_1 / 10 * i), y + gaussianY, 36,64);
        */

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