import fetch from 'node-fetch';

export const handleData = async () => {
  try {
    const data = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=50&playlistId=PLofht4PTcKYnaH8w5olJCI-wUVxuoMHqM&key=${process.env.GOOGLE_API_KEY}`
    );
    const response = await data.json();

    return response;
  } catch (e) {
    console.log({});
  }
};
