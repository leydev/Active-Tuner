function autoCorrelate(buf: Float32Array, sampleRate: number) {
  // Implements the ACF2+ algorithm
  let SIZE = buf.length;
  let rms = 0;

  for (let i = 0; i < SIZE; i += 1) {
    const val = buf[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);

  // not enough signal
  if (rms < 0.01) return -1;

  let r1 = 0;
  let r2 = SIZE - 1;
  const thres = 0.2;

  for (let i = 0; i < SIZE / 2; i += 1) {
    if (Math.abs(buf[i]) < thres) { r1 = i; break; }
  }

  for (let i = 1; i < SIZE / 2; i += 1) {
    if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
  }

  // eslint-disable-next-line no-param-reassign
  buf = buf.slice(r1, r2);
  SIZE = buf.length;

  const c: Array<number> = new Array(SIZE).fill(0);
  for (let i = 0; i < SIZE; i += 1) {
    for (let j = 0; j < SIZE - i; j += 1) {
      c[i] += buf[j] * buf[j + i];
    }
  }

  let d = 0;
  while (c[d] > c[d + 1]) d += 1;

  let maxval = -1;
  let maxpos = -1;

  for (let i = d; i < SIZE; i += 1) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }

  let T0 = maxpos;

  const x1 = c[T0 - 1];
  const x2 = c[T0];
  const x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 -= b / (2 * a);

  return sampleRate / T0;
}

export default autoCorrelate;
