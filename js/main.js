/**
 * @author alteredq / http://alteredqualia.com/
 * @author mr.doob / http://mrdoob.com/
 */

var WEBGL = {

    isWebGLAvailable: function () {

        try {

            var canvas = document.createElement( 'canvas' );
            return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );

        } catch ( e ) {

            return false;

        }

    },

    isWebGL2Available: function () {

        try {

            var canvas = document.createElement( 'canvas' );
            return !! ( window.WebGL2RenderingContext && canvas.getContext( 'webgl2' ) );

        } catch ( e ) {

            return false;

        }

    },

    getWebGLErrorMessage: function () {

        return this.getErrorMessage( 1 );

    },

    getWebGL2ErrorMessage: function () {

        return this.getErrorMessage( 2 );

    },

    getWebGL2ErrorMessage: function ( version ) {

        var names = {
            1: 'WebGL',
            2: 'WebGL 2'
        };

        var contexts = {
            1: window.WebGLRenderingContext,
            2: window.WebGL2RenderingContext
        };

        var message = 'Your $0 does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">$1</a>';

        var element = document.createElement( 'div' );
        element.id = 'webglmessage';
        element.style.fontFamily = 'monospace';
        element.style.fontSize = '13px';
        element.style.fontWeight = 'normal';
        element.style.textAlign = 'center';
        element.style.background = '#fff';
        element.style.color = '#000';
        element.style.padding = '1.5em';
        element.style.width = '400px';
        element.style.margin = '5em auto 0';

        if ( contexts[ version ] ) {

            message = message.replace( '$0', 'graphics card' );

        } else {

            message = message.replace( '$0', 'browser' );

        }

        message = message.replace( '$1', names[ version ] );

        element.innerHTML = message;

        return element;

    }

}

if ( WEBGL.isWebGLAvailable() || WEBGL.isWebGL2Available()) {
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(55, window.innerWidth/window.innerHeight,
            0.1, 1500)

    var latest_pointer = {x: 0, y: 0}

    var renderer = new THREE.WebGLRenderer({
        alpha: true,
        canvas: document.getElementById("starContainer")
    })    

    renderer.setSize(window.innerWidth, window.innerHeight)
     
    //0xaa00aa
    var material = new THREE.MeshBasicMaterial({color: 0xaaaaaa, opacity: 0.7})
    // let material = new THREE.MeshBasicMaterial({color: 0xaaaaaa, opacity: 0.7, wireframe: true})

    //set up camera to have nice view
    camera.position.z = 200
    camera.rotation.z = 2*Math.PI/6
    var max_particle_count = 160
    var particles = []
    var angle_mult = - Math.PI / 3
    window.addEventListener( 'resize', onWindowResize, false );

    requestAnimationFrame(render)
} else {
    console.log("No support")
}


function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

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

function sendEmail(){
    coded = "1Oub.v.JC1gfbk1@zxgb5.Jsx"
    key = "BAU3yGRk8gtYJqud1bCp6IhmN24oHPEl9jzf0QZOMFKLvwa7xcSnseir5TXVWD"
    shift=coded.length
    link=""
    for (i=0; i<coded.length; i++) {
        if (key.indexOf(coded.charAt(i))==-1) {
            ltr = coded.charAt(i)
            link += (ltr)
        }
        else {     
            ltr = (key.indexOf(coded.charAt(i))-shift+key.length) % key.length
            link += (key.charAt(ltr))
        }
    }
    setTimeout(()=>{
        console.log("I said stuff")
        window.location.href = `mailto:${link}?Subject=Hello`
    }, 500)
}