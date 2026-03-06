"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

interface WebGLShaderProps {
  className?: string
}

export function WebGLShader({ className }: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    scene: THREE.Scene | null
    camera: THREE.OrthographicCamera | null
    renderer: THREE.WebGLRenderer | null
    mesh: THREE.Mesh | null
    uniforms: any
    animationId: number | null
  }>({
    scene: null,
    camera: null,
    renderer: null,
    mesh: null,
    uniforms: null,
    animationId: null,
  })

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const { current: refs } = sceneRef

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `

    // Single sweeping emerald wave — full left-to-right arc like the original
    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);

        // Tiny chromatic shift to keep a hint of depth — stays in green/teal range
        float d = length(p) * 0.04;
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        // Single wave, same formula as original but softer
        // soft > 0 widens the glow band so it's never a razor line
        float soft = 0.016;
        float r = 0.018 / (abs(p.y + sin((rx + time) * 1.0) * 0.42) + soft);
        float g = 0.018 / (abs(p.y + sin((gx + time) * 1.0) * 0.42) + soft);
        float b = 0.018 / (abs(p.y + sin((bx + time) * 1.0) * 0.42) + soft);

        // Map to emerald: kill red, push green, moderate teal-blue
        vec3 color = vec3(r * 0.05, g * 0.82, b * 0.50);

        gl_FragColor = vec4(color, 1.0);
      }
    `

    const initScene = () => {
      refs.scene = new THREE.Scene()
      refs.renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
      refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      refs.renderer.setClearColor(new THREE.Color(0x09090b))

      refs.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)

      refs.uniforms = {
        resolution: {
          value: [canvas.clientWidth || window.innerWidth, canvas.clientHeight || window.innerHeight],
        },
        time: { value: 0.0 },
      }

      const position = [
        -1.0, -1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0, -1.0, 0.0,
        -1.0,  1.0, 0.0,
         1.0,  1.0, 0.0,
      ]

      const positions = new THREE.BufferAttribute(new Float32Array(position), 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute("position", positions)

      const material = new THREE.RawShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: refs.uniforms,
        side: THREE.DoubleSide,
      })

      refs.mesh = new THREE.Mesh(geometry, material)
      refs.scene.add(refs.mesh)

      handleResize()
    }

    const animate = () => {
      // Slow tick — 0.004 keeps movement gentle and ambient
      if (refs.uniforms) refs.uniforms.time.value += 0.004
      if (refs.renderer && refs.scene && refs.camera) {
        refs.renderer.render(refs.scene, refs.camera)
      }
      refs.animationId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      if (!refs.renderer || !refs.uniforms || !canvas) return
      const width = canvas.clientWidth || window.innerWidth
      const height = canvas.clientHeight || window.innerHeight
      refs.renderer.setSize(width, height, false)
      refs.uniforms.resolution.value = [width, height]
    }

    initScene()
    animate()

    const resizeObserver = new ResizeObserver(handleResize)
    resizeObserver.observe(canvas)

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId)
      resizeObserver.disconnect()
      if (refs.mesh) {
        refs.scene?.remove(refs.mesh)
        refs.mesh.geometry.dispose()
        if (refs.mesh.material instanceof THREE.Material) {
          refs.mesh.material.dispose()
        }
      }
      refs.renderer?.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0 w-full h-full block"}
    />
  )
}
