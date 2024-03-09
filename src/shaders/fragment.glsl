varying float vDisplacement;
varying float vTime;

void main()
{
        vec3 color = vec3(vDisplacement);

        gl_FragColor = vec4(color, 1.0);
}