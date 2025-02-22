"use client";
import React, { FC, useState } from "react";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Header from "@/commons/Header/Header";
import CustomLayout from "@/commons/CustomLayout/CustomLayout";
import "pdfjs-dist/build/pdf.worker.min.mjs";

const TycPrivacyPolicy: FC = () => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <CustomLayout className="bg-white">
      <Header title="Terminos y Políticas de Privacidad" />
      <div className="w-[100%] flex-1 flex flex-col items-center overflow-y-auto">
        <Document
          file="/tyc-privacy-policy/tyc.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} scale={1.5} />
        </Document>
      </div>
      <div className="relative bottom-0 left-0 flex flex-row space-x-[1rem] items-center justify-center text-black py-[1rem]">
        <button type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          {"<"}
        </button>
        <p>
          Página {pageNumber || (numPages ? 1 : "--")} de {numPages || "--"}
        </p>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          {">"}
        </button>
      </div>
    </CustomLayout>
  );
};

export default TycPrivacyPolicy;
