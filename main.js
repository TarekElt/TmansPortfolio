import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

console.log('main.js loaded');

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('model-container').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 2);
controls.update();

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 3);
scene.add(ambientLight);

const loader = new GLTFLoader();
let currentObject;

// Function to load a model
function loadModel(modelPath) {
  if (currentObject) {
    scene.remove(currentObject);
  }
  loader.load(modelPath, function (gltf) {
    currentObject = gltf.scene;
    scene.add(currentObject);
    console.log('Model loaded successfully');
    console.log('Model position:', currentObject.position);
    console.log('Model scale:', currentObject.scale);

    // Adjust position and scale
    currentObject.position.set(0, -4, 0); // Reset position
    currentObject.scale.set(20, 20, 20); // Adjust scale as needed

    // Calculate the bounding box
    const box = new THREE.Box3().setFromObject(currentObject);
    const center = box.getCenter(new THREE.Vector3());

    // Calculate the offset
    const offset = new THREE.Vector3();
    box.getCenter(offset).negate();

    // Apply the offset to center the object
    currentObject.position.add(offset);

    // Add axes helper
    // const axesHelper = new THREE.AxesHelper(5); // Smaller size of the axes
    // currentObject.add(axesHelper);

    // Center the camera on the object
    controls.target.copy(center);
    camera.position.set(center.x, center.y, center.z + 6); // Adjust the camera distance as needed
    controls.update();
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('An error happened', error);
  });
}

// Event listeners for project images
document.getElementById('freddy-image').addEventListener('click', () => {
  console.log('freddy-image clicked');
  loadModel('public/FREDDY.glb');
  document.getElementById('model-viewer').style.display = 'flex';
});

document.getElementById('eyevase-image').addEventListener('click', () => {
  console.log('eyevase-image clicked');
  loadModel('public/EyeVase.glb');
  document.getElementById('model-viewer').style.display = 'flex';
});

// Close viewer
document.getElementById('close-viewer').addEventListener('click', () => {
  console.log('close-viewer clicked');
  document.getElementById('model-viewer').style.display = 'none';
  if (currentObject) {
    scene.remove(currentObject);
    currentObject = null;
  }
});

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();