import fetch from 'node-fetch';

export const handlePlaylistData = async () => {
  try {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=100&playlistId=${process.env.PLAYLIST_ID}&key=${process.env.GOOGLE_API_KEY}`
    );
    const response = await data.json();

    return response;
  } catch (e) {
    console.log({});
  }
};

export const handleVideoDuration = async (videoId) => {
  try {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${process.env.GOOGLE_API_KEY}`
    );
    const response = await data.json();

    const { duration } = response.items[0].contentDetails;

    const minutes = Number(duration.split('PT')[1].split('M')[0]) * 60;
    const seconds = Number(duration.split('PT')[1].split('M')[1].split('S')[0]);

    return minutes + seconds;
  } catch (e) {
    console.log({});
  }
};
