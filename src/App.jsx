import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Main from "./components/Main"
import SideBar from "./components/SideBar"

function App() {
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
  const [showModal, setShowModal] = useState(false);

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchAPIData() {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`;
      try {
        const today = (new Date()).toDateString();
        const localKey= `NASA-${today}`;
        if (localStorage.getItem(localKey)) {
          const localData = localStorage.getItem(localKey);
          setData(JSON.parse(localData));
          return;
        }

        localStorage.clear();

        const res = await fetch(url);
        const APIData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(APIData));
        setData(APIData);
      }
      catch (err) {
      }
    }
    fetchAPIData();
  }, []);

  return (
    data ? (<>
      <Main data={data} />
      {showModal && (<SideBar data={data} handleToggleModal={handleToggleModal} />)}
      <Footer title={data.title} handleToggleModal={handleToggleModal} />
    </>) :
    (<div className="loadingState">
      <i className="fa-solid fa-gear"></i>
    </div>)
  )
}

export default App
