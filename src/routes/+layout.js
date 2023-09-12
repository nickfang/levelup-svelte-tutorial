export async function load({ fetch }) {
  const allEpRes = await fetch('https://syntax.fm/api/shows');
  const allEpData = allEpRes.json();

  return {
    allEpisodes: allEpData,
  };
}