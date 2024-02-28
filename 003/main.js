import * as THREE from "https://cdn.skypack.dev/three@0.136.0";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";


//criação do renderer visit(001)
const renderer = new THREE.WebGLRenderer(/*{alpha: true}*/);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//criação da cena visit(001)
const scene = new THREE.Scene();

//criação da camera visit(001)
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

//O LOADER É CRIADO PARA QUE SEJA POSSÍVEL CARREGAR UM MODELO 3D EM NOSSA APLICAÇÃO
const loader = new GLTFLoader();

//PASSAMOS O PATH DO MODELO QUE USAREMOS
const fileName = "./model/scene.gltf";

//CRIAREMOS A VARIAVEL MODELO
let model;



//NOSSO OBJETO NÃO PODERÁ SER VISTO NA TELA SEM A ADIÇÃO DE LUZES, ESSE É OO OBJETIVO DA FUNÇÃO ABAIXO
function addLight() {
	//AQUI CRIAMOS UM NOVO PONTO DE LUZ E DEFINIMOS SUA COR E SUA ITENDIDADE
	const light = new THREE.DirectionalLight(0xffffff, 3);

	const light2 = new THREE.DirectionalLight(0xff00ff, 2)

	//AQUI DEFINIMOS A POSIÇÃO DESSE PONTO DE LUZ
	light.position.set(40, 0, 0.866);
	light2.position.set(-40, 0, 0.866)

	//AQUI ADICIONAMOS ESSE PONTO DE LUZ À CÂMERA. PARA QUE DESSA FORMA A LUZ ESTEJA DIRECIONADA PARA O QUE A CÂMERA ESTÁ OLHANDO.
	camera.add(light);
	camera.add(light2)
}


//ESSA FUNÇÃO POSICIONA MELHOR NOSSO OBJETO NA CENA
function adjustModelAndCamera() {
	//AQUI CRIAMOS UMA BOX3, UMA CAIXA TRIDIMENCIONAL QUE ARMAZENA NOSSO OBJETO A SER RENDERIZADO, ELE É PASSADO COMO PRAMETRO SO 'setFromObject()'
	const box = new THREE.Box3().setFromObject(model);

	//AQUI PEGAMOS O TAMANHO DA NOSSA CAIXA 3D
	const size = box.getSize(new THREE.Vector3()).length();

	//E AQUI PEGAMOS O CENTRO DA CAIXA
	const center = box.getCenter(new THREE.Vector3());
  

	//UTILIZANDO AS INFORMAÇÕES OBTIDAS ACIMA, AJUSTAMOS AS POSIÇÕES DO OBJETO DE ACORDO COM SEU CENTRO
	model.position.x += model.position.x - center.x;
	model.position.y += model.position.y - center.y;
	model.position.z += model.position.z - center.z;

	//AJUSTAMOS A DISTANCIA DE NEAR E FAR DA CÂMERA {VISIT(001)} DE ACORDO COM O TAMANHO DO OBJETO
	camera.near = size / 100;
	camera.far = size * 100;
	//O METODO ".updateProjectionMatrix()" 	É UTILIZAOD PARA RECALCULAR OS PARÂMETROS INTERNOS DA CÂMERA.
	camera.updateProjectionMatrix();
  
	//AQUI DEFINIMOS A PODIÇÃO DA CÂMERA DE ACORDO COM O CENTRO DO NOSSO OBJETO
	camera.position.copy(center);
	camera.position.x += size / 0.2;
	camera.position.y += size / 2;
	camera.position.z += size / 100;

	// E DEFINIMOS PARA A CÂMERA SEMPRE ESTAR APONTADA PARA O CENTRO DO OBJETO
	camera.lookAt(center);
}





const controls = new OrbitControls(camera, renderer.domElement);
controls.screenSpacePanning = true;
controls.maxDistance=100
/*
controls.minDistance=100
controls.enabled=false*/


function animate() {
	requestAnimationFrame(animate);
	controls.update();
	//model.rotation.x+=0.01;
	//model.rotation.y+=0.01;
	renderer.render(scene, camera);
}





//AQUI UTILIZAMOS O LOADER, CRIADO ANTERIORMENTE, PARA CARREGAR O MODELO 3D PASSADO EM FILENAME
loader.load(
	//A VARIÁVEL 'gltf' PASSA A RECEBER O VALOR DE 'fileName'
	fileName,
	(gltf)=>{
		//"model" PASSA A RESGATAR APENAS O VALOR CENA DENTRO DE NOSSO ARQUIVO GLTF.
		model = gltf.scene;

		//E AQUI ESSE VALOR É ADICIONADO A CENA PRINCIPAL
		scene.add(model);
		
		//CHAMAMOS AS FUNÇÕES QUE ADICIONAM LUZ E MOVIMENTO
		addLight();
		adjustModelAndCamera();

		//ADICIONAMOS CAMERA À CENA VISIT(001)
		scene.add(camera);

		//E RODAMOS A FUNÇÃO ANIMATE, QUE EXENCIAL PARA ADICIONAR MOVIMENTOS COM O MOUSE OU ANIMAÇÕES AO NOSSO OBJETO VISIT(001)
		animate()
	},
	undefined,
	(e)=>{
		console.error(e);
	}
);