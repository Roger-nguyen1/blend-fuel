import styles from "../styles/Home.module.css";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <div data-theme="night">
      <NavBar />
      <main className="flex items-center justify-center">
        <h1>Welcome to Blend Fuel!</h1>
        <div>
          <input
            type="text"
            placeholder="Type ici"
            className="input input-bordered input-info w-full max-w-xs"
          />

          <p>du texte PAS ICI</p>
          <button className="btn btn-accent">Accent</button>
        </div>
      </main>
    </div>
  );
}

export default Home;
