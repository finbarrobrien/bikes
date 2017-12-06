const getBikeNetworkInfo = async (provider) => {
  if (provider) {
    const responseJson = await fetch(`https://api.citybik.es/v2/networks/${provider}`)
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
};

const getCities = async () => {
  const responseJson = await fetch('https://api.citybik.es/v2/networks')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.warn('response not ok');
        }
      });
  return responseJson;
}

export { getBikeNetworkInfo, getCities };