const Navbar = () => {
     return (
        <table>
            <tbody>
                <tr>
                    <td>pickable</td>
                    <td> <input className="flag" data-name="pickable" type="checkbox" defaultChecked="checked"/> </td>
                </tr>
                <tr>
                    <td>visibility</td>
                    <td> <input className="flag" data-name="visibility" type="checkbox" defaultChecked="checked"/> </td>
                </tr>
                <tr>
                    <td>contextVisibility</td>
                    <td> <input className="flag" data-name="contextVisibility" type="checkbox" defaultChecked="checked" /> </td>
                </tr>
                <tr>
                    <td>handleVisibility</td>
                    <td> <input className="flag" data-name="handleVisibility" type="checkbox" defaultChecked="checked" /> </td>
                </tr>
                <tr>
                    <td>faceHandlesEnabled</td>
                    <td> <input className="flag" data-name="faceHandlesEnabled" type="checkbox" defaultChecked="checked" /> </td>
                </tr>
                <tr>
                    <td>edgeHandlesEnabled</td>
                    <td> <input className="flag" data-name="edgeHandlesEnabled" type="checkbox" defaultChecked="checked" /> </td>
                </tr>
                <tr>
                    <td>cornerHandlesEnabled</td>
                    <td> <input className="flag" data-name="cornerHandlesEnabled" type="checkbox" defaultChecked="checked" /> </td>
                </tr>
            </tbody>
        </table>
    );
}
 
export default Navbar;