varying vec2 vUv;
uniform float uTime;
uniform vec2 uMouse;

void main(){
    vUv=uv;
    
    float dist=distance(uv,uMouse);
    float pushStrength=0.06;
    float radius=.5;
    
    float push=smoothstep(radius,0.,dist)*pushStrength;
    
    vec3 newPosition=position;
    newPosition.x+=push;
    
    vec4 worldPosition=modelMatrix*vec4(newPosition,1.);
    float angle=sin(position.x+uTime)*.04+sin(position.y+uTime)*.04;
    worldPosition.y+=angle;
    vec4 viewPosition=viewMatrix*worldPosition;
gl_Position=projectionMatrix*viewPosition;}