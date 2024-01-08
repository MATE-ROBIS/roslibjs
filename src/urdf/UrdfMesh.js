/**
 * @fileOverview
 * @author Benjamin Pitzer - ben.pitzer@gmail.com
 * @author Russell Toris - rctoris@wpi.edu
 */

import Vector3 from '../math/Vector3';
import * as UrdfTypes from './UrdfTypes';

/**
 * A Mesh element in a URDF.
 */
export default class UrdfMesh {
  /**
   * @param {Object} options
   * @param {Element} options.xml - The XML element to parse.
   */
  constructor(options) {
    this.scale = null;

    this.type = UrdfTypes.URDF_MESH;
    this.filename = options.xml.getAttribute('filename');

    // Check for a scale
    var scale = options.xml.getAttribute('scale');
    if (scale) {
      // Get the XYZ
      var xyz = scale.split(' ');
      this.scale = new Vector3({
        x: parseFloat(xyz[0]),
        y: parseFloat(xyz[1]),
        z: parseFloat(xyz[2])
      });
    }
  }
}
