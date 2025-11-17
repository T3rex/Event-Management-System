import Body from "./components/Body";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-start gap-10 bg-gray-100 ">
      <Header />
      <Body />
    </div>
  );
}

export default App;
