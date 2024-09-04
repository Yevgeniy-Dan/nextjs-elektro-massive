"use client";

import { useAppDispatch } from "@/store/hooks";
import { initializeCart } from "@/store/storeSlice";
import React, { useEffect } from "react";

export default function ClientInitializer() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeCart());
  }, [dispatch]);

  return null;
}
