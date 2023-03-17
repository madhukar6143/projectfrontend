import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Disease from "./tableData/disease";
import Symptoms from "./tableData/symptoms";
import Mappedtable from "./tableData/mappedtable";

function App() {
  return (
    <div className="App">
      <h1>Disease Prediction</h1>
     
      


      <div className="container border border-warning ">
        <div className="row">
          <div className="col-4 flex-col"> <Disease /></div>
          <div className="col-4 flex-col"> <Mappedtable /></div>
          <div className="col-4 flex-col"><Symptoms /></div>
        </div>
      </div>
    </div>
  );
}

export default App;
