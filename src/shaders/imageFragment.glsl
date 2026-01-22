varying vec2 vUv;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uImgMouse;
uniform float uProgress;

void main(){
    float blocks=20.;
    vec2 blockUvs=(floor(vUv*blocks)/blocks)+(.5/blocks);
    vec2 mouse=uImgMouse;
    float dist=length(blockUvs-mouse);
    float effect=smoothstep(.2,0.,dist);
    vec2 distortion=(vUv-mouse)*effect*.3*cos(uTime);
    vec3 color=texture2D(uTexture,vUv*1.5+(distortion*2.)).rgb;
    float alpha=smoothstep(0.,1.,uProgress);
    gl_FragColor=vec4(color,alpha);
}