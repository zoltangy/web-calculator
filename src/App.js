import React, { useState, useEffect } from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Themes";

import GlobalStyle from "./GlobalStyle";
import ThemeSelector from "./components/ThemeSelector";
import Calculator from "./components/Calculator";

function App() {
  const [themeToggle, setTheme] = useState(true);
  const [transitionEnabled, setTransitionEnabled] = useState(false);

  // enable transition only after initial load
  useEffect(() => {
    setTransitionEnabled(true);
  }, []);

  return (
    <ThemeProvider theme={themeToggle ? lightTheme : darkTheme}>
      <GlobalStyle transitionEnabled={transitionEnabled} />
      <ThemeSelector
        checked={themeToggle}
        handleToggle={() => setTheme(!themeToggle)}
      />
      <Calculator />
    </ThemeProvider>
  );
}

export default App;
