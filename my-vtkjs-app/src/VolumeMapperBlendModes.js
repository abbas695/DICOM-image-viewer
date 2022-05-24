import '@kitware/vtk.js/favicon';
import '@kitware/vtk.js/Rendering/Profiles/Volume';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import vtkPiecewiseFunction from '@kitware/vtk.js/Common/DataModel/PiecewiseFunction';
import vtkColorTransferFunction from '@kitware/vtk.js/Rendering/Core/ColorTransferFunction';
import vtkVolume from '@kitware/vtk.js/Rendering/Core/Volume';
import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper';


const Blendmode=({url})=>{
const fullScreenRenderer = vtkFullScreenRenderWindow.newInstance({
  background: [0, 0, 0],
});
const renderer = fullScreenRenderer.getRenderer();
const renderWindow = fullScreenRenderer.getRenderWindow();
const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
const actor = vtkVolume.newInstance();
const mapper = vtkVolumeMapper.newInstance();
mapper.setSampleDistance(1.3);
mapper.setPreferSizeOverAccuracy(true);
actor.setMapper(mapper);

const ofun = vtkPiecewiseFunction.newInstance();
ofun.addPoint(-3024, 0.1);
ofun.addPoint(-637.62, 0.1);
ofun.addPoint(700, 0.5);
ofun.addPoint(3071, 0.9);

const ctfun = vtkColorTransferFunction.newInstance();
ctfun.addRGBPoint(-3024, 0, 0, 0);
ctfun.addRGBPoint(-637.62, 0, 0, 0);
ctfun.addRGBPoint(700, 1, 1, 1);
ctfun.addRGBPoint(3071, 1, 1, 1);

actor.getProperty().setRGBTransferFunction(0, ctfun);
actor.getProperty().setScalarOpacity(0, ofun);
actor.getProperty().setScalarOpacityUnitDistance(0, 3.0);
actor.getProperty().setInterpolationTypeToLinear();
actor.getProperty().setShade(true);
actor.getProperty().setAmbient(0.1);
actor.getProperty().setDiffuse(0.9);
actor.getProperty().setSpecular(0.2);
actor.getProperty().setSpecularPower(10.0);

mapper.setInputConnection(reader.getOutputPort());

function updateBlendMode(event) {
  const blendMode = parseInt(event.target.value, 10);
  const ipScalarEls = document.querySelectorAll('.ipScalar');

  mapper.setBlendMode(blendMode);
  mapper.setIpScalarRange(0.0, 1.0);

  // if average or additive blend mode
  if (blendMode === 3 || blendMode === 4) {
    // Show scalar ui
    for (let i = 0; i < ipScalarEls.length; i += 1) {
      const el = ipScalarEls[i];
      el.style.display = 'table-row';
    }
  } else {
    // Hide scalar ui
    for (let i = 0; i < ipScalarEls.length; i += 1) {
      const el = ipScalarEls[i];
      el.style.display = 'none';
    }
  }

  renderWindow.render();
}

function updateScalarMin(event) {
  mapper.setIpScalarRange(event.target.value, mapper.getIpScalarRange()[1]);
  renderWindow.render();
}

function updateScalarMax(event) {
  mapper.setIpScalarRange(mapper.getIpScalarRange()[0], event.target.value);
  renderWindow.render();
}

reader.setUrl(url).then(() => {
  reader.loadData().then(() => {
    renderer.addVolume(actor);
    const interactor = renderWindow.getInteractor();
    interactor.setDesiredUpdateRate(15.0);
    renderer.resetCamera();
    renderer.getActiveCamera().elevation(-70);
    renderWindow.render();

    const el = document.querySelector('.blendMode');
    el.addEventListener('change', updateBlendMode);
    const scalarMinEl = document.querySelector('.scalarMin');
    scalarMinEl.addEventListener('input', updateScalarMin);
    const scalarMaxEl = document.querySelector('.scalarMax');
    scalarMaxEl.addEventListener('input', updateScalarMax);
  });
});

global.source = reader;
global.mapper = mapper;
global.actor = actor;
global.ofun = ofun;
global.renderer = renderer;
global.renderWindow = renderWindow;

return (
    <div style={{color:"white", overflow:"hidden",left:"1100px",
    zIndex: "6",
    position:"absolute"
  }}>
      <table>
<div >
<tr>
<td><p>&emsp; &emsp; &emsp; &emsp; Blend Mode</p></td>
  <td>
    <select class="blendMode">
      <option selected value="0">Composite</option>
      <option value="1">Maximum Intensity</option>
      <option value="2">Minimum Intensity</option>
      <option value="3">Average Intensity</option>
      <option value="4">Additive Intensity</option>
    </select>
  </td>
</tr>

<tr class="ipScalar" style={{display:"none"}}>
    
<td><p>&emsp; &emsp; &emsp; &emsp; IP Scalar Min</p></td>
  <td><input class="scalarMin" type="range" min="0" max="1" step="0.01"/></td>
</tr>
<tr class="ipScalar" style={{display:"none"}}>
<td><p>&emsp; &emsp; &emsp; &emsp; IP Scalar Max</p></td>
  <td><input class="scalarMax" type="range" min="0" max="1" step="0.01"/></td>
</tr>

</div>

</table>
  </div>
)
}
export default Blendmode