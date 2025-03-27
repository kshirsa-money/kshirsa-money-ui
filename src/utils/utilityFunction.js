import uiRoutes from "../constants/uiRoutes";

export const handleBackNavigation = (router, fallbackRoute = uiRoutes.main) => {
    if (router.canGoBack && router.canGoBack()) {
      // Navigate back if there is a previous route
      router.back();
    } else {
      // Navigate to the fallback route if no history exists
      router.push(fallbackRoute);
    }
  };