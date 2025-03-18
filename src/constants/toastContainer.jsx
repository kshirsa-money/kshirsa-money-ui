import React, { useEffect, useState } from "react";
import { View } from "react-native";
import KshirsaToast from "../small-components/KshirsaToast";
import { toastListener } from "./toastUtils";

const ToastContainer = () => {
  const [toastConfig, setToastConfig] = useState({
    visible: false,
  });

  useEffect(() => {
    const handleShowToast = (config) => {
      setToastConfig(config);

      // Auto-hide after duration if show is true
      // if (config.show) {
      //   setTimeout(() => setToastConfig(null), config.duration);
      // }
    };

    toastListener.on("showToast", handleShowToast);

    return () => {
      toastListener.off("showToast", handleShowToast);
    };
  }, []);

  return (
    <View>
      {toastConfig && (
        <KshirsaToast
          message={toastConfig.message}
          type={toastConfig.type}
          visible={toastConfig.show}
          duration={toastConfig.duration}
          onHide={() => setToastConfig(null)}
          customStyles={{
            titleStyle: { color: toastConfig.titleColor },
            backgroundColor: toastConfig.backgroundColor || "black",
          }}
        />
      )}
    </View>
  );
};

export default ToastContainer;
