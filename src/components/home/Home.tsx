import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <pre className="arcii-art">
          {/* prettier-ignore */}
          <code> 
 __       _______     ___      .______     .__   __.      ______  __  ___ .______       _______ .______       ______   .___  ___.      ___          <br/>
|  |     |   ____|   /   \     |   _  \    |  \ |  |     /      ||  |/  / |   _  \     |   ____||   _  \     /  __  \  |   \/   |     / _ \         <br/>
|  |     |  |__     /  ^  \    |  |_)  |   |   \|  |    |  ,----'|  '  /  |  |_)  |    |  |__   |  |_)  |   |  |  |  | |  \  /  |    | | | |        <br/>
|  |     |   __|   /  /_\  \   |      /    |  . `  |    |  |     |        |   _        |   __|  |      /    |  |  |  | |  |\/|  |    | | | |        <br/>
|  `----.|  |____ /  _____  \  |  |\  \----|  |\   |    |  `----.|  .  \  |  |_)  |    |  |     |  |\  \----|  `--'  | |  |  |  |    | |_| |        <br/>
|_______||_______/__/     \__\ | _| `._____|__| \__|     \______||__|\__\ |______/     |__|     | _| `._____|\______/  |__|  |__|     \___/         <br/>
          </code>
        </pre>
        <br />
        <br />
        <a
          className="App-link"
          href="/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Let's Rock!
        </a>
      </header>
    </div>
  );
}

export default Home;
