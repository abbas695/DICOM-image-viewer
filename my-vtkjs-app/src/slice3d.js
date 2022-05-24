import '@kitware/vtk.js/favicon';
import '@kitware/vtk.js/Rendering/Profiles/Volume';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import vtkImageMapper from '@kitware/vtk.js/Rendering/Core/ImageMapper';
import vtkImageSlice from '@kitware/vtk.js/Rendering/Core/ImageSlice';
const controlPanel = `<table style="display:none">
<tr>
    <td>Slice I</td>
    <td>
        <input class='sliceI'/>
    </td>
</tr>
<tr>
    <td>Slice J</td>
    <td>
        <input class='sliceJ'/>
    </td>
</tr>
<tr>
    <td>Slice K</td>
    <td>
        <input class='sliceK'/>
    </td>
</tr>
<tr>
    <td>Color level</td>
    <td>
        <input class='colorLevel' />
    </td>
</tr>
<tr>
    <td>ColorWindow</td>
    <td>
        <input class='colorWindow'/>
    </td>
</tr>
</table>`;
const Slice3d=({url})=>{
const fullScreenRenderWindow = vtkFullScreenRenderWindow.newInstance({
  background: [0, 0, 0],
});
const renderWindow = fullScreenRenderWindow.getRenderWindow();
const renderer = fullScreenRenderWindow.getRenderer();
fullScreenRenderWindow.addController(controlPanel);
const imageActorI = vtkImageSlice.newInstance();
const imageActorJ = vtkImageSlice.newInstance();
const imageActorK = vtkImageSlice.newInstance();
renderer.addActor(imageActorK);
renderer.addActor(imageActorJ);
renderer.addActor(imageActorI);

function updateColorLevel(e) {
  const colorLevel = Number(
    (e ? e.target : document.querySelector('.colorLevel')).value
  );
  imageActorI.getProperty().setColorLevel(colorLevel);
  imageActorJ.getProperty().setColorLevel(colorLevel);
  imageActorK.getProperty().setColorLevel(colorLevel);
  renderWindow.render();
}

function updateColorWindow(e) {
  const colorLevel = Number(
    (e ? e.target : document.querySelector('.colorWindow')).value
  );
  imageActorI.getProperty().setColorWindow(colorLevel);
  imageActorJ.getProperty().setColorWindow(colorLevel);
  imageActorK.getProperty().setColorWindow(colorLevel);
  renderWindow.render();
}

const reader = vtkHttpDataSetReader.newInstance({
  fetchGzip: true,
});
reader
  .setUrl(url, { loadData: true })
  .then(() => {
    const data = reader.getOutputData();
    const dataRange = data.getPointData().getScalars().getRange();
    const extent = data.getExtent();
    const imageMapperK = vtkImageMapper.newInstance();
    imageMapperK.setInputData(data);
    imageMapperK.setKSlice(30);
    imageActorK.setMapper(imageMapperK);
    const imageMapperJ = vtkImageMapper.newInstance();
    imageMapperJ.setInputData(data);
    imageMapperJ.setJSlice(30);
    imageActorJ.setMapper(imageMapperJ);
    const imageMapperI = vtkImageMapper.newInstance();
    imageMapperI.setInputData(data);
    imageMapperI.setISlice(30);
    imageActorI.setMapper(imageMapperI);
    renderer.resetCamera();
    renderer.resetCameraClippingRange();
    renderWindow.render();
    ['.sliceI', '.sliceJ', '.sliceK'].forEach((selector, idx) => {
      const el = document.querySelector(selector);
      el.setAttribute('min', extent[idx * 2 + 0]);
      el.setAttribute('max', extent[idx * 2 + 1]);
      el.setAttribute('value', 30);
    });
    ['.colorLevel', '.colorWindow'].forEach((selector) => {
      document.querySelector(selector).setAttribute('max', dataRange[1]);
      document.querySelector(selector).setAttribute('value', dataRange[1]);
    });
    document
      .querySelector('.colorLevel')
      .setAttribute('value', (dataRange[0] + dataRange[1]) / 2);
    updateColorLevel();
    updateColorWindow();
  });
document.querySelector('.sliceI').addEventListener('input', (e) => {
  imageActorI.getMapper().setISlice(Number(e.target.value));
  renderWindow.render();
});
document.querySelector('.sliceJ').addEventListener('input', (e) => {
  imageActorJ.getMapper().setJSlice(Number(e.target.value));
  renderWindow.render();
});
document.querySelector('.sliceK').addEventListener('input', (e) => {
  imageActorK.getMapper().setKSlice(Number(e.target.value));
  renderWindow.render();
});
document
  .querySelector('.colorLevel')
  .addEventListener('input', updateColorLevel);
document
  .querySelector('.colorWindow')
  .addEventListener('input', updateColorWindow);
global.fullScreen = fullScreenRenderWindow;
global.imageActorI = imageActorI;
global.imageActorJ = imageActorJ;
global.imageActorK = imageActorK;
return (
    <div style={{color:"white", overflow:"hidden",
    zIndex: "6",
    position:"absolute", left:"1000px"
  }}>
<tr>
   <p> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;  slice I </p>

  <td style={{fontSize:"17px"}}>
    <input class='sliceI' type="range" min="0.0" max="1.0" step="0.05" />
  </td>
</tr>
<tr> 
   <p> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;  slice J </p>

  <td style={{fontSize:"17px"}}>
    <input class='sliceJ' type="range" min="0.0" max="1.0" step="0.05" />
  </td>
</tr>
<tr>
    
   <p> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;  slice K </p>

  <td style={{fontSize:"17px"}}>
    <input class='sliceK' type="range" min="0.0" max="1.0" step="0.05" />
  </td>
</tr>
<tr>
    
   <p> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;  color Level</p>

  <td style={{fontSize:"17px"}}>
    <input class='colorLevel' type="range" min="0.0" max="1.0" step="0.05" />
  </td>
</tr>
<tr>
    
   <p> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; color Window </p>

  <td style={{fontSize:"17px"}}>
    <input class='colorWindow' type="range" min="0.0" max="1.0" step="0.05" />
  </td>
</tr>
</div>
)
}
export default Slice3d