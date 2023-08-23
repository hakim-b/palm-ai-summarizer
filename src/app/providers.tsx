"use client";

import { app, firebaseConfig } from "@/firebase.config";
import { ProvidersProps } from "@/types";
import { getFirestore } from "firebase/firestore";
import { FirebaseAppProvider, FirestoreProvider } from "reactfire";

function Providers({ children }: ProvidersProps) {
  const firestoreInstance = getFirestore(app);

  return (
    <>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <FirestoreProvider sdk={firestoreInstance}>
          {children}
        </FirestoreProvider>
      </FirebaseAppProvider>
    </>
  );
}

export default Providers;
