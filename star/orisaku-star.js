var  skyColors = [
    [41,39,79],
    [70,82,130],
    [96,117,160]
]

var starColors = [
    [255,219,3],
    [140,117,160],
    [255,255,255]
]

var scal = 8;

let img;

function preload() {
    // Font
    font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    //img = loadImage("assets/hackle-top.png");
    //img = loadImage("assets/hackle-bottom2.png");
    img = loadImage("../assets/star/hackle-star-back.png");
}

function setup () {
    createCanvas(1024, 1024);
    noFill();
    background(0,33,54);
}

function draw() {
    // 等倍のサイズは128x128
    // 8倍で座標を決める
    // 円の半径を決める
    // ランダムな円を108 個生成
    for (k=0; k<108; k++) {
        x = int(random(0, 128))*8;
        y = int(random(0, 128))*8;
        r = int(random(2, 15))*2-1;// 奇数で出力
        tr = random(50, 200);
        d = int(random(0,skyColors.length));
        colr = skyColors[d][0];
        colg = skyColors[d][1];
        colb = skyColors[d][2];
        for (i = 0; i < r; i++) {
            ii = i*2+1;
            j = (r - ii)/2;
            l = r - j*2;
            noStroke();
            fill(colr, colg, colb, tr);
            for (t = 0; t<l; t++) {
                //rect(x+t*scal, y+i*scal, scal,scal);// triangle1
                //rect(x+j*scal+t*scal, y+i*scal, scal,scal);// triangle2
                rect(x+j*scal+t*scal, y+i*scal, scal,scal);
                if(i!=r-1){
                    rect(x+j*scal+t*scal, y+2*r*scal-i*scal-scal*2, scal, scal);
                }
            }
        }
    }

    // ランダムな星を生成_小
    for (k = 0; k < 5000; k++) {
        x = int(random(0, 128)*scal);
        y = int(random(0, 128)*scal);
        r = int(random(1,3));
        tr = random(50,100);
        d = int(random(0, starColors.length));
        colr = starColors[d][0];
        colg = starColors[d][1];
        colb = starColors[d][2];
        noStroke();
        fill(colr, colg, colb, tr);
        rect(x, y, r/4*scal, r/4*scal);
    }

    // ランダムな星を生成
    starColors.splice(0,1);
    for (k = 0; k < 500; k++) {
        x = int(random(0, 128)*scal);
        y = int(random(0, 128)*scal);
        r = int(random(1,3));
        tr = random(100,200);
        d = int(random(0, starColors.length));
        colr = starColors[d][0];
        colg = starColors[d][1];
        colb = starColors[d][2];
        noStroke();
        fill(colr, colg, colb, tr);
        rect(x, y, r/2*scal, r/2*scal);
    }

    //読み込んだ画像の表示
    image(img, 0, scal*8);//top
    noLoop();
}