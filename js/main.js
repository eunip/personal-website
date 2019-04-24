let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight,
        0.1, 1500)

let latest_pointer = {x: 0, y: 0}

let renderer = new THREE.WebGLRenderer({
    alpha: true,
    canvas: document.getElementById("starContainer")
})

let landing = document.getElementById("landing")
renderer.setSize(window.innerWidth, window.innerHeight)
 
//0xaa00aa
let material = new THREE.MeshBasicMaterial({color: 0xaaaaaa, opacity: 0.7})
// let material = new THREE.MeshBasicMaterial({color: 0xaaaaaa, opacity: 0.7, wireframe: true})

//set up camera to have nice view
camera.position.z = 200
camera.rotation.z = 2*Math.PI/6
let max_particle_count = 160
let particles = []
let angle_mult = - Math.PI / 3

function render(){
    if(particles.length < max_particle_count && Math.random()>0.8){
        let particle = new THREE.SphereGeometry(Math.random() * 3)
        let x = Math.floor(Math.random()*500)-250
        particle = new THREE.Mesh(particle, material)
        particle.translateOnAxis(new THREE.Vector3(1, 0, 0), x)
        particle.translateOnAxis(new THREE.Vector3(0, 0, 1), Math.floor(Math.random()*500)-250)
        particle.translateOnAxis(new THREE.Vector3(0, 1, 0), -300)
        particles.push(particle)
        scene.add(particle)
    }
    for(let i=particles.length-1; i>=0; i--){
        if(particles[i].position.y>500){
            let done = particles.splice(i, 1)
            scene.remove(done[0])
        }
        particles[i].position.y += 1
    }

    // scene.rotation.x = (latest_pointer.y / (renderer.domElement.height/2) ) * angle_mult
    renderer.render(scene, camera)
    requestAnimationFrame(render)
}

requestAnimationFrame(render)