import { Video } from '../model/Video';

interface VideoRepository {
  nextVideo(position: number): string
  getPosition(): number
  getPlaylist(): Video[]
}

export { VideoRepository }