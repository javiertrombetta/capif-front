// "use client";
// import React, { FC } from "react";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import {
//   defaultLayoutPlugin,
//   ToolbarProps,
//   ToolbarSlot,
// } from "@react-pdf-viewer/default-layout";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import Header from "@/commons/Header/Header";

// type ToolbarType = (props: ToolbarProps) => React.ReactElement;

// const TycPrivacyPolicy: FC = () => {
//   const transform = (slot: ToolbarSlot) => ({
//     ...slot,
//     Open: () => <></>,
//     OpenMenuItem: () => <></>,
//     DownloadMenuItem: () => <></>,
//     Print: () => <></>,
//     PrintMenuItem: () => <></>,
//     Rotate: () => <></>,
//     RotateBackwardMenuItem: () => <></>,
//     RotateForwardMenuItem: () => <></>,
//     ShowProperties: () => <></>,
//     ShowPropertiesMenuItem: () => <></>,
//   });

//   const renderToolbar = (Toolbar: ToolbarType) => (
//     <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
//   );

//   const defaultLayoutPluginInstance = defaultLayoutPlugin({
//     renderToolbar,
//   });

//   const { renderDefaultToolbar } =
//     defaultLayoutPluginInstance.toolbarPluginInstance;

//   return (
//     <div className="h-[100vh] max-w-[100%] min-w-[100%] bg-[white] overflow-y-scroll overflow-x-hidden pb-[4rem]">
//       <Header title="Terminos y Políticas de Privacidad" />
//       <div>
//         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
//           <Viewer
//             enableSmoothScroll={true}
//             fileUrl={"/tyc-privacy-policy/tyc.pdf"}
//             plugins={[defaultLayoutPluginInstance]}
//           />
//         </Worker>
//       </div>
//     </div>
//   );
// };

// export default TycPrivacyPolicy;
