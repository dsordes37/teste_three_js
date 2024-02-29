import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";


const renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene= new THREE.Scene();

const camera= new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const loader= new GLTFLoader();

const path= './bone/scene.gltf'

let model;


function addLight(){
    const light=new THREE.DirectionalLight(0xffffff, 2)
    const light2=new THREE.DirectionalLight(0xff0000, 4)
    const light3=new THREE.DirectionalLight(0x0000ff, 4)

    light.position.set(0, 0,  0)
	light2.position.set(20, 0, 0)
	light3.position.set(-20, 0, 0)

    camera.add(light);
	camera.add(light2);
	camera.add(light3);
}

function adjustModelAndCamera(){
	model.position.set(0, -.2, 0)
	camera.position.set(0, 0, 100)
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = true;
controls.maxDistance=0.4


function animate() {
	requestAnimationFrame(animate);
	controls.update();
	//model.rotation.x+=0.01;
	//model.rotation.y+=0.01;
	renderer.render(scene, camera);
}



loader.load(
    path,(file)=>{
        model=file.scene;
        scene.add(model);
        addLight();
        adjustModelAndCamera();

        scene.add(camera);

        animate()
    },undefined, (e)=>{
        console.log(e)
    }
)