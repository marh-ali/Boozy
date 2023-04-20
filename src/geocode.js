const API_KEY = process.env.GOOGLE_API;

export const geocodeAddress = async (address) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${API_KEY}`
  );

  const data = await response.json();

  if (data.status === "OK") {
    const location = data.results[0].geometry.location;
    return [location.lng, location.lat]; // Return coordinates as [longitude, latitude]
  } else {
    throw new Error("Error geocoding address");
  }
};
