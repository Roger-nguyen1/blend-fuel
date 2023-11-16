import React from "react";
import "tailwindcss/tailwind.css";
import { Icon } from "@iconify/react";

function Account() {
  return (
    <div data-theme="night">
      <main className="font-nunito flex flex-col items-center justify-center">
        <div className="mt-24">
          <h1 className="text-3xl text-center">
            Développement du contenu en cours....
          </h1>
        </div>
        <Icon className="mt-20" icon="ic:baseline-construction" width="70" />
      </main>
    </div>
  );
}

export default Account;
