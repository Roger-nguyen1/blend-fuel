import React, { useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

function NavBarold() {
  const router = useRouter();
  const [active, setActive] = useState(0);

  const Button = ({ index, children, to }) => (
    <button
      className={index === active ? "active" : ""}
      onClick={() => {
        setActive(index);
        router.push(to);
      }}
    >
      {children}
    </button>
  );

  return (
    <div className="btm-nav">
      <Button index={1} to="/account">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="btm-nav-label">Compte</span>
      </Button>
      <Button index={0} to="/">
        <Icon icon="ic:twotone-blender" width="25" height="25" />
        <span className="btm-nav-label">Mix Carburant</span>
      </Button>
      <Button index={2} to="/fuelsearch">
        <Icon icon="ri:gas-station-fill" width="25" height="25" />
        <span className="btm-nav-label">🔎 par carburant</span>
      </Button>
    </div>
  );
}

export default NavBarold;
