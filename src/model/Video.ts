class Video {
  duration: number;
  videoId: string;

  constructor({ videoId, duration }: Video) {
    this.videoId = videoId;
    this.duration = duration;
  }
}

export { Video };
