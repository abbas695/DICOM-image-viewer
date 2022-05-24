import '@kitware/vtk.js/favicon';
import '@kitware/vtk.js/Rendering/Profiles/Geometry';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HtmlDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/HttpDataAccessHelper';
import '@kitware/vtk.js/IO/Core/DataAccessHelper/JSZipDataAccessHelper';
import vtkActor from '@kitware/vtk.js/Rendering/Core/Actor';
import vtkFullScreenRenderWindow from '@kitware/vtk.js/Rendering/Misc/FullScreenRenderWindow';
import vtkHttpDataSetReader from '@kitware/vtk.js/IO/Core/HttpDataSetReader';
import vtkImageMarchingCubes from '@kitware/vtk.js/Filters/General/ImageMarchingCubes';
import vtkMapper from '@kitware/vtk.js/Rendering/Core/Mapper';

    const Isovalue=({url})=>{
    const fullScreenRenderWindow = vtkFullScreenRenderWindow.newInstance({
        background: [0, 0, 0],
      });

      const renderWindow = fullScreenRenderWindow.getRenderWindow();
      const renderer = fullScreenRenderWindow.getRenderer();

      const actor = vtkActor.newInstance();
      const mapper = vtkMapper.newInstance();
      const marchingCube = vtkImageMarchingCubes.newInstance({
        contourValue: 0.0,
        computeNormals: true,
        mergePoints: true,
      });
      actor.setMapper(mapper);
      mapper.setInputConnection(marchingCube.getOutputPort());
      
      function updateIsoValue(e) {
        const isoValue = Number(e.target.value);
        marchingCube.setContourValue(isoValue);
        renderWindow.render();
      }
      const reader = vtkHttpDataSetReader.newInstance({ fetchGzip: true });
      marchingCube.setInputConnection(reader.getOutputPort());
      reader
        .setUrl(url, { loadData: true })
        .then(() => {
          const data = reader.getOutputData();
          const dataRange = data.getPointData().getScalars().getRange();
          const firstIsoValue = (dataRange[0] + dataRange[1]) / 3;
      
          const el = document.querySelector('.isoValue');
          el.setAttribute('min', dataRange[0]);
          el.setAttribute('max', dataRange[1]);
          el.setAttribute('value', firstIsoValue);
          el.addEventListener('input', updateIsoValue);
      
          marchingCube.setContourValue(firstIsoValue);
          renderer.addActor(actor);
          renderer.getActiveCamera().set({ position: [1, 1, 0], viewUp: [0, 0, -1] });
          renderer.resetCamera();
          renderWindow.render();
        });

      global.fullScreen = fullScreenRenderWindow;
      global.actor = actor;
      global.mapper = mapper;
      global.marchingCube = marchingCube;

    return (
      <div style={{color:"white", overflow:"hidden",left:"1000px",
        zIndex: "6",
        position:"absolute"
      }}>
<table>
<div >
    <tr>
        
       <p> &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;  Iso  value </p>

      <td style={{fontSize:"17px"}}>
        <input class='isoValue' type="range" min="0.0" max="1.0" step="0.05" />
      </td>
    </tr>
</div>

    </table>
      </div>
  )
}
  export default Isovalue
  