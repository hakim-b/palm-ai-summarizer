import { ReactNode } from "react";

export type RootLayoutProps = {
  children: ReactNode;
};

export type ProvidersProps = {
  children: ReactNode;
};

declare global {
  interface Window {
    clipboardData: DataTransfer
  }
}
