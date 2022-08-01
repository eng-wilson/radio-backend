import { Video } from "../../model/Video";
import { VideoRepository } from "../VideoRepository";

class VideoRepositoryFactory implements VideoRepository {
  private playlist: Video[];
  private position: number;

  private static INSTANCE: VideoRepositoryFactory;

  private constructor() {
    this.playlist = [];
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

    return this.playlist[position].contentDetails.videoId;
  }

  getPlaylist(): Video[] {
    return this.playlist;
  }

  setPlaylist(playlist: Video[]): Video[] {
    this.playlist = playlist;

    return this.playlist;
  }

  getPosition(): number {
    return this.position;
  }

  getNowPlaying(): string {
    return this.playlist[this.position].contentDetails.videoId;
  }
}

export { VideoRepositoryFactory };
