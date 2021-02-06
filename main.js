import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r125/three.module.min.js';

const scene = new THREE.Scene();
//scene.background = new THREE.Color('black');
let container = document.getElementById("container");
const camera = new THREE.PerspectiveCamera( 45, container.offsetWidth / container.offsetHeight, 1, 4000 );

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(container.offsetWidth, container.offsetHeight);
		    container.appendChild( renderer.domElement );

// Se crea una luz direccional para mostrar el objeto
const light = new THREE.DirectionalLight(0xffffff, 0.7);
light.position.set(0, 0, 1);
scene.add(light);

/* Texture */
const texture = new THREE.TextureLoader().load('./images/diamond_ore.png')
const bump = new THREE.TextureLoader().load('./images/diamond_ore_dis.png')

/* Material */
let material_counter = 0;
let material = [
    new THREE.MeshBasicMaterial({ map:texture }),
    new THREE.MeshStandardMaterial({ map:texture }),
    new THREE.MeshPhongMaterial({ map:texture })
];

material[0].bumpMap = bump;
material[1].bumpMap = bump;
material[2].bumpMap = bump;

/* Cube */
const cube_geometry = new THREE.BoxGeometry();
let cube = new THREE.Mesh(cube_geometry, material[material_counter]);
cube.position.set(-4, 2, 0);
scene.add(cube);

/* Cylinder */
const cylinder_geometry = new THREE.CylinderGeometry(.5, .5, 1, 20, 32);
let cylinder = new THREE.Mesh(cylinder_geometry, material[material_counter]);
cylinder.position.set(0, 2, 0);
scene.add(cylinder);

/* Dodecahedron */
const dodecahedron_geometry = new THREE.DodecahedronGeometry(.5);
let dodecahedron = new THREE.Mesh(dodecahedron_geometry, material[material_counter]);
dodecahedron.position.set(4, 2, 0);
scene.add(dodecahedron);

/* Icosahedron */
const icosahedron_geometry = new THREE.IcosahedronGeometry(.5);
let icosahedron = new THREE.Mesh(icosahedron_geometry, material[material_counter]);
icosahedron.position.set(-4, -2, 0);
scene.add(icosahedron);

/* Sphere */
const sphere_geometry = new THREE.SphereGeometry(.5, 32, 32);
let sphere = new THREE.Mesh(sphere_geometry, material[material_counter]);
sphere.position.set(0, -2, 0);
scene.add(sphere);

/* Torus */
const torus_geometry = new THREE.TorusGeometry(.5, .2, 16, 100);
let torus = new THREE.Mesh(torus_geometry, material[material_counter]);
torus.position.set(4, -2, 0);
scene.add(torus);


camera.position.z = 8;

function rotate(obj) {
    obj.rotation.x += 0.02;
    obj.rotation.y += 0.01;
    obj.rotation.z += 0.01;
}

function animate() {
    rotate(cube);
    rotate(cylinder);
    rotate(dodecahedron);
    rotate(icosahedron);
    rotate(sphere);
    rotate(torus);
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

let onMouseUp = () => {
    if (material_counter >= 2) {
        material_counter = 0
    } else material_counter += 1;
    //console.log(material_counter);
    cube.material = material[material_counter];
    cylinder.material = material[material_counter];
    dodecahedron.material = material[material_counter];
    icosahedron.material = material[material_counter];
    sphere.material = material[material_counter];
    torus.material = material[material_counter];
}

renderer.domElement.addEventListener('mouseup', onMouseUp, false)

animate();