class Video {
  contentDetails: {
    videoId: string;
  };

  constructor({ contentDetails }: Video) {
    this.contentDetails = contentDetails;
  }
}

export { Video };
