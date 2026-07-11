import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

interface Point {
  x: number
  y: number
  wave: { x: number; y: number }
  cursor: { x: number; y: number; vx: number; vy: number }
}

interface WavesBackgroundProps {
  className?: string
  strokeColor?: string
  backgroundColor?: string
  opacity?: number
}

export function WavesBackground({
  className = '',
  strokeColor = 'rgba(0, 232, 124, 0.3)',
  backgroundColor = '#070712',
  opacity = 1,
}: WavesBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const mouseRef = useRef({ x: -10, y: 0, lx: 0, ly: 0, sx: 0, sy: 0, v: 0, vs: 0, a: 0, set: false })
  const pathsRef = useRef<SVGPathElement[]>([])
  const linesRef = useRef<Point[][]>([])
  const noiseRef = useRef<((x: number, y: number) => number) | null>(null)
  const rafRef = useRef<number | null>(null)
  const boundingRef = useRef<DOMRect | null>(null)

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return
    noiseRef.current = createNoise2D()
    setSize()
    setLines()
    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    containerRef.current.addEventListener('touchmove', onTouchMove, { passive: false })
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      containerRef.current?.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  const setSize = () => {
    if (!containerRef.current || !svgRef.current) return
    boundingRef.current = containerRef.current.getBoundingClientRect()
    const { width, height } = boundingRef.current
    svgRef.current.style.width = `${width}px`
    svgRef.current.style.height = `${height}px`
  }

  const setLines = () => {
    if (!svgRef.current || !boundingRef.current) return
    const { width, height } = boundingRef.current
    linesRef.current = []
    pathsRef.current.forEach(p => p.remove())
    pathsRef.current = []
    const xGap = 12
    const yGap = 10
    const oWidth = width + 200
    const oHeight = height + 30
    const totalLines = Math.ceil(oWidth / xGap)
    const totalPoints = Math.ceil(oHeight / yGap)
    const xStart = (width - xGap * totalLines) / 2
    const yStart = (height - yGap * totalPoints) / 2
    for (let i = 0; i < totalLines; i++) {
      const points: Point[] = []
      for (let j = 0; j < totalPoints; j++) {
        points.push({ x: xStart + xGap * i, y: yStart + yGap * j, wave: { x: 0, y: 0 }, cursor: { x: 0, y: 0, vx: 0, vy: 0 } })
      }
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('fill', 'none')
      path.setAttribute('stroke', strokeColor)
      path.setAttribute('stroke-width', '0.8')
      svgRef.current.appendChild(path)
      pathsRef.current.push(path)
      linesRef.current.push(points)
    }
  }

  const onResize = () => { setSize(); setLines() }
  const onMouseMove = (e: MouseEvent) => updateMouse(e.pageX, e.pageY)
  const onTouchMove = (e: TouchEvent) => { e.preventDefault(); updateMouse(e.touches[0].clientX, e.touches[0].clientY) }

  const updateMouse = (x: number, y: number) => {
    if (!boundingRef.current) return
    const m = mouseRef.current
    m.x = x - boundingRef.current.left
    m.y = y - boundingRef.current.top + window.scrollY
    if (!m.set) { m.sx = m.x; m.sy = m.y; m.lx = m.x; m.ly = m.y; m.set = true }
  }

  const movePoints = (time: number) => {
    const noise = noiseRef.current
    if (!noise) return
    const m = mouseRef.current
    linesRef.current.forEach(points => {
      points.forEach(p => {
        const move = noise((p.x + time * 0.006) * 0.003, (p.y + time * 0.002) * 0.002) * 8
        p.wave.x = Math.cos(move) * 14
        p.wave.y = Math.sin(move) * 6
        const dx = p.x - m.sx
        const dy = p.y - m.sy
        const d = Math.hypot(dx, dy)
        const l = Math.max(175, m.vs)
        if (d < l) {
          const s = 1 - d / l
          const f = Math.cos(d * 0.001) * s
          p.cursor.vx += Math.cos(m.a) * f * l * m.vs * 0.0003
          p.cursor.vy += Math.sin(m.a) * f * l * m.vs * 0.0003
        }
        p.cursor.vx += (0 - p.cursor.x) * 0.012
        p.cursor.vy += (0 - p.cursor.y) * 0.012
        p.cursor.vx *= 0.96
        p.cursor.vy *= 0.96
        p.cursor.x += p.cursor.vx
        p.cursor.y += p.cursor.vy
        p.cursor.x = Math.min(50, Math.max(-50, p.cursor.x))
        p.cursor.y = Math.min(50, Math.max(-50, p.cursor.y))
      })
    })
  }

  const moved = (p: Point, withCursor = true) => ({
    x: p.x + p.wave.x + (withCursor ? p.cursor.x : 0),
    y: p.y + p.wave.y + (withCursor ? p.cursor.y : 0),
  })

  const drawLines = () => {
    linesRef.current.forEach((points, i) => {
      if (points.length < 2 || !pathsRef.current[i]) return
      const fp = moved(points[0], false)
      let d = `M ${fp.x} ${fp.y}`
      for (let j = 1; j < points.length; j++) {
        const c = moved(points[j])
        d += ` L ${c.x} ${c.y}`
      }
      pathsRef.current[i].setAttribute('d', d)
    })
  }

  const tick = (time: number) => {
    const m = mouseRef.current
    m.sx += (m.x - m.sx) * 0.1
    m.sy += (m.y - m.sy) * 0.1
    const dx = m.x - m.lx
    const dy = m.y - m.ly
    m.v = Math.hypot(dx, dy)
    m.vs += (m.v - m.vs) * 0.1
    m.vs = Math.min(100, m.vs)
    m.lx = m.x
    m.ly = m.y
    m.a = Math.atan2(dy, dx)
    movePoints(time)
    drawLines()
    rafRef.current = requestAnimationFrame(tick)
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ backgroundColor, opacity }}
    >
      <svg ref={svgRef} className="block w-full h-full" xmlns="http://www.w3.org/2000/svg" />
    </div>
  )
}
