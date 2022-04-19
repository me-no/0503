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
    ["blueline" , "#002136", 8],
    ["white" , "#ffffff",  40],
]

var squareList = [];

let img;
let font;

function preload() {
    // Font
    font = loadFont("../assets/misaki_gothic.ttf");

    // Images
    img = loadImage("../assets/append/hackle-append-head.png");
    imgbtm = loadImage("../assets/append/hackle-append-chin.png");
}

function setup () {
    createCanvas(256, 350);
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
    image(img, 0, 0);//top
    //image(img, 0, 112);//bottom
    image(imgbtm, 0, 160);
    
    for (k = 0; k<48; k++) {//top => k=80, bottom => k=128, bottom2 => k=112, chin => k=48
        i = k - int(k/16)*16;
        j = int(k/16) + 7;//top => +11, head => +7
        //j = int(k/16);
        len = squareList.length;//squareList の長さ
        d = int(random(len));
        //d番目の色でドットを描く
        noStroke();
        fill(squareList[d]);
        rect(i*16, j*16, 16, 16);
        squareList.splice(d, 1);

        /* 先頭一行だけ青固定する場合はこちら
        if (k < 16) {
            noStroke();
            fill(squareList[i]);
            rect(i*16, j*16, 16,16);
            squareList.splice(i, 1)
        } else {
            d = int(random(len));
            //d番目の色でドットを描く
            noStroke();
            fill(squareList[d]);
            rect(i*16, j*16, 16, 16);
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
    textSize(14);
    textFont(font);
	text("オリさく！#2", 20, 280);
	text(str, 20, 300);
    textAlign(RIGHT);
    fill(100,100, 130);
    textSize(12);
    text("#ドット絵再考察", 0, 325, width);
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
