// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis (Smooth Scrolling)
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
});

// Setup GSAP integration with Lenis
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Cursor Glow
const cursor = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Magnetic Buttons & Cursor Scale
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(elem, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
    });
    elem.addEventListener('mouseleave', () => {
        gsap.to(elem, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
    });
    
    // Cursor hover effect
    elem.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 3, opacity: 0.5, duration: 0.3 });
    });
    elem.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 });
    });
});


// Loading Screen Animation
window.addEventListener('load', () => {
    let progress = 0;
    const progressEl = document.getElementById('loading-percentage');
    const loadingScreen = document.getElementById('loading-screen');
    
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress > 100) progress = 100;
        progressEl.textContent = progress < 10 ? '0' + progress : progress;
        
        if (progress === 100) {
            clearInterval(interval);
            
            // Outro animation
            gsap.to(loadingScreen, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut",
                delay: 0.2
            });
            
            // Init main animations
            initAnimations();
        }
    }, 100);
});


// Header Scroll Effect
const header = document.getElementById('site-header');
ScrollTrigger.create({
    start: 'top -50',
    onUpdate: (self) => {
        if (self.direction === 1) {
            header.classList.add('scrolled');
        } else if (self.progress === 0) {
            header.classList.remove('scrolled');
        }
    }
});


