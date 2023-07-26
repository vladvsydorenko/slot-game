export const solidColorShader = `
    precision mediump float;

    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;
    uniform vec4 uColor;

    void main() {
        // gl_FragColor = texture2D(uSampler, vTextureCoord);
        gl_FragColor = uColor;
    }
`;