    import imagePath from "../constants/imagePath";
    
    const useGetCurrentTimeDetails = () => {
      const currentHour = new Date().getHours();
  
      if (currentHour >= 5 && currentHour < 12) {
        return {
          greeting: "Good Morning",
          image: imagePath.morning, // Replace with your morning image
        };
      } else if (currentHour >= 12 && currentHour < 15) {
        return {
          greeting: "Good Noon",
          image: imagePath.noon, // Replace with your noon image
        };
      } else if (currentHour >= 15 && currentHour < 18) {
        return {
          greeting: "Good Afternoon",
          image: imagePath.afternoon, // Replace with your afternoon image
        };
      } else if (currentHour >= 18 && currentHour < 21) {
        return {
          greeting: "Good Evening",
          image: imagePath.evening, // Replace with your evening image
        };
      } else {
        return {
          greeting: "Good Night",
          image: imagePath.night, // Replace with your night image
        };
      }
    }
export default useGetCurrentTimeDetails;