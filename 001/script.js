//PRIMEIRO IMPORTA-SE O THREE.JS POR MEIO DO CÓDIGO LOGO ABAIXO.
import * as THREE from 'three';

//CRIA-SE UM OBJETO DO TIPO CENA POR MAIO DO CÓDIGO LOGO ABAIXO.
//A CENA É ONDE TODOS OS OJETOS 3D SERÃO INJETADOS.
const scene = new THREE.Scene();

//A CÂMERA REPRESENTA O PONTO DE VISTA EM QUE O USUÁRIO IRA VIZUALIZAR A PÁGINA.
//CRIA-SE UM OBJETO DO TIPO CÂMERA PARA UTILIZANDO O CÓDIGO LOGO ABAIXO E PROVENDO 4 ATRIBUTOS.

// (FOV):(FIELD OF VIEW)== VALOR EM GRAUS QUE REPRESENTA A EXTENSÃO DA CENA QUE MOSTRADA NA TELA.
// (ASPECT RATIO)== DEFINE A PROPORÇÃO DA IMAGEM E NORMALMENTE É DADO PELA DIVISÃO DA LARGURA PELA ALTURA DA TELA.
//(FAR)== OBJETOS MAIS DISTANTES DA CAMERA DO QUE ESTE VALOR NÃO SERÃO RENDERIZADOS PELO RENDERER
//(NEAR)== OBJETOS MAIS PRÓXIMOS DA CÂMERA DO QUE ESTE VALOR NÃO SERÃO RENDERIZADOS PELO RENDERER

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);



//O RENDERIZADOR É O OBJETO QUE VAI PEGAR TODAS AS CONFIGURAÇÕES PROGRAMADAS ACIMA E RENDERIZAR NA TELA.
//O OBJETO RENDERER É CRIADO UTILIZADO O CÓDIGO LOGO ABAIXO
const renderer = new THREE.WebGLRenderer();

//O TAMANHO DO RENDERER TEM QUE SER SETADO NO CÓDIGO E REPRESENTA A DIMENSÃO DA ÁREA DE TELA EM QUE O NOSSO CÓDIGO SERÁ RENDERIZADO.
//É POSSÍVEL TAMBÉM REDUZIR A RESOLUÇÃO DO QUE ESTÁ SENDO RENDERIZADO POR MEIO DE UM TERCEIRO ATRIBUTO DO MÉTODO SETSIZE O "UPDATESTYE" QUE, NESSE CASO DEVE SER DEFINIDO COMO FALSE
renderer.setSize(window.innerWidth, window.innerHeight);

//LOGO ABAIXO O ELEMENTO DOM DO RENDER É ADICIONADO AO BODY DO NOSSO HTML, O QUE PERMITE QUE A RENDERIZAÇÃO SEJA FEITA.

document.body.appendChild(renderer.domElement)


const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00})
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z=5;

function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera)
}

animate()