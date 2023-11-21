import React, { useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

function NavBarTop() {
  const router = useRouter();
  const [active, setActive] = useState(1); // Définir l'index du bouton "Mix carburant" comme actif par défaut

  const links = [
    {
      label: "Compte",
      to: "/account",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 inline-block mr-1"
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
      ),
    },
    {
      label: "Mix carburant",
      to: "/",
      icon: <Icon icon="ic:twotone-blender" width="25" height="25" />,
    },
    {
      label: "🔎 par carburant",
      to: "/fuelsearch",
      icon: <Icon icon="ri:gas-station-fill" width="25" height="25" />,
    },
  ];

  const Button = ({ index, children, to, icon }) => (
    <a
      className={`basis-0 grow py-3 px-4 inline-flex justify-center items-center gap-2 ${
        index === active
          ? "bg-indigo-600 hover:bg-indigo-800 text-white cursor-pointer"
          : "bg-transparent text-gray-500 hover:text-indigo-600 dark:hover:text-gray-400 cursor-pointer"
      } text-sm font-medium text-center rounded-lg dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}
      onClick={() => {
        setActive(index);
        router.push(to);
      }}
    >
      {icon}
      {children}
    </a>
  );

  return (
    <nav className="flex space-x-2">
      {links.map((link, index) => (
        <Button key={index} index={index} to={link.to} icon={link.icon}>
          {link.label}
        </Button>
      ))}
    </nav>
  );
}

export default NavBarTop;
