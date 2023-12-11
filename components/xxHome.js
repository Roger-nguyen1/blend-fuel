import "tailwindcss/tailwind.css";

function Home() {
  return (
    <div data-theme="night">
      <main className="font-nunito flex flex-col items-center justify-center">
        <h1 className="text-4xl mt-6">Bienvenue sur Blend Fuel!</h1>
        <p>La station essence la moins chère, à portée de main</p>
        <p></p>
      </main>
    </div>
  );
}

export default Home;
