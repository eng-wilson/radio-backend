import { Video } from '../../model/Video';
import { VideoRepository } from '../VideoRepository';

class VideoRepositoryFactory implements VideoRepository {
  private playlist: Video[]
  private position: number

  private static INSTANCE: VideoRepositoryFactory

  private constructor() {
    this.playlist = []
    this.position = 0;
  }

  public static getInstance(): VideoRepositoryFactory {
    if (!VideoRepositoryFactory.INSTANCE) {
      VideoRepositoryFactory.INSTANCE = new VideoRepositoryFactory();
    }
    return VideoRepositoryFactory.INSTANCE;
  }

  nextVideo(position: number): string {
    this.position = position;

    return this.playlist[position].videoId;
  }

  getPlaylist(): Video[] {
    return this.playlist
  }

  setPlaylist(playlist: Video[]) {
    this.playlist = playlist;
  }

  getPosition(): number {
    return this.position
  }
}

export { VideoRepositoryFactory }