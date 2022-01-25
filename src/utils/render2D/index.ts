function defaultText(text: string) {
  return !text ? '-' : text;
}

function drawBackground(
  context: CanvasRenderingContext2D,
  config: Render2D.Parameters,
  canvas: HTMLCanvasElement,
) {
  context.fillStyle = config.background || 'rgba(255, 255, 255)';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawText(
  context: CanvasRenderingContext2D,
  config: Render2D.Parameters,
  canvas: HTMLCanvasElement,
  text: string,
  textColor: string,
) {
  context.font = config.text ? config.text.font : '50px Arial';
  context.textAlign = config.text ? config.text.align : 'center';
  context.fillStyle = textColor;
  context.fillText(defaultText(text), (canvas.width / 2), (canvas.height / 2) + 40);
}

function drawHertz(
  context: CanvasRenderingContext2D,
  config: Render2D.Parameters,
  canvas: HTMLCanvasElement,
  text: string,
) {
  context.font = '30px roboto';
  context.textAlign = config.text ? config.text.align : 'center';
  context.fillStyle = config.text ? config.text.color : 'rgb(255,255,255)';
  context.fillText(`${defaultText(text)} Hz`, (canvas.width / 2), (canvas.height / 2) + 130);
}

let avoidNotAllowedDraw = false;

function drawLine(
  context: CanvasRenderingContext2D,
  config: Render2D.Parameters,
  canvas: HTMLCanvasElement,
  bufferLength: number,
  buffer: Uint8Array,
) {
  if (!avoidNotAllowedDraw && buffer.every((elem: number) => elem === 0)) return;
  avoidNotAllowedDraw = true;

  context.lineWidth = config.wave ? config.wave.width : 4;
  context.strokeStyle = config.wave ? config.wave.color : '#20dd35';

  context.beginPath();

  const sliceWidth = (canvas.width * 1.0) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i += 1) {
    const v = buffer[i] / 128.0;
    const y = (v * canvas.height) / 2;

    if (i === 0) {
      context.moveTo(x, y);
    } else {
      context.lineTo(x, y);
    }

    x += sliceWidth;
  }

  context.lineTo(canvas.width, canvas.height / 2);
  context.stroke();
}

function render2D(config: Render2D.Parameters) {
  const bufferLength: number = config.bufferLength || 0;
  let textColor = '#000';
  let buffer: Uint8Array = new Uint8Array(config.bufferLength);
  let context: CanvasRenderingContext2D;
  let canvas: HTMLCanvasElement;
  let text: string;
  let hertz: string;
  let callbackFrame: Render2D.CallbackFrame = () => {};

  const draw = () => {
    if (!context) throw new Error('The context isn\'t initialized. Set de canvas first');
    requestAnimationFrame(draw);
    callbackFrame();

    drawBackground(context, config, canvas);
    drawLine(context, config, canvas, bufferLength, buffer);
    drawText(context, config, canvas, text, textColor);
    drawHertz(context, config, canvas, hertz);
  };

  return {
    setBuffer(data: Uint8Array) {
      buffer = data;
    },
    setCanvas(ref: HTMLCanvasElement) {
      canvas = ref;
      context = canvas.getContext('2d', {
        alpha: true,
      });
    },
    requestFrame(callback: Render2D.CallbackFrame) {
      callbackFrame = callback;
    },
    setText(value: string) {
      text = value;
    },
    setTextColor(value: string) {
      textColor = value;
    },
    setHertz(value: string) {
      hertz = value;
    },
    draw,
  };
}

export default render2D;
