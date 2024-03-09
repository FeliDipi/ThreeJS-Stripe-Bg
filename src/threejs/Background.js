import * as THREE from "three";
import vertexShader from "../shaders/vertex.glsl";
import fragmentShader from "../shaders/fragment.glsl";

export class Background
{
    constructor()
    {
        this.setupScene();
        this.setupPlane();
        this.setupLights();
        this.setupUpdate();
    }

    setupScene()
    {
        const $canvas = document.getElementById("custom-canvas");

        let WIDTH = window.innerWidth;
        let HEIGHT = window.innerHeight;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(30, WIDTH/HEIGHT, 0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({
            antialias:true,
            canvas:$canvas
        });

        this.renderer.setSize(WIDTH, HEIGHT);

        this.camera.position.z = 5;
    }

    setupUpdate()
    {
        const animate = () =>
        {
            requestAnimationFrame(animate);

            this.material.uniforms.uTime.value += 0.001;
            this.renderer.render(this.scene,this.camera);
        }

        animate();
    }

    setupPlane()
    {
        const geometry = new THREE.IcosahedronGeometry(2,100);

        this.material = new THREE.ShaderMaterial({
            vertexShader:vertexShader,
            fragmentShader:fragmentShader,
        });

        this.material.uniforms.uTime = {value:0.0};
        this.material.uniforms.uDisplacementFactor = {value:3.0};

        const object = new THREE.Mesh(geometry,this.material);

        object.rotation.x = 5;
        object.rotation.y = 5;

        this.scene.add(object);
    }

    setupLights()
    {
        const light = new THREE.DirectionalLight( 0xffffff, 0.5 );

        this.scene.add(light);
    }
}

new Background();