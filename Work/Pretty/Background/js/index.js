// Init
var container, stats;
var camera, scene, renderer, particles, geometry, materials = [],
    parameters, i, h, color, size;
var mouseX = 0,
    mouseY = 0;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

THREE.ImageUtils.crossOrigin = "";
scene.fog = new THREE.FogExp2(0x000000, 0.0007);
geometry = new THREE.Geometry();

// Random position
for (i = 0; i < 90000; i++) {
    var vertex = new THREE.Vector3();
    vertex.x = Math.random() * 2000 - 1000;
    vertex.y = Math.random() * 2000 - 1000;
    vertex.z = Math.random() * 2000 - 1000;
    geometry.vertices.push(vertex);
}


parameters = [
    [[1, 1, 0.5], 2],
    [[0.99, 1, 0.5], 2],
    [[0.98, 1, 0.5], 2],
    [[0.97, 1, 0.5], 2],
    [[0.96, 1, 0.5], 2],
    [[0.95, 1, 0.5], 2],
    [[0.94, 1, 0.5], 2]
];

for (i = 0; i < parameters.length; i++) {
    color = parameters[i][0];
    size = parameters[i][1];
    materials[i] = new THREE.PointCloudMaterial({
        size: size
    });
    particles = new THREE.PointCloud(geometry, materials[i]);
    particles.rotation.x = Math.random() * 6;
    particles.rotation.y = Math.random() * 6;
    particles.rotation.z = Math.random() * 6;
    scene.add(particles);
}

camera.position.z = -2;

//var time = new THREE.Clock();
var render = function() {

    var time = Date.now() * 0.000005;
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    for (i = 0; i < scene.children.length; i++) {
        var object = scene.children[i];
        if (object instanceof THREE.PointCloud) {
            object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
        }
    }
    for (i = 0; i < materials.length; i++) {
        color = parameters[i][0];
        h = (360 * (color[0] + time) % 360) / 360;
        materials[i].color.setHSL(h, color[1], color[2]);
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);

};
render();

// Resize function

window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}