---
project: grolin
role: support
---
# REMOTION GUIDE

> Complete Remotion reference for the Grolin hero video composition (Phase 15).
> Covers composition structure, animation functions, rendering, and integration.

---

## 1. Composition Structure

### Root Setup

```tsx
// remotion/Root.tsx
import { Composition } from 'remotion'
import { HeroComposition } from './HeroComposition'

export const RemotionRoot = () => (
  <>
    <Composition
      id="HeroVideo"
      component={HeroComposition}
      durationInFrames={150}    // 5 seconds at 30fps
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{
        theme: 'grolin-warm',
      }}
    />
  </>
)
```

### Sequence Timing

```tsx
// remotion/HeroComposition.tsx
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'

export const HeroComposition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#F0ECE8' }}>
      {/* Background mesh gradient — visible from frame 0 */}
      <Sequence from={0}>
        <MeshBackground />
      </Sequence>

      {/* Produce items fly in — staggered from frame 15 */}
      <Sequence from={15} durationInFrames={60}>
        <ProduceFloat items={produceItems} />
      </Sequence>

      {/* Basket fills — from frame 60 */}
      <Sequence from={60} durationInFrames={45}>
        <BasketFill />
      </Sequence>

      {/* Green trail effects — from frame 30 */}
      <Sequence from={30} durationInFrames={90}>
        <GreenTrails />
      </Sequence>

      {/* Final hero text reveal — from frame 90 */}
      <Sequence from={90}>
        <BrandReveal />
      </Sequence>
    </AbsoluteFill>
  )
}
```

---

## 2. Animation Functions

### interpolate() — Frame-Based Easing

```tsx
import { interpolate, Easing } from 'remotion'

const frame = useCurrentFrame()

// Fade in over 20 frames
const opacity = interpolate(frame, [0, 20], [0, 1], {
  extrapolateRight: 'clamp',
})

// Scale with overshoot
const scale = interpolate(frame, [0, 15, 20], [0.8, 1.05, 1.0], {
  extrapolateRight: 'clamp',
})

// Position with ease-out
const y = interpolate(frame, [0, 25], [60, 0], {
  extrapolateRight: 'clamp',
  easing: Easing.out(Easing.cubic),
})
```

### spring() — Physics-Based Motion

```tsx
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'

const frame = useCurrentFrame()
const { fps } = useVideoConfig()

// Gentle spring (like Grolin gentle recipe)
const scale = spring({
  frame,
  fps,
  config: {
    stiffness: 120,
    damping: 24,
    mass: 1.2,
  },
})

// Bounce spring (for produce items)
const produceScale = spring({
  frame: frame - 15, // delayed start
  fps,
  config: {
    stiffness: 220,
    damping: 18,
    mass: 1.0,
  },
})
```

### Stagger Pattern

```tsx
const ProduceFloat = ({ items }: { items: ProduceItem[] }) => {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()

  return (
    <>
      {items.map((item, index) => {
        const delay = index * 5 // 5 frames between each item
        const progress = spring({
          frame: frame - delay,
          fps,
          config: { stiffness: 180, damping: 16 },
        })

        return (
          <AbsoluteFill key={item.id}>
            <img
              src={staticFile(`produce/${item.file}`)}
              style={{
                position: 'absolute',
                left: item.startX,
                top: item.startY,
                transform: `
                  translate(
                    ${interpolate(progress, [0, 1], [item.startX, item.endX])}px,
                    ${interpolate(progress, [0, 1], [item.startY, item.endY])}px
                  )
                  scale(${interpolate(progress, [0, 1], [0.3, 1])})
                  rotate(${interpolate(progress, [0, 1], [item.startRotation, 0])}deg)
                `,
                opacity: interpolate(progress, [0, 0.2], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            />
          </AbsoluteFill>
        )
      })}
    </>
  )
}
```

---

## 3. Asset Management

### File References

```tsx
import { staticFile, Img } from 'remotion'

// Use staticFile() for assets in public/
<Img src={staticFile('images/remotion-sources/basket-empty.png')} />

// Available assets:
// public/images/remotion-sources/basket-empty.png
// public/images/remotion-sources/basket-full.png
// public/images/remotion-sources/produce/tomato.png
// public/images/remotion-sources/produce/lemon.png
// public/images/remotion-sources/produce/capsicum.png
// public/images/remotion-sources/produce/carrot.png
// public/images/remotion-sources/produce/grapes.png
// public/images/remotion-sources/produce/apple.png
```

### If Assets Are Missing

Use `nano-banana-2` skill to generate missing produce images:

```bash
infsh app run google/gemini-3-1-flash-image-preview --input '{
  "prompt": "Single tomato, photorealistic, white background, no shadow, product photography, 512x512",
  "aspect_ratio": "1:1",
  "resolution": "2K"
}'
```

---

## 4. Rendering Pipeline

### Preview (development)

```bash
npx remotion preview remotion/index.ts
```

### Render Final Video

```bash
# WebM (smaller, modern browsers)
npx remotion render remotion/index.ts HeroVideo public/videos/hero-composition.webm \
  --codec=vp8 \
  --crf=10 \
  --width=1920 \
  --height=1080

# MP4 fallback (wider compatibility)
npx remotion render remotion/index.ts HeroVideo public/videos/hero-composition.mp4 \
  --codec=h264 \
  --crf=18 \
  --width=1920 \
  --height=1080
```

### Output Requirements
- Resolution: ≥ 1280x720 (target 1920x1080)
- FPS: 30
- Duration: 4-6 seconds (120-180 frames at 30fps)
- File size: < 5MB WebM, < 8MB MP4
- Codec: VP8/WebM primary, H.264/MP4 fallback

---

## 5. Hero Integration Pattern

### Desktop Video + Mobile Static

```tsx
// src/components/home/HeroLayered.tsx
'use client'
import { useState, useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

function HeroVideo() {
  const [videoFailed, setVideoFailed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  // Skip video on mobile, reduced-motion, or failure
  if (isMobile || shouldReduceMotion || videoFailed) {
    return null // Static hero image handles fallback
  }

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover"
      poster="/images/hero/hero-basket.webp"
      onError={() => setVideoFailed(true)}
    >
      <source src="/videos/hero-composition.webm" type="video/webm" />
      <source src="/videos/hero-composition.mp4" type="video/mp4" />
    </video>
  )
}
```

### Fallback Chain
1. Desktop + motion OK → Video plays
2. Desktop + reduced motion → Static hero image
3. Mobile → Static hero image (always)
4. Video load error → Static hero image (graceful)
5. Slow network → Poster shows first, video streams when ready

### Performance Rules
- `poster` attribute prevents blank frame during load
- `playsInline` prevents fullscreen on iOS
- `muted` + `autoPlay` = autoplay works without user interaction
- Video element is absolutely positioned BEHIND hero content
- No CLS: video container has explicit dimensions matching hero

---

## 6. Grolin Brand Motion Guidelines

### Color Motion
- Green (#16945E) motion trails for commerce energy
- Purple (#6E49D8) accents for brand signature moments
- Warm ivory (#F0ECE8) as the canvas/background constant

### Typography Motion
- Plus Jakarta Sans weight 800 for animated headlines
- Text reveals: opacity + translateY, NEVER typewriter effect
- Brand name "GROLIN" may use letter-spacing animation (subtle, 0.02em → 0em)

### Composition Narrative
```
Act 1 (0-2s): Fresh produce items float in from edges
Act 2 (2-4s): Items converge toward central basket
Act 3 (4-5s): Basket transitions from empty → full, brand moment
```

---

*Remotion Guide for the Grolin frontend transformation. Referenced by P15 sessions.*
