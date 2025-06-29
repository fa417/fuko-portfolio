import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.152.2/examples/jsm/controls/OrbitControls.js';


const canvasContainer = document.getElementById('yoga-sp');


const scene = new THREE.Scene();

const width = canvasContainer.clientWidth;
const height = canvasContainer.clientHeight;

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });  // alpha: trueで背景を透明にする
scene.background = null;

renderer.setSize(width, height);
camera.aspect = width / height;
camera.updateProjectionMatrix();

canvasContainer.appendChild(renderer.domElement);


scene.background = null;

// ライト - 全体 -
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// ライト - 後 -
const lightBack = new THREE.DirectionalLight(0xffffff, 0.3);
lightBack.position.set(0, 0, -10);
scene.add(lightBack);

// ライト　- 右 -
const lightRight = new THREE.DirectionalLight(0xffffff, 0.6);
lightRight.position.set(10, 5, 10);
scene.add(lightRight);

// ライト　- 左 -
const lightLeft = new THREE.DirectionalLight(0xffffff, 0.6);
lightLeft.position.set(-10, 5, 10);
scene.add(lightLeft);

// ライト　- 前 -
const lightFront = new THREE.PointLight(0xffffff, 0.3);
lightFront.position.set(0, 0, 10);
scene.add(lightFront);

const loader = new GLTFLoader();

loader.load('../models/sp/yoga-sp.glb', (gltf) => {
    const model = gltf.scene;
    model.scale.set(6, 6, 6);
    model.rotation.y = Math.PI / 1;
    scene.add(model);
    animate();
}, undefined, (error) => {
    console.error('モデル読み込みエラー:', error);
});

camera.position.z = 25;

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// ズーム操作無効
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;