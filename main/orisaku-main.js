/* //normal
var colorList = [//name, code, tileNumber
 ["birth", "#438cb5", 72],//438cb5
 ["blueline" , "#002136", 36],
 ["bk" , "#000009", 2],
 ["white" , "#ffffff",  14],
 ["orangeb" , "#ee852e", 13],
 ["orangen" , "#fbbc25", 23],
 ["yellow" , "#ffdb03", 6],
 ["skinb" , "#f3d48f", 34],
 ["skinn" , "#ffecae", 44],
 ["cianb" , "#006467", 2],
 ["ciann" , "#008080", 2],
 ["pink" , "#c74d64", 3],
 ["brown" , "#342832", 5]
];*/
/*  //bottom2
var colorList = [//name, code, tileNumber
 ["birth", "#438cb5", 39],//438cb5
 ["blueline" , "#002136", 18],
 ["orangeb" , "#ee852e", 9],
 ["orangen" , "#fbbc25", 9],
 ["skinb" , "#f3d48f", 16],
 ["skinn" , "#ffecae", 21],
];
*/
// middle
var  colorList = [
    ["birth", "#438cb5", 7],//438cb5
    ["blueline" , "#002136", 4],
    ["bk" , "#000009", 2],
    ["white" , "#ffffff",  14],
    ["orangen" , "#fbbc25", 3],
    ["skinb" , "#f3d48f", 6],
    ["skinn" , "#ffecae", 10],
    ["brown" , "#342832", 2]   
]

var scal = 32;

var squareList = [];

let img;
let font;

function preload() {
    // Font
    font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    //img = loadImage("assets/hackle-top.png");
    //img = loadImage("assets/hackle-bottom2.png");
    img = loadImage("../assets/main/hackle-head.png");
    imgbtm = loadImage("../assets/main/hackle-chin.png");
}

function setup () {
    createCanvas(256*2, 350*2);
    noFill();
    background(0,0,30);
    for (col of colorList) {
        for(i = 0; i < col[2]; i++) {
            squareList.push(col[1]);
        }
    }
}

function draw() {
    //読み込んだ画像の表示
    image(img, 0, 0, 512, 224);//top
    //image(img, 0, 112);//bottom
    image(imgbtm, 0, 160*2, 512, 192);
    
    for (k = 0; k<48; k++) {//top => k=80, bottom => k=128, bottom2 => k=112, chin => k=48
        i = k - int(k/16)*16;
        j = int(k/16) + 7;//top => +11, head => +7
        //j = int(k/scal);
        len = squareList.length;//squareList の長さ
        d = int(random(len));
        //d番目の色でドットを描く
        noStroke();
        fill(squareList[d]);
        rect(i*scal, j*scal, scal, scal);
        squareList.splice(d, 1);
        console.log(i);

        /* 先頭一行だけ青固定する場合はこちら
        if (k < scal) {
            noStroke();
            fill(squareList[i]);
            rect(i*scal, j*scal, scal,scal);
            squareList.splice(i, 1)
        } else {
            d = int(random(len));
            //d番目の色でドットを描く
            noStroke();
            fill(squareList[d]);
            rect(i*scal, j*scal, scal, scal);
            squareList.splice(d, 1);
        }
        */
    }
    //タイトルと日付を挿入
    var dt    = new Date();
    var year  = dt.getFullYear();
    var month = dt.getMonth()+1;
    var date  = dt.getDate();
	var hours   = dt.getHours();
	var minutes = dt.getMinutes();
	var seconds = dt.getSeconds();
    // Format
	var str = year + "/" + month + "/" + date + " " + mkSign(hours, minutes, seconds);
	fill(255, 255, 255);
	noStroke();
    textSize(28);
    textFont(font);
	text("オリさく！#2", 20, 280*2);
	text(str, 20, 300*2);
    textAlign(RIGHT);
    fill(100,100, 130);
    textSize(24);
    text("#ドット絵再考察", 0, 325*2, width);
    //textSize(10);
    //text("@RyntaloL", 0, 340, width);

    noLoop();
}

function mkSign(hours, minutes, seconds) {
    if(hours < 10)   hours   = "0" + hours;
	if(minutes < 10) minutes = "0" + minutes;
	if(seconds < 10) seconds = "0" + seconds;
	var str = hours + ":" + minutes + ":" + seconds;
	return str;
}
