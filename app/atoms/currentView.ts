"use client";
import { atom } from "recoil";

export const currentViewURL = atom({
  key: "pdfurl",
  default: "",
});
