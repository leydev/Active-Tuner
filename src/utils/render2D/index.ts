function drawBackground(
  context: CanvasRenderingContext2D,
  config: Render2D.Parameters,
  canvas: HTMLCanvasElement,
) {
  context.fillStyle = config.background || 'rgba(255, 255, 255)';
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawForeBackground(
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  text: string,
) {
  const textWidth = context.measureText(text).width + 30;
  const textHeight = 50;
  const textBackground = {
    x: (canvas.width / 2) - (textWidth / 2),
    y: (canvas.height / 2) - (textHeight / 2),
  };
  context.fillStyle = 'rgba(30, 30, 30, 0.5)';
  context.fillRect(textBackground.x, textBackground.y, textWidth, textHeight);
}

function drawText(
  context: CanvasRenderingContext2D,
  config: Render2D.Parameters,
  canvas: HTMLCanvasElement,
  text: string,
) {
  context.font = config.text ? config.text.font : '30px Arial';
  context.textAlign = config.text ? config.text.align : 'center';
  context.fillStyle = 'rgb(255,255,255)';
  context.fillText(text, canvas.width / 2, (canvas.height / 2) + 8);
}

function drawLine(
  context: CanvasRenderingContext2D,
  config: Render2D.Parameters,
  canvas: HTMLCanvasElement,
  bufferLength: number,
  buffer: Uint8Array,
) {
  context.lineWidth = config.wave ? config.wave.width : 2;
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
  let buffer: Uint8Array = new Uint8Array(config.bufferLength);
  let context: CanvasRenderingContext2D;
  let canvas: HTMLCanvasElement;
  let text: string;
  let callbackFrame: Render2D.CallbackFrame = () => {};

  const draw = () => {
    if (!context) throw new Error('The context isn\'t initialized. Set de canvas first');
    requestAnimationFrame(draw);
    callbackFrame();

    drawBackground(context, config, canvas);
    drawLine(context, config, canvas, bufferLength, buffer);
    drawForeBackground(context, canvas, text);
    drawText(context, config, canvas, text);
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
    draw,
  };
}

export default render2D;
