import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
import { CubeCamera, CubeTexture, Scene } from 'three'


const scene = new THREE.Scene()
scene.background = new THREE.Color('BLACK');//(0xAAAAFF);
//scene.add(new THREE.AxesHelper(500))

const camera = new THREE.OrthographicCamera(
    window.innerWidth / - 2,
    window.innerWidth / 2,
    window.innerHeight / 2,
    window.innerHeight / - 2,
    0.1,
    2000
)
camera.position.z = 1000

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

const cubeSize = 170
const geometry = new THREE.BoxGeometry(cubeSize+20, cubeSize+20, cubeSize+20)
const geometry2 = new THREE.BoxGeometry(cubeSize/2, cubeSize/2, cubeSize/2)
const geometry3 = new THREE.BoxGeometry(cubeSize/3, cubeSize/3, cubeSize/3)
const geometry4 = new THREE.BoxGeometry(cubeSize/6, cubeSize/6, cubeSize/6)
const material = new THREE.MeshBasicMaterial({
    color: 0xAAAAFF,
    wireframe: true,
})
const material2 = new THREE.MeshBasicMaterial({
    color: 0x55FF9A,
    wireframe: true,
})
const material3 = new THREE.MeshBasicMaterial({
    color: 0xDD1188,
    wireframe: true,
})
const material4 = new THREE.MeshBasicMaterial({
    color: 0x11DDFE,
    wireframe: true,
})

const cube = new THREE.Mesh(geometry, material)
let cube2 = new THREE.Mesh(geometry2, material2)
let cube3 = new THREE.Mesh(geometry3, material3)
let cube4 = new THREE.Mesh(geometry4, material4)
cube.position.set(-100,-150, 0)
cube2.position.set(360, 0, 0)
cube3.position.set(0, 180, 180)
cube4.position.set(0, 180, 180)
scene.add(cube)
cube.add(cube2)
cube2.add(cube3)
cube3.add(cube4)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    //camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

    //

const gui = new GUI()
const cubeFolder = gui.addFolder('Cube')
const mainCube = cubeFolder.addFolder('Main cube')
const cube2Folder = cubeFolder.addFolder('Little cube')

const cubeRotationFolder = mainCube.addFolder('Rotation')
cubeRotationFolder
.add(cube.rotation, 'x', 0, Math.PI * 1, 0.01)
.name('X rotation')

const cubeScaleFolder = mainCube.addFolder('Scale')
cubeScaleFolder
.add(cube.scale, 'x', 0, Math.PI * 1, 0.01)
.name('X scale')

mainCube.add(cube.position, 'x', -300, 300, 3).name('X position')
mainCube.open()

const cubeLitRotationFolder = cube2Folder.addFolder('Rotation')
cubeLitRotationFolder
.add(cube2.rotation, 'x', 0, Math.PI * 1, 0.01)
.name('X rotation')

const cubeLitScaleFolder = cube2Folder.addFolder('Scale')
cubeLitScaleFolder
.add(cube2.scale, 'x', 0, Math.PI * 1, 0.01)
.name('X scale')

cube2Folder.add(cube2.position, 'x', -300, 300, 3).name('X position')
cube2Folder.open()

cubeFolder.add(cube, 'visible')

cubeFolder.open()



    //

const stats = Stats()
document.body.appendChild(stats.dom)
    
const debug = document.getElementById('debug1') as HTMLDivElement

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    cube2.rotation.x -= 0.008
    cube2.rotation.y -= 0.008

    cube3.rotation.x -= 0.01
    cube3.rotation.y -= 0.01
    cube3.rotation.z -= 0.01

    cube4.rotation.x -= 0.01
    cube4.rotation.y -= 0.01
    cube4.rotation.z -= 0.01

    render()

    // World transforms

    const cubeWorldPos = new THREE.Vector3()
    cube.getWorldPosition(cubeWorldPos)
    const cubeWorldDir = new THREE.Vector3()
    cube.getWorldDirection(cubeWorldDir)
    const cubesWorldQuater = new THREE.Quaternion()
    cube.getWorldQuaternion(cubesWorldQuater)
    const cubeWorldScale = new THREE.Vector3()
    cube.getWorldScale(cubeWorldScale)
    debug.innerText =
    'Local Pos X : ' +
    cube.position.x.toFixed(2) +
    '\n' +
    'World Pos X : ' +
    cubeWorldPos.x.toFixed(2) +
    '\n' +
    'World scale X : ' +
    cubeWorldScale.x.toFixed(2) +
    '\n' 

    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()