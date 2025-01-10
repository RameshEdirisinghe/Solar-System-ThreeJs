import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Pane } from "tweakpane";

// initialize pane
const pane = new Pane();

// initialize the scene
const scene = new THREE.Scene();

// add textureLoader
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader()
cubeTextureLoader.setPath('/textures/cubeMap/')

// adding textures
const sunTexture = textureLoader.load("/textures/2k_sun.jpg");
sunTexture.colorSpace = THREE.SRGBColorSpace  
// const sunTexture1 = textureLoader.load("/textures/2k_sun.jpg");
// sunTexture1.colorSpace = THREE.SRGBColorSpace  
const mercuryTexture = textureLoader.load("/textures/2k_mercury.jpg");
mercuryTexture.colorSpace = THREE.SRGBColorSpace
const venusTexture = textureLoader.load("/textures/2k_venus_surface.jpg");
venusTexture.colorSpace = THREE.SRGBColorSpace
const earthTexture = textureLoader.load("/textures/2k_earth_daymap.jpg");
earthTexture.colorSpace = THREE.SRGBColorSpace
const marsTexture = textureLoader.load("/textures/2k_mars.jpg");
marsTexture.colorSpace = THREE.SRGBColorSpace
const moonTexture = textureLoader.load("/textures/2k_moon.jpg");
moonTexture.colorSpace = THREE.SRGBColorSpace

const boulderAlbedo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_albedo.png')
boulderAlbedo.colorSpace = THREE.SRGBColorSpace
const boulderAo = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_ao.png')
const boulderHeight = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_height.png')
const boulderMetallic = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_metallic.png')
const boulderNormal = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_normal-ogl.png')
const boulderRoughness = textureLoader.load('/textures/badlands-boulders-bl/badlands-boulders_roughness.png')


const spaceCruiserAlbedo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_albedo.png')
spaceCruiserAlbedo.colorSpace = THREE.SRGBColorSpace
const spaceCruiserAo = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_ao.png')
const spaceCruiserHeight = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_height.png')
const spaceCruiserMetallic = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_metallic.png')
const spaceCruiserNormal = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_normal-ogl.png')
const spaceCruiserRoughness = textureLoader.load('/textures/space-cruiser-panels2-bl/space-cruiser-panels2_roughness.png')

const boulderPane = pane.addFolder({
  title: 'Boulder Material',
  expanded: true
})

const boulderMaterial = new THREE.MeshStandardMaterial();
boulderMaterial.map = boulderAlbedo
boulderMaterial.roughnessMap = boulderRoughness
boulderMaterial.metalnessMap = boulderMetallic
boulderMaterial.normalMap = boulderNormal
boulderMaterial.displacementMap = boulderHeight
boulderMaterial.displacementScale = 0.1
boulderMaterial.aoMap = boulderAo

boulderPane.addBinding(boulderMaterial, 'metalness', { min: 0, max: 1, step: 0.01 })
boulderPane.addBinding(boulderMaterial, 'roughness', { min: 0, max: 1, step: 0.01 })
boulderPane.addBinding(boulderMaterial, 'displacementScale', { min: 0, max: 1, step: 0.01 })
boulderPane.addBinding(boulderMaterial, 'aoMapIntensity', { min: 0, max: 1, step: 0.01 })


const spaceCruiserPane = pane.addFolder({
  title: 'Space Cruiser Material',
  expanded: true
})

const spaceCruiserMaterial = new THREE.MeshStandardMaterial();
spaceCruiserMaterial.map = spaceCruiserAlbedo
spaceCruiserMaterial.roughnessMap = spaceCruiserRoughness
spaceCruiserMaterial.metalnessMap = spaceCruiserMetallic
spaceCruiserMaterial.normalMap = spaceCruiserNormal
spaceCruiserMaterial.displacementMap = spaceCruiserHeight
spaceCruiserMaterial.displacementScale = 0.1
spaceCruiserMaterial.aoMap = spaceCruiserAo

