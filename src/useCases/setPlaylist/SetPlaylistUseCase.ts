import { Video } from '../../model/Video';
import { VideoRepositoryFactory } from '../../repositories/factory'

class SetPlaylistUseCase {
  private videoRepositoryFactory: VideoRepositoryFactory

  constructor(videoRepositoryFactory: VideoRepositoryFactory) {
    this.videoRepositoryFactory = videoRepositoryFactory;
  }

  execute(playlist: Video[]): Video[] {
    return this.videoRepositoryFactory.setPlaylist(playlist)
  }
}

export { SetPlaylistUseCase }