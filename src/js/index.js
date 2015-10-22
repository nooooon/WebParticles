/* index.js */

(function(){

	var ParticleSystem = (function(){

		function ParticleSystem(){
			
			container = document.getElementById('container');

			// 画角, 縦横比, near, far
			camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 10000);
			camera.position.z = 100;

			scene = new THREE.Scene();
			scene.fog = new THREE.Fog(0x000000, 2000, 3500);

			renderer = new THREE.WebGLRenderer({antialias: true});
			renderer.setClearColor(scene.fog.color);
			renderer.setPixelRatio(window.devicePixelRatio);
			renderer.setSize(window.innerWidth, window.innerHeight);
			renderer.autoClear = false;

			container.appendChild(renderer.domElement);

            var ambient = new THREE.AmbientLight( 0xFFFFFF );
            scene.add( ambient );

			var material = new THREE.ShaderMaterial({
				vertexShader: document.getElementById('vshader').textContent,
				vertexColors: THREE.VertexColors,
				fragmentShader: document.getElementById('fshader').textContent,
				uniforms: {
					texture1: { type: "t", value: new THREE.ImageUtils.loadTexture("./images/particle.png") },
					p_size: { type: "f", value: 10.0 }
				},

				blending: THREE.AdditiveBlending,
				transparent: true,
				depthTest: false
			});


			var particles = 1000;
			var positions = new Float32Array(particles * 3);
			var colors = new Float32Array(particles * 3);
			for ( var i = 1; i < particles; i ++ ) {

				positions[i * 3] = Math.random();
				positions[i * 3 + 1] = Math.random();
				positions[i * 3 + 2] = Math.random();
console.log(positions[i*3]);
				colors[i * 3] = 255;
				colors[i * 3 + 1] = 255;
				colors[i * 3 + 2] = 255;
			}

			var geometry = new THREE.BufferGeometry();
			geometry.dynamic = true;
			geometry.addAttribute('position', new THREE.BufferAttribute(positions, 3));
			geometry.addAttribute('color', new THREE.BufferAttribute(colors, 3));

			var particle = new THREE.Points(geometry, material);
			particle.position.set(0.0, 0.0, 0.0);
			console.log(particle);
			scene.add(particle);

			window.addEventListener( 'resize', onResize, false );

            // Helper
			var axis = new THREE.AxisHelper(1000);
			axis.position.set(0, 0, 0);
			scene.add(axis);

            // camera cntrol
			controls = new THREE.OrbitControls(camera);
			controls.staticMoving = false;
			controls.dynamicDampingFactor = 1.0;
			controls.minDistance = 1; //近づける最大値
			controls.maxDistance = 600; //遠ざかれる最大値
			
			controls.noZoom = false;
			controls.zoomSpeed = 1.0;
			controls.noRotate = false; //true:回転操作不可,false:回転操作可能
            controls.rotateSpeed = 3.0;
            controls.autoRotate = false;     //true:自動回転する,false:自動回転しない
            controls.autoRotateSpeed = 2.0;    //自動回転する時の速度
            controls.noPan = true; //中心移動

			animate();
		}

		function createParticle(){

		}

		function animate(){
			controls.update();
			renderer.render(scene, camera);

			requestAnimationFrame(animate);
		}

		function onResize(){

		}

		return ParticleSystem;
	})();







	if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

	var particleSystem = new ParticleSystem();

	var container, camera, scene, renderer;
	var controls;
})();