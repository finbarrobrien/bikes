const getBikeNetworkInfo = async (city) => {
  if (city) {
    const responseJson = await fetch(`https://api.citybik.es/v2/networks/${city}`)
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            console.warn('response not ok');
          }
        });
    return responseJson.network;
  }
  return null;
}

export { getBikeNetworkInfo };