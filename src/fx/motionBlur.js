const shader = `
precision lowp float;

varying vec2 vUv;
uniform sampler2D uImage;
uniform float uAmount;
uniform vec2 uDirection;
uniform vec2 iCanvasResolution;
uniform vec2 iImageResolution;

#define uSamples 50.0

void main() {
  vec4 sum = vec4(0.0);
  vec2 bounds = iImageResolution / iCanvasResolution;
  float total = 0.0;
  for (float i = -1.0; i < 1.0; i += 2.0 / uSamples) {
    vec2 uv = vUv + uDirection * i;
    if (uv.x > 0.0 && uv.y > 0.0 && uv.x < bounds.x && uv.y < bounds.y) {
      sum += texture2D(uImage, uv, 0.0);
      total += 1.0;
    }
  }
  sum /= total;
  gl_FragColor = mix(texture2D(uImage, vUv, 0.0), sum, uAmount);
}
`;

export default {
  name: 'Motion blur',
  description: '',
  shader: shader,
  uniforms: [
    {
      name: 'Amount',
      description: '',
      id: 'uAmount',
      type: 'float',
      default: 0.5,
    },
    {
      name: 'Direction',
      description: '',
      id: 'uDirection',
      type: 'vec2',
      components: [
        { name: 'Horizontal', min: -0.5, max: 0.5 },
        { name: 'Vertical', min: -0.5, max: 0.5 },
      ],
      default: [0.1, 0],
    },
  ],
};