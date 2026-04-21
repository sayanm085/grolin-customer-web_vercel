'use client'
import {
  AbsoluteFill,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

// ─── Brand tokens ─────────────────────────────────────────────────────────────
const CANVAS   = '#F0ECE8' // warm ivory
const GREEN    = '#16945E' // commerce CTA
const PURPLE   = '#6E49D8' // brand accent

// ─── Produce layout — positioned for 1920×1080 widescreen ────────────────────
// Produce items orbit the canvas edges; basket sits center-right for visual balance
// with hero text sitting center-left at integration time
const PRODUCE = [
  // top-left cluster
  { src: staticFile('images/remotion-sources/produce/tomato.png'),   cx: 260,  cy: 180, size: 130, startFrame: 8,  rotation: -12 },
  { src: staticFile('images/remotion-sources/produce/lemon.png'),    cx: 420,  cy: 90,  size: 110, startFrame: 18, rotation: 8   },
  // top-right cluster
  { src: staticFile('images/remotion-sources/produce/apple.png'),    cx: 1580, cy: 130, size: 120, startFrame: 26, rotation: 15  },
  { src: staticFile('images/remotion-sources/produce/capsicum.png'), cx: 1720, cy: 240, size: 115, startFrame: 36, rotation: 6   },
  // bottom-left cluster
  { src: staticFile('images/remotion-sources/produce/carrot.png'),   cx: 200,  cy: 820, size: 120, startFrame: 44, rotation: -8  },
  // bottom-right cluster
  { src: staticFile('images/remotion-sources/produce/grapes.png'),   cx: 1700, cy: 860, size: 130, startFrame: 54, rotation: -5  },
]

// ─── Per-item float: sine drift for idle feel after entry ─────────────────────
function useFloat(frame: number, index: number): number {
  const speed     = 0.035 + index * 0.006
  const amplitude = 7 + (index % 3) * 3
  return Math.sin(frame * speed + index * 1.4) * amplitude
}

// ─── Green motion trail — a radial smear that fades quickly ──────────────────
function GreenTrail({ cx, cy, size, startFrame, index }: { cx: number; cy: number; size: number; startFrame: number; index: number }) {
  const frame = useCurrentFrame()
  const elapsed = frame - startFrame

  if (elapsed < 0 || elapsed > 18) return null

  const opacity = interpolate(elapsed, [0, 6, 18], [0.0, 0.22, 0.0], { extrapolateRight: 'clamp' })
  const scale   = interpolate(elapsed, [0, 18], [0.4, 1.8], { extrapolateRight: 'clamp' })

  return (
    <div
      style={{
        position: 'absolute',
        left: cx - size,
        top: cy - size,
        width: size * 2,
        height: size * 2,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${GREEN} 0%, transparent 70%)`,
        opacity,
        transform: `scale(${scale})`,
        pointerEvents: 'none',
      }}
    />
  )
}

// ─── Single produce item ──────────────────────────────────────────────────────
function ProduceItem({
  src, cx, cy, size, startFrame, rotation, index,
}: (typeof PRODUCE)[number] & { index: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  const elapsed  = frame - startFrame
  const floatY   = useFloat(frame, index)

  // Bounce spring — ANIMATION_TOOLKIT §1 "bounce" recipe
  const entryProgress =
    elapsed >= 0
      ? spring({
          frame: elapsed,
          fps,
          config: { stiffness: 220, damping: 18, mass: 1.0 },
        })
      : 0

  const opacity    = interpolate(Math.max(0, elapsed), [0, 6], [0, 1], { extrapolateRight: 'clamp' })
  const scale      = interpolate(entryProgress, [0, 1], [0.42, 1])
  const translateY = interpolate(entryProgress, [0, 1], [40, 0])

  return (
    <div
      style={{
        position: 'absolute',
        left: cx - size / 2,
        top: cy - size / 2 + translateY + floatY,
        width: size,
        height: size,
        opacity,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: 'center center',
        willChange: 'transform, opacity',
      }}
    >
      <Img
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}

// ─── Mesh background — warm canvas + subtle radials ──────────────────────────
function MeshBackground() {
  return (
    <AbsoluteFill style={{ backgroundColor: CANVAS }}>
      {/* Purple brand radial — centred soft glow */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 70% 60% at 62% 50%, rgba(110,73,216,0.08) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Green warmth — bottom-left energy */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 55% 45% at 25% 80%, rgba(22,148,94,0.07) 0%, transparent 65%)`,
          pointerEvents: 'none',
        }}
      />
      {/* Warm amber highlight — top edge */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse 90% 30% at 50% 0%, rgba(240,236,232,0.6) 0%, transparent 100%)`,
          pointerEvents: 'none',
        }}
      />
    </AbsoluteFill>
  )
}

// ─── Brand reveal — Act 3 text moment ────────────────────────────────────────
function BrandReveal() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Gentle spring — ANIMATION_TOOLKIT §1 "gentle" recipe
  const progress = spring({
    frame,
    fps,
    config: { stiffness: 120, damping: 24, mass: 1.2 },
  })

  const opacity    = interpolate(progress, [0, 1], [0, 1])
  const translateY = interpolate(progress, [0, 1], [16, 0])

  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        bottom: 160,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: `rgba(22,148,94,0.6)`,
        }}
      >
        GROLIN
      </div>
      <div
        style={{
          fontFamily: '"Plus Jakarta Sans", sans-serif',
          fontSize: 13,
          fontWeight: 500,
          color: `rgba(0,0,0,0.35)`,
          letterSpacing: '0.06em',
          marginTop: 4,
        }}
      >
        Fresh · Local · Premium
      </div>
    </div>
  )
}

// ─── Basket — centred, crossfades empty → full ────────────────────────────────
function BasketLayer() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  // Act 1: basket fades in frames 0-18 (gentle spring)
  const entryProgress = spring({
    frame,
    fps,
    config: { stiffness: 120, damping: 24, mass: 1.2 },
    durationInFrames: 22,
  })
  const basketEntryOpacity = interpolate(entryProgress, [0, 1], [0, 1])

  // Act 3: crossfade empty → full: frames 100-120
  const crossfadeProgress = spring({
    frame: Math.max(0, frame - 100),
    fps,
    config: { stiffness: 80, damping: 22, mass: 1.0 },
    durationInFrames: 20,
  })
  const basketFullOpacity  = interpolate(crossfadeProgress, [0, 1], [0, 1])
  const basketEmptyFadeOut = interpolate(crossfadeProgress, [0, 1], [1, 0])

  // Gentle idle float throughout
  const basketFloat = Math.sin(frame * 0.028) * 5

  // Purple pulse ring — appears at Act 3 brand moment
  const pulseProg = spring({
    frame: Math.max(0, frame - 108),
    fps,
    config: { stiffness: 120, damping: 24, mass: 1.2 },
    durationInFrames: 25,
  })
  const pulseOpacity = interpolate(crossfadeProgress, [0, 0.5, 1], [0, 0.3, 0])

  return (
    <div
      style={{
        position: 'absolute',
        left: '55%',
        top: '50%',
        transform: `translate(-50%, calc(-50% + ${basketFloat}px))`,
        width: 460,
        height: 460,
      }}
    >
      {/* Purple brand ring pulse behind basket */}
      <div
        style={{
          position: 'absolute',
          inset: -60,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${PURPLE} 0%, transparent 65%)`,
          opacity: pulseOpacity,
          transform: `scale(${interpolate(pulseProg, [0, 1], [0.7, 1.1])})`,
        }}
      />

      {/* Empty basket */}
      <Img
        src={staticFile('images/remotion-sources/basket-empty.png')}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'contain',
          opacity: basketEntryOpacity * basketEmptyFadeOut,
        }}
      />

      {/* Full basket */}
      <Img
        src={staticFile('images/remotion-sources/basket-full.png')}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'contain',
          opacity: frame >= 100 ? basketFullOpacity : 0,
        }}
      />
    </div>
  )
}

