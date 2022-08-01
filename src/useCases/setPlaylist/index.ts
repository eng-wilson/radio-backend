import { VideoRepositoryFactory } from "../../repositories/factory";
import { SetPlaylistUseCase } from "./SetPlaylistUseCase";
import { SetPlaylistController } from "./SetPlaylistController";

const videoRepositoryFactory = VideoRepositoryFactory.getInstance();
const setPlaylistUseCase = new SetPlaylistUseCase(videoRepositoryFactory);
const setPlaylistController = new SetPlaylistController(setPlaylistUseCase);

export { setPlaylistController };
