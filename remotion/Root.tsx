import { Composition, registerRoot } from 'remotion'
import { HeroLoop } from './HeroLoop'

export function RemotionRoot() {
  return (
    <>
      <Composition
        id="HeroVideo"
        component={HeroLoop}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  )
}

registerRoot(RemotionRoot)
