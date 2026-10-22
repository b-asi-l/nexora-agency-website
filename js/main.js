// --- 1. LENIS SMOOTH SCROLL ---
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// --- 2. CUSTOM CURSOR ---
const cursor = document.getElementById('custom-cursor');
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = window.innerWidth / 2;
let cursorY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Initially show cursor
    if (cursor.style.opacity === '0' || cursor.style.opacity === '') {
        cursor.style.opacity = '1';
    }
});

// Cursor smooth follow
function updateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    cursor.style.transform = `translate3d(${cursorX - cursor.clientWidth / 2}px, ${cursorY - cursor.clientHeight / 2}px, 0)`;
    requestAnimationFrame(updateCursor);
}
updateCursor();

// Hover interactions
const hoverElements = document.querySelectorAll('a, button, .project-card, .capability-card, .service-row');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (el.classList.contains('project-card')) {
            cursor.style.width = '80px';
            cursor.style.height = '80px';
            cursor.innerText = 'VIEW';
        } else {
            cursor.style.width = '40px';
            cursor.style.height = '40px';
            cursor.style.backgroundColor = '#8B5CF6'; // accent1
        }
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.width = '16px';
        cursor.style.height = '16px';
        cursor.innerText = '';
        cursor.style.backgroundColor = '#FFFFFF';
    });
});

// --- 3. LOADER & INITIAL GSAP ---
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.to('#loader-progress', {
        width: '100%',
        duration: 1.5,
        ease: 'power3.inOut',
        onUpdate: function() {
            const progress = Math.round(this.progress() * 100);
            if(progress > 30 && progress < 70) document.getElementById('loader-text').innerText = '02 Preparing Visuals...';
            if(progress > 70) document.getElementById('loader-text').innerText = '03 Initializing Interaction...';
            if(progress === 100) document.getElementById('loader-text').innerText = '04 Ready.';
        }
    })
    .to('#loader', {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.2
    })
    .to('.hero-anim', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
    }, "-=0.5");
});

// --- 4. SCROLL ANIMATIONS ---
// Navbar solid on scroll
ScrollTrigger.create({
    start: 'top -80',
    onUpdate: self => {
        if (self.direction === 1) {
            document.getElementById('navbar').classList.add('nav-scrolled');
        } else if (self.progress === 0) {
            document.getElementById('navbar').classList.remove('nav-scrolled');
        }
    }
});

// Hero Parallax
gsap.to('#hero .max-w-4xl', {
    y: 150,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    }
});

// Side Nav Highlight
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.side-nav-link');

sections.forEach((section, i) => {
    ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: self => {
            if (self.isActive && navLinks[i]) {
                navLinks.forEach(l => l.classList.remove('text-white'));
                navLinks.forEach(l => l.querySelector('span').classList.replace('bg-white', 'bg-textMuted'));
                navLinks.forEach(l => l.querySelector('span').classList.remove('w-4'));
                
                navLinks[i].classList.add('text-white');
                navLinks[i].querySelector('span').classList.replace('bg-textMuted', 'bg-white');
                navLinks[i].querySelector('span').classList.add('w-4');
            }
        }
    });
});

// --- 5. THREE.JS PREMIUM SCENE ---
function initWebGL() {
    const canvas = document.getElementById('webgl-canvas');
    if(!canvas) return;

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const accentLight1 = new THREE.PointLight(0x8B5CF6, 3, 50); // Electric Violet
    accentLight1.position.set(-5, 2, 0);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0x22D3EE, 3, 50); // Cyan
    accentLight2.position.set(5, -2, 2);
    scene.add(accentLight2);

    const accentLight3 = new THREE.PointLight(0xEC4899, 2, 50); // Pink
    accentLight3.position.set(0, 5, -2);
    scene.add(accentLight3);

    // Materials
    const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        metalness: 0.2,
        roughness: 0.1,
        transmission: 0.9,
        ior: 1.5,
        thickness: 1.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });

    const darkMetalMat = new THREE.MeshStandardMaterial({
        color: 0x111021,
        metalness: 0.8,
        roughness: 0.3
    });

    // Objects
    const group = new THREE.Group();
    scene.add(group);

    // Main central abstract shape (Icosahedron)
    const mainShape = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 1), glassMat);
    mainShape.position.set(4, 0, 0);
    group.add(mainShape);

    // Floating torus
    const torus = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.4, 32, 64), darkMetalMat);
    torus.position.set(-3, 3, -2);
    torus.rotation.x = Math.PI / 3;
    group.add(torus);

    // Small glossy sphere
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.8, 32, 32), glassMat);
    sphere.position.set(2, -3, 1);
    group.add(sphere);

    // Floating UI Panel representation (Plane)
    const uiPlane = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 3.5), new THREE.MeshPhysicalMaterial({
        color: 0x8B5CF6,
        transmission: 0.8,
        opacity: 0.4,
        transparent: true,
        roughness: 0.2,
        side: THREE.DoubleSide
    }));
    uiPlane.position.set(-4, -1, 1);
    uiPlane.rotation.y = Math.PI / 4;
    group.add(uiPlane);

    // Particles
    const pCount = 500;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for(let i=0; i<pCount*3; i++) {
        pPos[i] = (Math.random() - 0.5) * 30;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
        color: 0x22D3EE,
        size: 0.05,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Animation variables
    const clock = new THREE.Clock();
    let webglMouseX = 0;
    let webglMouseY = 0;

    document.addEventListener('mousemove', (e) => {
        webglMouseX = (e.clientX / window.innerWidth) * 2 - 1;
        webglMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    });

    // Render loop
    function animate() {
        requestAnimationFrame(animate);
        const t = clock.getElapsedTime();

        // Float objects
        mainShape.rotation.y = t * 0.1;
        mainShape.rotation.x = t * 0.15;
        mainShape.position.y = Math.sin(t * 0.5) * 0.3;

        torus.rotation.z = t * 0.2;
        torus.position.y = 3 + Math.sin(t * 0.8) * 0.4;

        sphere.position.y = -3 + Math.cos(t * 0.6) * 0.3;
        
        uiPlane.position.y = -1 + Math.sin(t * 0.4) * 0.2;
        uiPlane.rotation.z = Math.sin(t * 0.2) * 0.1;

        particles.rotation.y = t * 0.02;

        // Mouse Parallax
        group.rotation.y += (webglMouseX * 0.2 - group.rotation.y) * 0.05;
        group.rotation.x += (-webglMouseY * 0.2 - group.rotation.x) * 0.05;

        renderer.render(scene, camera);
    }
    animate();

    // Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Scroll GSAP tie-in
    gsap.to(group.position, {
        y: 8,
        z: -5,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
    
    gsap.to(group.rotation, {
        y: Math.PI,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: true
        }
    });
}

initWebGL();
