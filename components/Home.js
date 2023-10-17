import styles from "../styles/Home.module.css";

function Home() {
  return (
    <div>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <div>
          <input
            type="text"
            placeholder="Type ici"
            className="input input-bordered input-info w-full max-w-xs"
          />
          <p>du texte PAS ICI</p>
        </div>
      </main>
    </div>
  );
}

export default Home;
