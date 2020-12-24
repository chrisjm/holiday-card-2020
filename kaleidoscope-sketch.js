// P5 exported functions (eslint flags)
/* exported preload, setup, draw */

const kaleidoscope = (sketch) => {
  let symmetry = 6;
  let clearButton;
  let saveButton;
  let slider;
  let sliderLabel;
  let canvasDimension;
  let lineStrokeWeight = 8;
  let welcomeScreen = true;

  const clearCanvas = function () {
    sketch.clear();
  };

  const saveCanvas = function () {
    sketch.saveCanvas("snowflake.png");
  };

  const sliderEvent = function () {
    lineStrokeWeight = slider.value();
    sliderLabel.elt.innerText = lineStrokeWeight;
  };

  const setCanvasDimension = function () {
    // Calculate max canvas dimension based on window size ratio
    if (sketch.windowWidth / sketch.windowHeight > 1) {
      canvasDimension = sketch.windowHeight;
      // Leave room for controls below
      canvasDimension = canvasDimension - 250;
    } else {
      canvasDimension = sketch.windowWidth;
      // Allow for x-axis space
      canvasDimension = canvasDimension - 50;
    }
  };

  sketch.preload = () => {};

  sketch.setup = () => {
    setCanvasDimension();

    // Create and setup canvas
    sketch.createCanvas(canvasDimension, canvasDimension);
    sketch.angleMode(sketch.DEGREES);

    // Control Buttons
    slider = sketch.createSlider(1, 32, lineStrokeWeight, 1);
    slider.input(sliderEvent);
    sliderLabel = sketch.createDiv(lineStrokeWeight);
    saveButton = sketch.createButton("save");
    saveButton.mousePressed(saveCanvas);
    clearButton = sketch.createButton("clear");
    clearButton.mousePressed(clearCanvas);

    // Welcome Screen
    const instructions =
      "Click or tap to draw a snowflake kaleidoscope-style.\n" +
      "Change line size using the slider.";
    sketch.textAlign(sketch.CENTER, sketch.CENTER);
    sketch.textSize(16);
    sketch.fill(255);
    sketch.text(instructions, 0, 0, canvasDimension, canvasDimension);

    // Gridlines
    // sketch.translate(sketch.width / 2, sketch.height / 2);
    // sketch.stroke(255, 0, 0);
    // let angle = 360 / symmetry;
    // for (let i = 0; i < symmetry; i++) {
    //   sketch.rotate(angle);
    //   sketch.line(0, 0, sketch.width, 0);
    // }
  };

  sketch.draw = () => {
    // Translate to center canvas
    sketch.translate(sketch.width / 2, sketch.height / 2);

    if (
      sketch.mouseX > 0 &&
      sketch.mouseX < sketch.width &&
      sketch.mouseY > 0 &&
      sketch.mouseY < sketch.height
    ) {
      // Close the Welcome screen if showing
      if (sketch.mouseIsPressed && welcomeScreen) {
        welcomeScreen = false;
        clearCanvas();
      }

      // Reposition mouse
      let mx = sketch.mouseX - sketch.width / 2;
      let my = sketch.mouseY - sketch.height / 2;
      let pmx = sketch.pmouseX - sketch.width / 2;
      let pmy = sketch.pmouseY - sketch.height / 2;

      // Paint
      if (sketch.mouseIsPressed) {
        sketch.stroke("rgba(255,255,255, 1)");
        let angle = 360 / symmetry;

        for (let i = 0; i < symmetry; i++) {
          sketch.rotate(angle);
          lineStrokeWeight = slider.value();
          sketch.strokeWeight(lineStrokeWeight);

          // Invert every other segment
          sketch.push();
          sketch.line(mx, my, pmx, pmy);
          sketch.pop();
          sketch.push();
          sketch.scale(-1, 1);
          sketch.line(mx, my, pmx, pmy);
          sketch.pop();
        }
      }
    }
  };
};

// eslint-disable-next-line no-unused-vars
const kaleidoscopep5 = new p5(kaleidoscope, "kaleidoscope-sketch");
