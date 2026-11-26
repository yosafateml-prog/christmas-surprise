// ======================================
// CHRISTMAS TREE 3D - FOR NAULI
// ======================================

const container = document.getElementById("christmas-tree");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

camera.position.set(0, 3, 10);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

// Pencahayaan
const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const mainLight = new THREE.PointLight(0xffd98a, 2, 30);
mainLight.position.set(3, 5, 5);
scene.add(mainLight);

// Grup pohon
const tree = new THREE.Group();
scene.add(tree);

// Batang pohon
const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.3, 0.4, 1.2, 16),
    new THREE.MeshStandardMaterial({ color: 0x70401f })
);

trunk.position.y = -2.2;
tree.add(trunk);

// Daun pohon bertingkat
const greenMaterial = new THREE.MeshStandardMaterial({
    color: 0x087a43,
    roughness: 0.8
});

for (let i = 0; i < 4; i++) {
    const cone = new THREE.Mesh(
        new THREE.ConeGeometry(1.7 - i * 0.25, 2.3, 32),
        greenMaterial
    );

    cone.position.y = -1.5 + i * 0.85;
    tree.add(cone);
}

// Bintang di puncak
const star = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.4),
    new THREE.MeshStandardMaterial({
        color: 0xffd700,
        emissive: 0xffaa00,
        emissiveIntensity: 1.5
    })
);

star.position.y = 2.1;
tree.add(star);

// Lampu dan ornamen
const colors = [
    0xff0000,
    0xffff00,
    0x00ffff,
    0xff00ff,
    0xffffff
];

for (let i = 0; i < 45; i++) {
    const y = -2.2 + Math.random() * 4;
    const radius = 1.5 * (2.2 - y) / 4.4;

    const angle = Math.random() * Math.PI * 2;

    const light = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 16, 16),
        new THREE.MeshStandardMaterial({
            color: colors[i % colors.length],
            emissive: colors[i % colors.length],
            emissiveIntensity: 1.5
        })
    );

    light.position.set(
        Math.cos(angle) * radius,
        y,
        Math.sin(angle) * radius
    );

    tree.add(light);
}

// Animasi
function animate() {
    requestAnimationFrame(animate);

    tree.rotation.y += 0.003;
    star.rotation.y += 0.015;

    renderer.render(scene, camera);
}

animate();

// Responsif
window.addEventListener("resize", () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(
        container.clientWidth,
        container.clientHeight
    );
});

// Animasi salju
const snowContainer = document.getElementById("snow");

for (let i = 0; i < 100; i++) {
    const snowflake = document.createElement("div");

    snowflake.className = "snowflake";
    snowflake.innerHTML = "❄";
    snowflake.style.left = Math.random() * 100 + "%";
    snowflake.style.fontSize = (Math.random() * 10 + 8) + "px";
    snowflake.style.animationDuration = (Math.random() * 8 + 5) + "s";
    snowflake.style.animationDelay = Math.random() * 5 + "s";

    snowContainer.appendChild(snowflake);
}

// ======================================
// SURPRISE MESSAGE - FOR NAULI
// ======================================

const surpriseBtn = document.getElementById("surprise-btn");

surpriseBtn.addEventListener("click", () => {

    const modal = document.createElement("div");

    modal.innerHTML = `
        <div class="surprise-box">
            <div class="gift-icon">🎁</div>

            <h2>For You, Nauli ✨</h2>

            <p>
                Merry Christmas, Nauli! 🎄
                <br><br>
                May this beautiful season bring you
                happiness, peace, and countless reasons
                to smile.
                <br><br>
                May God bless you, guide your steps,
                and fill your days with beautiful moments.
                <br><br>
                Keep shining and never stop being you. ❤️
            </p>

            <button id="close-surprise">CLOSE ✨</button>
            <a href="/christmas-surprise/confess.html" class="next-btn">NEXT: CONFESSION 💌</a>
        </div>
    `;

    modal.className = "surprise-modal";
    document.body.appendChild(modal);

    document.getElementById("close-surprise").onclick = () => {
        modal.remove();
    };

});
