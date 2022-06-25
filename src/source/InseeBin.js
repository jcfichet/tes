/*	Copyright (c) 2019 Jean-Marc VIGLINO,
  released under the CeCILL-B license (French BSD license)
  (http://www.cecill.info/licences/Licence_CeCILL-B_V1-en.txt).
*/
import ol_source_BinBase from './BinBase'
import ol_InseeGrid from '../render/InseeGrid';
import {ol_ext_inherits} from '../util/ext'

/** A source for INSEE grid
 * @constructor
 * @extends {ol.source.Vector}
 * @param {Object} options ol_source_VectorOptions + grid option
 *  @param {ol.source.Vector} options.source Source
 *  @param {number} [options.size] size of the grid in meter, default 200m
 *  @param {function} [options.geometryFunction] Function that takes an ol.Feature as argument and returns an ol.geom.Point as feature's center.
 *  @param {function} [options.flatAttributes] Function takes a bin and the features it contains and aggragate the features in the bin attributes when saving
 */
class ol_source_InseeBin {
  constructor(options) {
    options = options || {};

    this._grid = new ol_InseeGrid({ size: options.size });

    ol_source_BinBase.call(this, options);
  }
  /** Set grid size
   * @param {number} size
   */
  setSize(size) {
    if (this.getSize() !== size) {
      this._grid.set('size', size);
      this.reset();
    }
  }
  /** Get grid size
   * @return {number} size
   */
  getSize() {
    return this._grid.get('size');
  }
  /** Get the grid geometry at the coord
   * @param {ol.Coordinate} coord
   * @returns {ol.geom.Polygon}
   * @api
   */
  getGridGeomAt(coord) {
    return this._grid.getGridAtCoordinate(coord, this.getProjection());
  }
  /** Get grid extent
   * @param {ol.ProjectionLike} proj
   * @return {ol.Extent}
   */
  getGridExtent(proj) {
    return this._grid.getExtent(proj);
  }
}
ol_ext_inherits(ol_source_InseeBin, ol_source_BinBase);





export default ol_source_InseeBin
