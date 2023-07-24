// Updated vertex shader
export const outlineVertexShader = `
    attribute vec2 aVertexPosition;
    attribute vec2 aTextureCoord; // Add this line to declare texture coordinates

    uniform mat3 projectionMatrix;
    varying vec2 vTextureCoord; // Add this line to pass texture coordinates to the fragment shader

    void main() {
        gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
        vTextureCoord = aTextureCoord; // Pass the texture coordinates to the fragment shader
    }
`;

// Updated fragment shader for outline effect
export const outlineFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform vec4 uOutlineColor;
uniform float uOutlineThickness;
uniform float uOutlineAlphacut;

void main() {
    vec2 onePixel = vec2(1.0, 1.0) / uResolution;
    vec4 centerColor = texture2D(uSampler, vTextureCoord);

    // Check if the center pixel is fully transparent (alpha == 0)
    bool isTransparent = centerColor.a < uOutlineAlphacut;

    // Check if the pixel's neighbors are different from the center pixel
    bool isOutline =
        texture2D(uSampler, vTextureCoord + vec2(0.0, uOutlineThickness) * onePixel) != centerColor ||
        texture2D(uSampler, vTextureCoord + vec2(uOutlineThickness, 0.0) * onePixel) != centerColor ||
        texture2D(uSampler, vTextureCoord + vec2(0.0, -uOutlineThickness) * onePixel) != centerColor ||
        texture2D(uSampler, vTextureCoord + vec2(-uOutlineThickness, 0.0) * onePixel) != centerColor;

    // If the center pixel is transparent and it's an outline pixel, use the outline color; otherwise, use the original color
    gl_FragColor = isTransparent && isOutline ? uOutlineColor : centerColor;
}
`;

// Custom filter for the original image (without the outline effect)
export const outlineOriginalShader = `
    precision mediump float;

    varying vec2 vTextureCoord;
    uniform sampler2D uSampler;

    void main() {
        gl_FragColor = texture2D(uSampler, vTextureCoord);
    }
`;

// Updated fragment shader for smooth outline effect
export const smoothOutlineFragmentShader = `
precision mediump float;

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform vec2 uResolution;
uniform vec4 uOutlineColor;
uniform float uOutlineThickness;
uniform float uSmoothness;

// Function to calculate the average color of neighboring pixels
vec4 calculateAverageColor() {
    vec2 onePixel = vec2(1.0, 1.0) / uResolution;
    vec4 totalColor = vec4(0.0);
    int numPixels = 0;

    for (int x = -1; x <= 1; x++) {
        for (int y = -1; y <= 1; y++) {
            vec2 offset = vec2(float(x), float(y)) * uOutlineThickness * onePixel;
            vec4 color = texture2D(uSampler, vTextureCoord + offset);
            totalColor += color;
            numPixels++;
        }
    }

    return totalColor / float(numPixels);
}

void main() {
    vec4 centerColor = texture2D(uSampler, vTextureCoord);

    // Calculate the average color of neighboring pixels
    vec4 averageColor = calculateAverageColor();

    // Calculate the distance from the center pixel to the average color
    float distance = length(centerColor.rgb - averageColor.rgb);

    // Normalize the distance to a range between 0.0 and 1.0
    float normalizedDistance = distance / sqrt(3.0); // Max distance for RGB (1,1,1) - (0,0,0)

    // Calculate the transparency based on the distance and the smoothness factor
    float alpha = smoothstep(uSmoothness, 0.0, normalizedDistance);

    // Mix the outline color with the original color based on the transparency
    vec4 outlineColor = mix(centerColor, uOutlineColor, alpha);

    gl_FragColor = outlineColor;
}
`;