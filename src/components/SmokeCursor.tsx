import { useEffect, useRef } from 'react'

type SmokeCursorProps = {
  /** RGB triplet for the smoke color — defaults to the portfolio's charcoal (#353535) */
  rgb?: string
  /** Upper bound on simultaneously alive particles */
  maxParticles?: number
}

type Particle = {
  x: number
  y: number
  vx: number // px/s
  vy: number // px/s
  age: number // ms
  life: number // ms
  size: number // current diameter (px)
  grow: number // px/s
  kind: 'smoke' | 'spark'
  heat: number // 0..1 — how white-hot a spark starts (0 for smoke)
  twinkle: number // random phase used to sputter a spark's brightness
}

/**
 * Full-viewport canvas that emits soft smoke puffs from the cursor while it moves.
 * - pointer-events: none, so it never blocks clicks/scroll
 * - respects prefers-reduced-motion (renders nothing)
 * - stops its animation loop when the smoke has fully dissipated
 */
function SmokeCursor({ rgb = '53,53,53', maxParticles = 160 }: SmokeCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Pre-rendered soft puff sprite — way cheaper than building a gradient per particle per frame
    const sprite = document.createElement('canvas')
    sprite.width = 128
    sprite.height = 128
    const sctx = sprite.getContext('2d')
    if (!sctx) return
    const grad = sctx.createRadialGradient(64, 64, 0, 64, 64, 64)
    grad.addColorStop(0, `rgba(${rgb}, 0.34)`)
    grad.addColorStop(0.5, `rgba(${rgb}, 0.12)`)
    grad.addColorStop(1, `rgba(${rgb}, 0)`)
    sctx.fillStyle = grad
    sctx.fillRect(0, 0, 128, 128)

    let particles: Particle[] = []
    let rafId = 0
    let lastFrame = performance.now()
    let prevPointer: { x: number; y: number; time: number } | null = null
    let lastEmit: { x: number; y: number } | null = null
    let lastSparkAt = 0
    let smoothSpeed = 0 // pointer speed (px/s) smoothed over ~50ms

    const resize = () => {
      // devicePixelRatio includes browser zoom — intentionally uncapped so the
      // buffer stays ~equal to the physical pixel count of the viewport
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth // includes the scrollbar — the same space clientX lives in
      const h = window.innerHeight
      // Explicit CSS size: <canvas> is a replaced element, so inset-0 alone falls back
      // to its intrinsic (buffer) size — that mismatch is what shifts the smoke off the
      // cursor when the user zooms the browser in/out.
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      // Scale by the *actual* buffer ratio → zero sub-pixel drift at any zoom level
      ctx.setTransform(canvas.width / w, 0, 0, canvas.height / h, 0, 0)
    }
    resize()

    const emit = (x: number, y: number, inheritX: number, inheritY: number) => {
      if (particles.length >= maxParticles) return
      particles.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        vx: inheritX + (Math.random() - 0.5) * 36,
        vy: inheritY + (Math.random() - 0.5) * 36 - 28, // slight upward kick
        age: 0,
        life: 850 + Math.random() * 650,
        size: 22 + Math.random() * 26,
        grow: 46 + Math.random() * 42,
        kind: 'smoke',
        heat: 0,
        twinkle: 0,
      })
    }

    const emitSpark = (
      x: number,
      y: number,
      dirX: number,
      dirY: number,
      inheritX: number,
      inheritY: number,
    ) => {
      if (particles.length >= maxParticles) return
      const base = Math.atan2(dirY, dirX)
      // most sparks fly forward in a tight cone along the swipe; some peel wide
      const spread = Math.random() < 0.78 ? 0.6 : 1.4
      const angle = base + (Math.random() - 0.5) * spread
      // skewed speed: plenty of lazy embers, a few fast flyers
      const speed = 140 + Math.pow(Math.random(), 1.6) * 760
      particles.push({
        x: x + (Math.random() - 0.5) * 10,
        y: y + (Math.random() - 0.5) * 10,
        vx: Math.cos(angle) * speed + inheritX,
        vy: Math.sin(angle) * speed + inheritY,
        age: 0,
        life: 220 + Math.pow(Math.random(), 1.8) * 540,
        size: 1 + Math.random() * 1.8,
        grow: 0,
        kind: 'spark',
        heat: Math.random(),
        twinkle: Math.random() * Math.PI * 2,
      })
    }

    const tick = (now: number) => {
      const dt = Math.min((now - lastFrame) / 1000, 0.05) // seconds, clamped after tab switches
      lastFrame = now

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      const alive: Particle[] = []
      for (const p of particles) {
        p.age += dt * 1000
        if (p.age >= p.life) continue

        if (p.kind === 'spark') {
          p.vx -= p.vx * 2.4 * dt // air drag
          p.vy -= p.vy * 0.6 * dt
          p.vy += 1150 * dt // gravity — embers arc down
          if (p.vy > 1400) p.vy = 1400 // terminal velocity
        } else {
          p.vx -= p.vx * 1.4 * dt // air drag
          p.vy -= p.vy * 1.2 * dt
          p.vy -= 40 * dt // buoyancy — smoke keeps rising
        }
        p.x += p.vx * dt
        p.y += p.vy * dt
        p.size += p.grow * dt

        const t = p.age / p.life
        if (p.kind === 'smoke') {
          const alpha = t < 0.18 ? t / 0.18 : 1 - (t - 0.18) / 0.82 // fade in, then out
          ctx.globalAlpha = alpha
          ctx.drawImage(sprite, p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
        } else {
          // spark: streak length follows its current speed, color cools from
          // white-hot to orange, and it sputters (twinkles) as it burns out
          const speed = Math.hypot(p.vx, p.vy) || 1
          const nx = p.vx / speed
          const ny = p.vy / speed
          const streak = Math.min(4 + speed * 0.016, 20)
          const alpha = t < 0.06 ? t / 0.06 : 1 - ((t - 0.06) / 0.94) * 0.85
          const flicker = 0.78 + 0.22 * Math.sin(p.age * 0.05 + p.twinkle)
          const core = t < 0.3 + p.heat * 0.25 ? '#fff8e0' : t < 0.65 ? '#ffc14d' : '#f0640a'
          ctx.lineCap = 'round'
          // soft glow pass
          ctx.globalAlpha = alpha * flicker * 0.5
          ctx.strokeStyle = 'rgba(255,130,30,0.85)'
          ctx.lineWidth = p.size * 3.5
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - nx * streak, p.y - ny * streak)
          ctx.stroke()
          // hot core
          ctx.globalAlpha = alpha * flicker
          ctx.strokeStyle = core
          ctx.lineWidth = p.size
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(p.x - nx * streak * 0.7, p.y - ny * streak * 0.7)
          ctx.stroke()
        }
        alive.push(p)
      }
      particles = alive
      ctx.globalAlpha = 1

      if (particles.length > 0) {
        rafId = requestAnimationFrame(tick)
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        rafId = 0 // idle until the cursor moves again
      }
    }

    const onPointerMove = (e: PointerEvent) => {
      const x = e.clientX
      const y = e.clientY
      const dx = prevPointer ? x - prevPointer.x : 0
      const dy = prevPointer ? y - prevPointer.y : 0
      const elapsed = prevPointer ? Math.max((e.timeStamp - prevPointer.time) / 1000, 0.001) : 0
      prevPointer = { x, y, time: e.timeStamp }

      if (!lastEmit) {
        lastEmit = { x, y } // anchor the trail on the first move (no burst from 0,0)
        return
      }

      const dist = Math.hypot(x - lastEmit.x, y - lastEmit.y)
      if (dist < 15) return // only emit once the cursor travelled a bit

      // inherit a little of the cursor's motion so the smoke trails behind
      const inheritX = Math.max(-70, Math.min(70, dx * 0.35))
      const inheritY = Math.max(-70, Math.min(70, dy * 0.35))

      // fill gaps on fast sweeps so the trail stays continuous
      const steps = Math.min(Math.max(Math.floor(dist / 15), 1), 6)
      for (let i = 1; i <= steps; i++) {
        const t = i / steps
        emit(lastEmit.x + (x - lastEmit.x) * t, lastEmit.y + (y - lastEmit.y) * t, inheritX, inheritY)
      }
      // Instantaneous speed from a single event is unreliable (browsers coalesce
      // and gap pointer events, so a normal move can read as superhuman fast) —
      // smooth it over ~50ms so only *sustained* fast motion counts.
      const instSpeed = elapsed ? Math.min(Math.hypot(dx, dy) / elapsed, 15000) : smoothSpeed
      smoothSpeed += (instSpeed - smoothSpeed) * (1 - Math.exp(-elapsed / 0.05))

      const isFastFlick =
        smoothSpeed > 3500 && // sustained fast motion (normal moves sit around 800–2500)
        dist > 30 &&
        e.timeStamp - lastSparkAt > 450 && // bursts, not a continuous stream
        Math.random() < 0.85 // even a real flick doesn't always throw sparks
      if (isFastFlick) {
        lastSparkAt = e.timeStamp
        // random burst size: small showers are common, big sprays are rare
        const sparkCount =
          Math.random() < 0.12 ? 12 + Math.floor(Math.random() * 8) : 3 + Math.floor(Math.random() * 8)
        // sparks inherit a slice of the cursor's actual velocity (px/s)
        const sparkInheritX = Math.max(-350, Math.min(350, (dx / elapsed) * 0.15))
        const sparkInheritY = Math.max(-350, Math.min(350, (dy / elapsed) * 0.15))
        for (let i = 0; i < sparkCount; i++) {
          // scatter the spawn point back along the swipe so the burst has length
          const s = Math.random()
          emitSpark(x - dx * 0.35 * s, y - dy * 0.35 * s, dx, dy, sparkInheritX, sparkInheritY)
        }
      }
      lastEmit = { x, y }

      if (!rafId) {
        lastFrame = performance.now()
        rafId = requestAnimationFrame(tick)
      }
    }

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [rgb, maxParticles])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-50" />
}

export default SmokeCursor
