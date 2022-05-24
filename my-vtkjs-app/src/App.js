import '@kitware/vtk.js/favicon';
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import '@kitware/vtk.js/Rendering/Profiles/Volume';
import '@kitware/vtk.js/Rendering/Profiles/Glyph';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';
import { useState } from 'react';
import Isovalue from './Iso';
import Cutting3d from './Cutting';
import Raycast from './RayCastting';
import Slice3d from './slice3d';
import Blendmode from './VolumeMapperBlendModes';
import Home from './Home';
function App() {

  const [index,setIndex] = useState(0)
  const [u,seturl]= useState('')
  const [showMenu,setShowMenu]=useState(false)
  // console.log(showMenu)

  const toggleMenu = ()=>{
    setShowMenu(!showMenu)
  }

  return(
    <>
    {index==0?<Home/>:null}
    {index==1?<Isovalue url={u} />:null}
    {index==2?<Cutting3d url={u}/>:null}
    {index==3?<Raycast urll={u}/>:null}
    {index==4?<Slice3d url={u}/>:null}
    {index==5?<Blendmode url={u}/>:null}



    <div>
        <div style={{
          zIndex: "100",
          position: "relative",
        }}>

<div class="menu-wrap">
  <input  onClick={toggleMenu} type="checkbox" class="toggler" />
  <div class="hamburger">
    <div></div>
  </div>
  <div class="menu">
    <div style={{display:showMenu?"block":"none"}}>
      <ul>
      <li><a href="#"    onClick={() => {setIndex(0) }}>Home Page</a></li>
        <li><a href="#"    onClick={() => {setIndex(1) }}>Iso Value</a></li>
        <li><a href="#"  onClick={() => {setIndex(2) }}>Cutting 3D</a></li>
        <li><a href="#" onClick={() => {setIndex(3) }}>Ray Casting</a></li>
        <li><a href="#" onClick={() => {setIndex(4) }}>Slicing 3d</a></li>
        <li><a href="#" onClick={() => {setIndex(5) }}>VM blend mode</a></li>

      </ul>
    </div>
  </div>
</div>
          <table   style={{overflow:"hidden", width: "100%" }}>
            <tr style={{ width: "100%", display: "flex" }}>
            </tr>
   
         <tr style={{position:"absolute", width: "100%", display: "flex",right:"30px", top:"26px" , fontSize:"20px"}}>
<div  >
<tr>
<tr>
            <nav class="navMenu">
      <a href="#"  key="skull" onClick={() => {seturl(`https://kitware.github.io/vtk-js/data/volume/headsq.vti`) }} >Skull</a>
      <a style={{marginLeft:"20px"}} href="#" key="chest" onClick={() => {seturl(`https://kitware.github.io/vtk-js/data/volume/LIDC2.vti`) }}>Chest</a>
      <div class="dot"></div>

    </nav>
</tr>
    </tr>         
</div>
<div>

</div>

            </tr>


          </table>
        </div>
    </div>

    </>
  )

}
export default App