// --- THREE.JS GLOBAL BACKGROUND ---
function initThreeJS() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Optimized pixel ratio

    // Abstract Object (Distorted Sphere) -> Custom WebGL Shader
    const geometry = new THREE.IcosahedronGeometry(2, 24); // Lowered from 64 to 24 for massive performance boost
    
    // Custom Shaders
    const vertexShader = `
        uniform float uTime;
        uniform float uScroll;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        // Simplex noise function
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
            const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
            const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
            vec3 i  = floor(v + dot(v, C.yyy) );
            vec3 x0 = v - i + dot(i, C.xxx) ;
            vec3 g = step(x0.yzx, x0.xyz);
            vec3 l = 1.0 - g;
            vec3 i1 = min( g.xyz, l.zxy );
            vec3 i2 = max( g.xyz, l.zxy );
            vec3 x1 = x0 - i1 + C.xxx;
            vec3 x2 = x0 - i2 + C.yyy;
            vec3 x3 = x0 - D.yyy;
            i = mod289(i);
            vec4 p = permute( permute( permute(
                        i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
                      + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
                      + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
            float n_ = 0.142857142857;
            vec3  ns = n_ * D.wyz - D.xzx;
            vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
            vec4 x_ = floor(j * ns.z);
            vec4 y_ = floor(j - 7.0 * x_ );
            vec4 x = x_ *ns.x + ns.yyyy;
            vec4 y = y_ *ns.x + ns.yyyy;
            vec4 h = 1.0 - abs(x) - abs(y);
            vec4 b0 = vec4( x.xy, y.xy );
            vec4 b1 = vec4( x.zw, y.zw );
            vec4 s0 = floor(b0)*2.0 + 1.0;
            vec4 s1 = floor(b1)*2.0 + 1.0;
            vec4 sh = -step(h, vec4(0.0));
            vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
            vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
            vec3 p0 = vec3(a0.xy,h.x);
            vec3 p1 = vec3(a0.zw,h.y);
            vec3 p2 = vec3(a1.xy,h.z);
            vec3 p3 = vec3(a1.zw,h.w);
            vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
            p0 *= norm.x;
            p1 *= norm.y;
            p2 *= norm.z;
            p3 *= norm.w;
            vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
            m = m * m;
            return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3) ) );
        }

        void main() {
            vUv = uv;
            vNormal = normal;
            
            // Noise based displacement
            float noise = snoise(position * 0.8 + uTime * 0.3) * (0.5 + uScroll * 1.5);
            vec3 newPosition = position + normal * noise;
            vPosition = newPosition;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
    `;

    const fragmentShader = `
        uniform float uTime;
        uniform float uScroll;
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            // Lighting calculations
            vec3 light = normalize(vec3(1.0, 1.0, 1.0));
            float prod = max(0.0, dot(vNormal, light));
            float fresnel = pow(1.0 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
            
            // Color mixing based on scroll and noise
            vec3 baseColor = mix(uColor1, uColor2, sin(vPosition.y + uTime) * 0.5 + 0.5);
            vec3 finalColor = baseColor * (prod + 0.2) + fresnel * vec3(1.0);
            
            gl_FragColor = vec4(finalColor, 0.85); // slight transparency
        }
    `;

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            uTime: { value: 0 },
            uScroll: { value: 0 },
            uColor1: { value: new THREE.Color(0x111111) },
            uColor2: { value: new THREE.Color(0x4a90e2) }
        },
        transparent: true,
        wireframe: true // Start as wireframe
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Galactic Space Particles (Upgraded)
    const particleCount = 3000;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    const colorChoices = [
        new THREE.Color(0xffffff), // White
        new THREE.Color(0x4a90e2), // Blue
        new THREE.Color(0x9b51e0)  // Purple
    ];

    for(let i=0; i<particleCount; i++) {
        particlePositions[i*3] = (Math.random() - 0.5) * 50;
        particlePositions[i*3+1] = (Math.random() - 0.5) * 50;
        particlePositions[i*3+2] = (Math.random() - 0.5) * 50;

        const randomColor = colorChoices[Math.floor(Math.random() * colorChoices.length)];
        particleColors[i*3] = randomColor.r;
        particleColors[i*3+1] = randomColor.g;
        particleColors[i*3+2] = randomColor.b;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.04,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Secondary Floating Abstract Objects (Space Debris/Anomalies)
    const secondaryShapes = [];
    const wireMat = new THREE.MeshBasicMaterial({ color: 0x4a90e2, wireframe: true, transparent: true, opacity: 0.1 });
    
    const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.1, 64, 8), wireMat);
    torus.position.set(-5, 3, -4);
    scene.add(torus);
    secondaryShapes.push(torus);

    const octa = new THREE.Mesh(new THREE.OctahedronGeometry(1.2), wireMat);
    octa.position.set(6, -4, -6);
    scene.add(octa);
    secondaryShapes.push(octa);

    // Floating Web Development UI Artifacts (3D Wireframe Web Pages)
    const artifactCount = 120;
    const artifactGeometry = new THREE.PlaneGeometry(1.6, 1, 4, 3); // Grid pattern resembling a web layout
    const artifactMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x4a90e2, 
        wireframe: true, 
        transparent: true, 
        opacity: 0.15,
        side: THREE.DoubleSide 
    });
    const artifacts = new THREE.InstancedMesh(artifactGeometry, artifactMaterial, artifactCount);
    
    const dummy = new THREE.Object3D();
    for ( let i = 0; i < artifactCount; i ++ ) {
        dummy.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 30 - 10 // Pushed slightly back
        );
        // Align them slightly to look like floating screens
        dummy.rotation.set(
            (Math.random() - 0.5) * 0.5,
            (Math.random() - 0.5) * 0.5,
            0
        );
        dummy.updateMatrix();
        artifacts.setMatrixAt(i, dummy.matrix);
    }
    scene.add(artifacts);

    camera.position.z = 6;

    // Mouse Parallax Logic
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX - windowHalfX) * 0.002;
        mouseY = (event.clientY - windowHalfY) * 0.002;
    });

    // Animation
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        sphere.rotation.y += 0.003;
        sphere.rotation.x += 0.002;
        
        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0004;

        artifacts.rotation.y += 0.0005;
        artifacts.position.z += 0.01; // Slowly drift towards camera
        
        // Loop the floating web pages back when they pass the camera
        if (artifacts.position.z > 20) {
            artifacts.position.z = 0;
        }

        secondaryShapes.forEach((s, index) => {
            s.rotation.x += 0.001 * (index + 1);
            s.rotation.y += 0.002 * (index + 1);
            s.position.y += Math.sin(elapsedTime * 1.5 + index) * 0.003;
        });

        material.uniforms.uTime.value = elapsedTime;

        // Smooth Camera Mouse Parallax
        targetX = mouseX * 2;
        targetY = mouseY * 2;
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }
    animate();

    // Throttled Resize Event for better performance
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if(resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            ScrollTrigger.refresh();
        }, 150);
    });

    // Master Scroll interaction with Three.js object throughout the page
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });

    // Initial Hero scroll
    tl.to(sphere.rotation, { y: Math.PI, x: Math.PI / 2, ease: "none" }, 0);
    tl.to(particles.rotation, { y: Math.PI * 1.5, ease: "none" }, 0);
    
    // Problem section (0.1 to 0.2)
    tl.to(sphere.position, { x: 3, y: -1, ease: "power1.inOut" }, 0.1);
    tl.to(material.uniforms.uColor1.value, { r: 0.1, g: 0.2, b: 0.8, ease: "power1.inOut" }, 0.1);
    tl.to(material.uniforms.uScroll, { value: 0.2, ease: "power1.inOut" }, 0.1);
    
    // Service Reveal (0.3 to 0.4)
    tl.to(sphere.scale, { x: 1.5, y: 1.5, z: 1.5, ease: "power1.inOut" }, 0.3);
    tl.to(sphere.position, { x: 0, y: 0, ease: "power1.inOut" }, 0.3);
    tl.to(material.uniforms.uColor2.value, { r: 0.8, g: 0.1, b: 0.2, ease: "power1.inOut" }, 0.3);
    tl.to(material.uniforms.uScroll, { value: 0.5, ease: "power1.inOut" }, 0.3);

    // Idea to Experience (0.5 to 0.6)
    tl.to(sphere.position, { y: 2, x: -3, ease: "power1.inOut" }, 0.5);
    tl.to(material, { wireframe: false, ease: "none" }, 0.5);
    tl.to(material.uniforms.uScroll, { value: 0.8, ease: "power1.inOut" }, 0.5);
    
    // Process section (0.7 to 0.8)
    tl.to(sphere.position, { y: -2, x: 4, ease: "power1.inOut" }, 0.7);
    tl.to(material.uniforms.uColor1.value, { r: 0.1, g: 0.8, b: 0.3, ease: "power1.inOut" }, 0.7);
    tl.to(material, { wireframe: true, ease: "none" }, 0.7);

    // Final CTA - center and explode size (0.9 to 1.0)
    tl.to(sphere.position, { x: 0, y: 0, ease: "power1.inOut" }, 0.9);
    tl.to(sphere.scale, { x: 3, y: 3, z: 3, ease: "power1.inOut" }, 0.9);
    tl.to(material.uniforms.uColor2.value, { r: 1.0, g: 1.0, b: 1.0, ease: "power1.inOut" }, 0.9);
    tl.to(material.uniforms.uScroll, { value: 1.5, ease: "power1.inOut" }, 0.9);
}


