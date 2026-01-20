varying vec2 vUv;


void main(){
    vUv = uv;
    
    vec3 newPosition = position;
    vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * worldPosition;
    gl_Position = projectionMatrix * viewPosition;
}