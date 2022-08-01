import { Video } from '../../model/Video';
import { VideoRepositoryFactory } from '../../repositories/factory';

class NextVideoUseCase {
  private videoRepositoryFactory: VideoRepositoryFactory;

  constructor(videoRepositoryFactory: VideoRepositoryFactory) {
    this.videoRepositoryFactory = videoRepositoryFactory
  }

  execute(): string {
    const position = this.videoRepositoryFactory.getPosition();
    const playlist = this.videoRepositoryFactory.getPlaylist();

    if (position === playlist.length - 1) {
      return this.videoRepositoryFactory.nextVideo(0)
    }

    return this.videoRepositoryFactory.nextVideo(position)
  }
}

export { NextVideoUseCase }