// ─── Main composition — 1920×1080, 5s, 30fps ─────────────────────────────────
export function HeroLoop() {
  return (
    <AbsoluteFill style={{ backgroundColor: CANVAS, overflow: 'hidden' }}>

      {/* Layer 0: Background mesh — always visible */}
      <Sequence from={0}>
        <MeshBackground />
      </Sequence>

      {/* Layer 1: Basket — fades in early, crossfades in Act 3 */}
      <Sequence from={0}>
        <BasketLayer />
      </Sequence>

      {/* Layer 2: Green motion trails — accompany each produce entry */}
      <Sequence from={0}>
        <>
          {PRODUCE.map((item, index) => (
            <GreenTrail
              key={`trail-${index}`}
              cx={item.cx} cy={item.cy}
              size={item.size}
              startFrame={item.startFrame}
              index={index}
            />
          ))}
        </>
      </Sequence>

      {/* Layer 3: Produce items — staggered float-in (Act 1 + 2) */}
      <Sequence from={0}>
        <>
          {PRODUCE.map((item, index) => (
            <ProduceItem key={item.src} {...item} index={index} />
          ))}
        </>
      </Sequence>

      {/* Layer 4: Brand reveal — Act 3 text moment (from frame 108) */}
      <Sequence from={108}>
        <BrandReveal />
      </Sequence>

    </AbsoluteFill>
  )
}
