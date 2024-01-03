import { ThemeProvider } from "./ThemeProvider";
import Layout from "./layout";
import "./style.css";

function App() {
  return (
    <ThemeProvider>
      <Layout>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae, officiis.</p>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
