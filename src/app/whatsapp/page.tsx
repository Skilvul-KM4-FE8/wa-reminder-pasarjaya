"use client";

import { useState } from "react";
import axios from "axios";

import QrScanner from "../components/mollecules/QrScanner";

export default function SendMessageForm() {
  return (
    <>
      <QrScanner />
    </>
  );
}
