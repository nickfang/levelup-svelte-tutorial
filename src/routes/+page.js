export async function load({ fetch, parent }) {
  const parentData = await parent();
  
  const res = await fetch('https://syntax.fm/api/shows/latest');
  const data = await res.json();

  return {
    latestEpisode: data,
  };
}