// --- MAIN GSAP ANIMATIONS ---
function initAnimations() {
    initThreeJS();

    // Custom Text Stagger Reveal
    const staggerTexts = document.querySelectorAll('.stagger-text');
    staggerTexts.forEach(el => {
        const text = el.innerText;
        el.innerHTML = '';
        text.split(' ').forEach(word => {
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.style.overflow = 'hidden';
            span.style.verticalAlign = 'top';
            
            const innerSpan = document.createElement('span');
            innerSpan.style.display = 'inline-block';
            innerSpan.style.transform = 'translateY(100%)';
            innerSpan.innerText = word + '\u00A0'; // Add non-breaking space
            
            span.appendChild(innerSpan);
            el.appendChild(span);
        });

        gsap.to(el.querySelectorAll('span > span'), {
            y: '0%',
            duration: 1,
            stagger: 0.05,
            ease: "power4.out",
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
            }
        });
    });

    // Marquee Infinite Scroll
    const marqueeContent = document.querySelector('.marquee-content');
    if (marqueeContent) {
        gsap.to(marqueeContent, {
            xPercent: -50,
            ease: "none",
            duration: 15,
            repeat: -1
        });
    }

    // 1. Hero Text Spread on Scroll
    gsap.to('.hero-title .word', {
        letterSpacing: "15px",
        opacity: 0,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
    gsap.to('.hero-subtext, .hero-cta', {
        y: -50,
        opacity: 0,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "center top",
            scrub: 1
        }
    });

    // 2. Problem Section Parallax Elements
    const floatingItems = document.querySelectorAll('.floating-item');
    floatingItems.forEach(item => {
        const speed = item.getAttribute('data-speed');
        gsap.to(item, {
            y: -100 * speed,
            rotation: 10 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: ".problem",
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // 3. Service Reveal Pinned Sequence
    const revealTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".service-reveal",
            start: "top top",
            end: "+=2000",
            pin: true,
            scrub: 1
        }
    });

    revealTl.to('.reveal-text-1', { opacity: 1, duration: 1 })
            .to('.reveal-text-1', { opacity: 0, duration: 1, delay: 0.5 })
            .to('.reveal-text-2', { opacity: 1, duration: 1 })
            .to('.reveal-text-2', { opacity: 0, duration: 1, delay: 0.5 })
            .to('.reveal-text-3', { opacity: 1, duration: 1, scale: 1.2 })
            .to('.reveal-text-3', { opacity: 0, duration: 1, delay: 0.5 })
            .to('.reveal-words', { opacity: 1, duration: 1 });

    const words = document.querySelectorAll('.reveal-words span');
    words.forEach((word, index) => {
        revealTl.from(word, { x: 100, opacity: 0, duration: 0.5 }, "-=0.3");
    });

    // 4. Horizontal Scroll Services with Velocity Skew (Jesper Landberg style)
    const servicesScroll = document.querySelector('.services-scroll');
    const serviceCards = gsap.utils.toArray('.service-card');
    
    // Create a proxy object to tween the skew
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(serviceCards, "skewX", "deg"),
        clamp = gsap.utils.clamp(-20, 20);

    ScrollTrigger.create({
        onUpdate: (self) => {
            let skew = clamp(self.getVelocity() / -300);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
                proxy.skew = skew;
                gsap.to(proxy, {
                    skew: 0,
                    duration: 0.8,
                    ease: "power3",
                    overwrite: true,
                    onUpdate: () => skewSetter(proxy.skew)
                });
            }
        }
    });

    gsap.to(servicesScroll, {
        x: () => -(servicesScroll.scrollWidth - window.innerWidth + 200),
        ease: "none",
        scrollTrigger: {
            trigger: ".services",
            start: "top top",
            end: () => "+=" + servicesScroll.scrollWidth,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true
        }
    });

    // Huge Background Text Parallax
    gsap.utils.toArray('.huge-bg-text').forEach(text => {
        gsap.to(text, {
            y: -200,
            scrollTrigger: {
                trigger: text.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });

    // 5. Idea to Experience
    const ideaTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".idea-to-exp",
            start: "top top",
            end: "+=1500",
            pin: true,
            scrub: 1
        }
    });

    const steps = ['#step-wireframe', '#step-design', '#step-motion', '#step-3d', '#step-interaction', '#step-final'];
    
    steps.forEach((step, i) => {
        ideaTl.to(step, { opacity: 1, y: 0, duration: 1 });
        if(i < steps.length - 1) {
            ideaTl.to(step, { opacity: 0, y: -20, duration: 1, delay: 0.5 });
        }
    });
    ideaTl.to('.idea-text.final', { opacity: 1, duration: 2 });


    // 6. Process Line Drawing
    gsap.to('.process-line::after', {
        height: '100%',
        ease: "none",
        scrollTrigger: {
            trigger: ".process",
            start: "top center",
            end: "bottom center",
            scrub: 1
        }
    });

    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach(step => {
        gsap.to(step, {
            opacity: 1,
            scrollTrigger: {
                trigger: step,
                start: "top center",
                end: "bottom center",
                toggleClass: "active"
            }
        });
    });

    // 7. Case Study Reveal
    gsap.from('.case-study-visuals .visual-mockup', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".case-study",
            start: "top center"
        }
    });

    // 8. Before / After Split Screen
    gsap.to('.split.left', {
        x: '-50%',
        scrollTrigger: {
            trigger: ".before-after",
            start: "top top",
            end: "bottom top",
            scrub: 1,
            pin: true
        }
    });
    gsap.to('.split.right', {
        x: '50%',
        scrollTrigger: {
            trigger: ".before-after",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });
    
    gsap.to('.split-text h2', {
        opacity: 1,
        stagger: 0.5,
        scrollTrigger: {
            trigger: ".before-after",
            start: "top top",
            end: "bottom top",
            scrub: 1
        }
    });

    // 9. Why Nexora Cards
    gsap.to('.why-card', {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".why-nexora",
            start: "top center"
        }
    });

    // 10. Final CTA Parallax
    gsap.to('.final-cta .huge-cta', {
        scale: 1.2,
        scrollTrigger: {
            trigger: ".final-cta",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
        }
    });
}
