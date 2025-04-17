import { Toaster as HotToaster } from "react-hot-toast";

const Toaster = () => (
  <HotToaster
    position="top-right"
    toastOptions={{
      duration: 2000,
      style: {
        background: "#f9fafb",
        color: "#1f2937",
        fontSize: "14px",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow:
          "0 2px 6px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.06)",
      },
    }}
  />
);

export default Toaster;
