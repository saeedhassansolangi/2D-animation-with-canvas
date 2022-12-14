class Circle {
  constructor(x, y, maxRadius = 100) {
    this.x = x;
    this.y = y;

    this.r = Math.floor(Math.random() * maxRadius);
    this.color = "white";
  }

  draw(context) {
    this.context = context;
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, 3 * Math.PI, false);
    context.closePath();
    context.fillStyle = this.color;
    context.fill();
  }

  move(canvasWidth = 400, canvasHeight = 700) {
    this.x += 1;
    this.y += 1;

    if (this.x + this.r > canvasWidth) {
      this.x = 0 - this.r;
    }
    if (this.y + this.r > canvasHeight) {
      this.y = 0 - this.r;
    }

    this.draw(this.context);
  }
}

let canvas = document.querySelector("canvas");

let context = canvas.getContext("2d");

let textPosition = {
  x: 0,
  y: 0,
};

let speed = 4;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  this.window.location.reload();
});

function run() {
  canvas.addEventListener("mousemove", function (event) {
    for (let circle of circles) {
      if (
        event.clientX >= circle.x - circle.r &&
        event.clientX <= circle.x + circle.r &&
        event.clientY >= circle.y - circle.r &&
        event.clientY <= circle.y + circle.r
      ) {
        circle.r += 1;
        circle.draw(context);
      }
    }
  });

  canvas.addEventListener("click", function (event) {
    let circle = new Circle(event.clientX, event.clientY, 20);
    circles.push(circle);
    circle.draw(context);
  });

  let circles = [];

  for (let i = 0; i < 200; i++) {
    let circle = new Circle(
      Math.random() * canvas.width,
      Math.random() * canvas.height,
      Math.random() * 5
    );
    circles.push(circle);
    circle.draw(context);
  }

  function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var circle of circles) {
      circle.move(canvas.width, canvas.height);
    }

    context.font = "60px cursive";
    context.fillStyle = "black";
    context.fillText("Buy Now ", 320, 300);
    context.fillStyle = "red";
    context.fillText("ONLINE", 320, 400);

    requestAnimationFrame(animate);
  }

  animate();
}

let count = 0;

let myFont = new FontFace("PT Mono", "url(./PTMono-Regular.ttf)");

myFont
  .load()
  .then(function (loadedFont) {
    console.log("loaded");
    document.fonts.add(loadedFont);
    counter();
  })
  .catch((err) => console.log(err));

function counter() {
  let id = setInterval(function () {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (count < 4) {
      context.font = "150px cursive";
      context.fillStyle = "white";
      context.lineJoin = "round";
      context.shadowColor = "white";
      context.shadowBlur = 20;
      context.shadowOffsetX = 2;
      context.shadowOffsetY = 2;
      context.fillText(count, 450, canvas.height / 2);
      count++;
    } else {
      clearInterval(id);
      context.shadowColor = "none";
      context.shadowBlur = 0;
      context.shadowOffsetX = 0;
      context.shadowOffsetY = 0;
      animateText();
    }
  }, 1000);
}

async function animateText() {
  if (textPosition.y <= canvas.height / 2) {
    textPosition.y += speed;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "100px Arial";
    context.fillStyle = "white";
    context.lineJoin = "round";
    context.fillText("Hello", 350, textPosition.y);
    context.font = "70px PT Mono";
    context.fillText("There are some", 150, canvas.height / 2 + 100);
    requestAnimationFrame(animateText);
  } else {
    await wait(3);
    speed = 3;
    const img = new Image();
    img.onload = function () {
      context.drawImage(img, -100, 0, canvas.width + 200, canvas.height);

      runText(async function () {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "red";
        context.font = "100px  cursive";
        context.fillText("NOW", 300, 250);
        context.fillStyle = "white";
        context.fillText("AVAILABLE", 190, 400);
        context.fillStyle = "black";
        context.fillText("IN STOCK", 220, 550);
        await wait(3);
        showCover("fabria garcia", "DRESS");
      });
    };
    img.src = "./yellowbg.png";
  }
}

function showCover(ftext, stext) {
  const img = new Image();
  img.onload = async function () {
    context.drawImage(img, 0, 0, canvas.width / 2, canvas.height);
    coverText(ftext, stext);
    await wait(2);
    coverText("limited edition", "dress");
    await wait(2);
    coverText("limited ", "quantities");
    await wait(2);
    coverText("free ", "shipping");
    await wait(2);
    coverText("and ", "many more");
    await wait(2);
    run();
  };
  img.src = "./men.png";
}

function coverText(ftext, stext) {
  context.clearRect(canvas.width / 2, 0, canvas.width, canvas.height);
  context.fillStyle = "dodgerblue";
  context.font = "40px PT Mono";
  context.fillText(ftext, canvas.width / 2 + 50, 260);
  context.fillStyle = "black";
  context.font = "60px cursiva";
  context.fillText(stext, canvas.width / 2 + 120, 350);
}

async function runText(cb) {
  context.font = "120px PT Mono";
  context.fillStyle = "green";
  context.fillText("Products", canvas.width / 4 - 50, canvas.height / 2);
  await wait(2);
  cb();
}

function wait(seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}
