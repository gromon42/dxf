import logger from './util/logger'
import parseString from './parseString'
import denormalise from './denormalise'
import toSVG from './toSVG'
import toPolylines from './toPolylines'
import groupEntitiesByLayer from './groupEntitiesByLayer'

export default class Helper {
  constructor(dxf, options) {
    if (!(typeof dxf === 'string')) {
      throw Error('Helper constructor expects a DXF string')
    }
    this._contents = dxf
    this._options = options
    this._parsed = null
    this._denormalised = null
  }

  parse() {
    this._parsed = parseString(this._contents)
    logger.info('parsed:', this.parsed)
    return this._parsed
  }

  get parsed() {
    if (this._parsed === null) {
      this.parse()
    }
    return this._parsed
  }

  denormalise() {
    this._denormalised = denormalise(this.parsed)
    logger.info('denormalised:', this._denormalised)
    return this._denormalised
  }

  get denormalised() {
    if (!this._denormalised) {
      this.denormalise()
    }
    return this._denormalised
  }

  group() {
    this._groups = groupEntitiesByLayer(this.denormalised)
  }

  get groups() {
    if (!this._groups) {
      this.group()
    }
    return this._groups
  }

  toSVG() {
    return toSVG(this.parsed, this._options ? this._options.byBlock : false)
  }

  toPolylines() {
    return toPolylines(this.parsed)
  }
}
