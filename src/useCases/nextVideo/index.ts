import { VideoRepositoryFactory } from '../../repositories/factory';
import { NextVideoUseCase } from './NextVideoUseCase';
import { NextVideoController } from './NextVideoController';

const videoRepositoryFactory = VideoRepositoryFactory.getInstance();
const nextVideoUseCase = new NextVideoUseCase(videoRepositoryFactory);
const nextVideoController = new NextVideoController(nextVideoUseCase);

export { nextVideoController };
