import * as THREE from 'https://unpkg.com/three/build/three.module.js';

const scene=new THREE.Scene();

const camera=new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 500);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);


const renderer=new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

//CRIANDO UMA LINHA
const material=new THREE.LineBasicMaterial({color: 0x0000ff})

//EM SEGUIDA PRECISAMOS CRIAR ALGUNS PONTOS, POR A LINHA IRA PASSAR.

const points=[]
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));
points.push(new THREE.Vector3(20, 10, 0));
const geometry=new THREE.BufferGeometry().setFromPoints(points);

const line=new THREE.Line(geometry, material);

scene.add(line);
renderer.render(scene, camera);