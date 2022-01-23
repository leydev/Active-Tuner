function autoCorrelate(buf: unknown, sampleRate: unknown) {
  // Implements the ACF2+ algorithm
  let SIZE = buf.length;
  let rms = 0;

  for (var i = 0; i < SIZE; i++) {
    const val = buf[i];
    rms += val * val;
  }
  rms = Math.sqrt(rms / SIZE);

  if (rms < 0.01) // not enough signal
  { return -1; }

  let r1 = 0; let r2 = SIZE - 1; const
    thres = 0.2;
  for (var i = 0; i < SIZE / 2; i++) { if (Math.abs(buf[i]) < thres) { r1 = i; break; } }
  for (var i = 1; i < SIZE / 2; i++) { if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; } }

  buf = buf.slice(r1, r2);
  SIZE = buf.length;

  const c = new Array(SIZE).fill(0);
  for (var i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE - i; j++) c[i] = c[i] + buf[j] * buf[j + i];
  }

  let d = 0; while (c[d] > c[d + 1]) d++;
  let maxval = -1; let
    maxpos = -1;
  for (var i = d; i < SIZE; i++) {
    if (c[i] > maxval) {
      maxval = c[i];
      maxpos = i;
    }
  }
  let T0 = maxpos;

  const x1 = c[T0 - 1]; const x2 = c[T0]; const
    x3 = c[T0 + 1];
  const a = (x1 + x3 - 2 * x2) / 2;
  const b = (x3 - x1) / 2;
  if (a) T0 -= b / (2 * a);

  return sampleRate / T0;
}

export default autoCorrelate;
