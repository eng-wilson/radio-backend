import { Video } from '../../model/Video'
import { SetPlaylistUseCase } from './SetPlaylistUseCase'

class SetPlaylistController {
  private setPlaylistUseCase: SetPlaylistUseCase

  constructor(setPlaylistUseCase: SetPlaylistUseCase) {
    this.setPlaylistUseCase = setPlaylistUseCase
  }

  handle(playlist: Video[]): Video[] {
    return this.setPlaylistUseCase.execute(playlist)
  }
}

export { SetPlaylistController }