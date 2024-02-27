import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.01, 1000);
camera.position.z=5
camera.lookAt(0, 0, 0)

const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const loader = new GLTFLoader();

loader.load( 'pia/scene.gltf', function ( gltf ) {

    
	scene.add( gltf.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

renderer.render(scene, camera)