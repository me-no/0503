let img;
let font;

function preload() {
    // Font
    font = loadFont("../../assets/misaki_gothic.ttf");

    // Images
    img = loadImage("../../assets/hidden/icnhackle.png");
}

function setup () {
    let canvas = createCanvas(256*2, 350*2);
    noFill();
    background(0,0,30);
    canvas.parent('canvas');
}

function draw() {
    //読み込んだ画像の表示
    image(img, 0, 0, 512, 512);//top
    
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
	text("オリさく！#2", 20*2, 280*2);
	text(str, 20*2, 300*2);
    textAlign(RIGHT);
    fill(100,100, 130);
    textSize(24);
    text("#ドット絵再考察", 0, 325*2, width);
    text("# Hackle くん発見", 0, 345*2, width);
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
