import '@kitware/vtk.js/favicon';
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';

function Home() {
  
    vtkFullScreenRenderWindow.newInstance({
        background: [0.5, 0.5, 0.5],
      });
      return (
        <div >
        <div style={{right:"1000px",position:"absolute",left:"calc(50% - 230px)",top:"19%",color:"white", zIndex: "7",width:"700px", fontSize:"30px"}}>
      Welcome to DICOM Reader
        </div>  
        <div  style={{right:"1000px",position:"absolute",left:"calc(50% - 500px)",top:"34%",color:"white", zIndex: "7",width:"1000px" , fontSize:"25px"}}>
      Open the side bar to choose your function, And to load data click on the skull or chest at the to of this page.
        </div>
        </div>
    )
}
  export default Home
  