spaceCruiserPane.addBinding(spaceCruiserMaterial, 'metalness', { min: 0, max: 1, step: 0.01 })
spaceCruiserPane.addBinding(spaceCruiserMaterial, 'roughness', { min: 0, max: 1, step: 0.01 })
spaceCruiserPane.addBinding(spaceCruiserMaterial, 'displacementScale', { min: 0, max: 1, step: 0.01 })
spaceCruiserPane.addBinding(spaceCruiserMaterial, 'aoMapIntensity', { min: 0, max: 1, step: 0.01 })

const backgroundCubemap = cubeTextureLoader
.load( [
  'px.png',
  'nx.png',
  'py.png',
  'ny.png',
  'pz.png',
  'nz.png'
] );

scene.background = backgroundCubemap

// add materials
const mercuryMaterial = new THREE.MeshStandardMaterial({
  map: mercuryTexture,
});
const venusMaterial = new THREE.MeshStandardMaterial({
  map: venusTexture,
});
const earthMaterial = new THREE.MeshStandardMaterial({
  map: earthTexture,
});
const marsMaterial = new THREE.MeshStandardMaterial({
  map: marsTexture,
});
const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture,
});

// add stuff here
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({
  map: sunTexture,
});


const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
sun.scale.setScalar(5);
scene.add(sun);

const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 10,
    speed: 0.01,
    material: mercuryMaterial,
    moons: [],
  },
  {
    name: "Venus",
    radius: 0.8,
    distance: 15,
    speed: 0.007,
    material: venusMaterial,
    moons: [],
  },
  {
    name: "Earth",
    radius: 1,
    distance: 20,
    speed: 0.005,
    material: earthMaterial,
    moons: [
      {
        name: "Moon",
        radius: 0.3,
        distance: 3,
        speed: 0.015,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.7,
    distance: 25,
    speed: 0.003,
    material: marsMaterial,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 2,
        speed: 0.02,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 3,
        speed: 0.015,
        color: 0xffffff,
      },
    ],
  },
  {
    name: "Boulder",
    radius: 0.8,
    distance: 30,
    speed: 0.002,
    material: boulderMaterial,
    moons: [],
  },
  {
    name: "Cruiser",
    radius: 0.8,
    distance: 35,
    speed: 0.001,
    material: spaceCruiserMaterial,
    moons: [],
  },
];


const createPlanet = (planet) =>{
  const planetMesh = new THREE.Mesh(
    sphereGeometry,
    planet.material
  )
  planetMesh.scale.setScalar(planet.radius)
  planetMesh.position.x = planet.distance
  return planetMesh
}

const createMoon = (moon) =>{
  const moonMesh = new THREE.Mesh(
    sphereGeometry,
    moonMaterial
  )
  moonMesh.scale.setScalar(moon.radius)
  moonMesh.position.x = moon.distance
  return moonMesh
}


const planetMeshes = planets.map((planet) =>{
  const planetMesh = createPlanet(planet)
  scene.add(planetMesh)

  planet.moons.forEach((moon) => {
    const moonMesh = createMoon(moon)
    planetMesh.add(moonMesh)
  })
  return planetMesh
})

console.log(planetMeshes)

// add lights
const ambientLight = new THREE.AmbientLight(
  0xffffff,
  1
)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(
  0xfaed7d,
  5000
)
scene.add(pointLight)
 
// initialize the camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 100;
camera.position.y = 5;

// initialize the renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// add controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.maxDistance = 200;
controls.minDistance = 20;

// add resize listener
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// render loop
const renderloop = () => {
  planetMeshes.forEach((planet, planetIndex)=>{
    planet.rotation.y +=  planets[planetIndex].speed
    planet.position.x = Math.sin(planet.rotation.y) * planets[planetIndex].distance
    planet.position.z = Math.cos(planet.rotation.y) * planets[planetIndex].distance
    planet.children.forEach((moon, moonIndex) =>{
      moon.rotation.y += planets[planetIndex].moons[moonIndex].speed
      moon.position.x = Math.sin(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
      moon.position.z = Math.cos(moon.rotation.y) * planets[planetIndex].moons[moonIndex].distance
    })
  })

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderloop);
};

renderloop();
