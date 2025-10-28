let terminalX, terminalY;
let terminalWidth = 600;
let terminalHeight = 400;
let isDragging = false;
let offsetX, offsetY;
let cursorImg; 
let rotation = 0; 

const terminalContent = [
  "Last login: Wed Oct 18 14:32:45 on ttys003",
  "user@mincy's macbook-pro ~ % cd /projects",
  "user@mincy's macbook-pro projects % ./build.sh",
  "Building project...",
  "Compiling src/main.c...",
  "Linking libraries...",
  "Optimizing binary...",
  "Segmentation fault: 11",
  "user@mincy's macbook-pro projects % "
];

function preload() {
  cursorImg = loadImage('主题.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  terminalX = (width - terminalWidth) / 2;
  terminalY = (height - terminalHeight) / 2;
  noCursor();
  
}

function draw() {
  background(240);
  

  drawTerminal();
  
  rotation += 10;
  push();
  translate(mouseX, mouseY);
  rotate(radians(rotation));
  imageMode(CENTER);
  image(cursorImg, 0, 0, 25, 25); 
  pop();
}

function drawTerminal() {
  push();
  fill(0, 100);
  rect(terminalX + 5, terminalY + 5, terminalWidth, terminalHeight, 12);
  filter(BLUR, 15);
  pop();

  fill(255);
  rect(terminalX, terminalY, terminalWidth, terminalHeight, 10);

  fill('#FAFAFA');
  rect(terminalX, terminalY, terminalWidth, 30, 10, 10, 0, 0);

  fill('#FF6058');
  ellipse(terminalX + 15, terminalY + 15, 12, 12);
  fill('#FEBC2E');
  ellipse(terminalX + 36, terminalY + 15, 12, 12);
  fill('#27C840');
  ellipse(terminalX + 57, terminalY + 15, 12, 12);
  noStroke();
  
  fill('#4A4A4A');
  textSize(14);
  textAlign(CENTER, CENTER);
  textFont('Inter');
  textStyle(BOLD);
  text("mincy —— -zsh —— 80x24", terminalX + terminalWidth/2, terminalY + 15);
  textStyle(NORMAL);


  fill(0);
  textSize(11);
  textFont('Menlo');
  textAlign(LEFT, TOP);
  let textY = terminalY + 35;
  const lineHeight = 16;
  
  for (let i = 0; i < terminalContent.length; i++) {
    text(terminalContent[i], terminalX + 6, textY);
    textY += lineHeight;

    if (i === terminalContent.length - 1) {
      let cursorXPos = terminalX + 4 + textWidth(terminalContent[i]);
      fill(57, sin(frameCount * 0.1) * 0.5 + 0.5 * 255);
      rect(cursorXPos, textY - lineHeight - 3, 7, 16);
    }
  }
}

function mousePressed() {
  if (mouseX > terminalX && mouseX < terminalX + terminalWidth &&
      mouseY > terminalY && mouseY < terminalY + 30) {
    isDragging = true;
    offsetX = mouseX - terminalX;
    offsetY = mouseY - terminalY;
  }
}

function mouseDragged() {
  if (isDragging) {
    terminalX = mouseX - offsetX;
    terminalY = mouseY - offsetY;
    terminalX = constrain(terminalX, 0, width - terminalWidth);
    terminalY = constrain(terminalY, 0, height - terminalHeight);
  }
}

function mouseReleased() {
  isDragging = false;
}

function keyPressed() {
  return false;
}