"use client";

import { RecoilRoot, useRecoilValue } from "recoil";
import { currentViewURL } from "../atoms/currentView";

export default function () {
  const url = useRecoilValue(currentViewURL);
  return (
    <RecoilRoot>
      <div className="h-screen flex flex-col items-center">
        <h1 className="text-3xl font-semibold">PDF Viewer</h1>
        <iframe src={url} height={"94.5%"} width={"70%"}></iframe>
      </div>
    </RecoilRoot>
  );
}
