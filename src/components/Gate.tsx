"use client";

import React, { PropsWithChildren } from "react";

type GateProps = PropsWithChildren<{
  /**
   * A boolean condition to determine if the
   * children should be rendered.
   */
  isAllowed: boolean;
}>;

/**
 * A component that conditionally renders its children
 * only if the `isAllowed` prop is true.
 */
export function Gate({ isAllowed, children }: GateProps) {
  console.log("test");

  if (!isAllowed) {
    return null;
  }

  // If the condition is true, render the children
  return (
  <>
  {children}
  </>);
}