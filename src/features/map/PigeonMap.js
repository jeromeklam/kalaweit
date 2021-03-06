import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';
import { normalizedObjectModeler, getJsonApi, propagateModel } from 'freejsonapi';
import { loadMore as loadMoreSite, updateOne as updateOneSite } from '../site/redux/actions';
import Draggable from 'pigeon-draggable';
import Icon from '@mdi/react';
import { Mobile, Default } from 'freeassofront';
import { mdiMagnifyMinus, mdiMagnifyPlus } from '@mdi/js';
import mapselect from '../../images/mapselect.png';
import { ListGroup } from '../site';

const providers = {
  osm: (x, y, z) => {
    const s = String.fromCharCode(97 + ((x + y + z) % 3));
    return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
  },
  wikimedia: (x, y, z, dpr) => {
    return `https://maps.wikimedia.org/osm-intl/${z}/${x}/${y}${dpr >= 2 ? '@2x' : ''}.png`;
  },
  stamen: (x, y, z, dpr) => {
    return `https://stamen-tiles.a.ssl.fastly.net/terrain/${z}/${x}/${y}${
      dpr >= 2 ? '@2x' : ''
    }.jpg`;
  },
};

const lng2tile = (lon, zoom) => ((lon + 180) / 360) * Math.pow(2, zoom);

const lat2tile = (lat, zoom) =>
  ((1 - Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) / Math.PI) /
    2) *
  Math.pow(2, zoom);

export class PigeonMap extends Component {
  static propTypes = {
    map: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    let center = [49.096306, 6.160053];
    if (this.props.common.geoOn) {
      if (this.props.common.geoCoord) {
        center = [this.props.common.geoCoord.lat, this.props.common.geoCoord.lon];
      }
    }
    console.log(this.props.common);
    this.state = {
      geoCoord: this.props.common.geoCoord,
      center: center,
      zoom: 12,
      provider: 'osm',
      metaWheelZoom: false,
      twoFingerDrag: false,
      animate: true,
      animating: false,
      zoomSnap: true,
      mouseEvents: true,
      touchEvents: true,
      minZoom: 1,
      maxZoom: 18,
      dragging: false,
      selected: 0,
      moved: false,
      scrollHover: 0,
    };
    this.zoomIn = this.zoomIn.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onSiteClick = this.onSiteClick.bind(this);
    this.onSiteMove = this.onSiteMove.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadMoreSite();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.common.geoCoord !== state.geoCoord) {
      let center = [49.096306, 6.160053];
      if (props.common.geoOn) {
        if (props.common.geoCoord) {
          center = [props.common.geoCoord.lat, props.common.geoCoord.lon];
          return {
            geoCoord: props.common.geoCoord,
            center: center,
          };
        }
      }
    }
    return null;
  }

  zoomIn(event) {
    this.setState({
      zoom: Math.min(this.state.zoom + 1, this.state.maxZoom),
    });
  }

  zoomOut(event) {
    this.setState({
      zoom: Math.max(this.state.zoom - 1, this.state.minZoom),
    });
  }

  onDragStart() {
    this.setState({
      dragging: true,
    });
  }

  onDragEnd(anchor, item) {
    item.site_coord = JSON.stringify({
      lat: anchor[0],
      lon: anchor[1],
    });
    this.setState({
      dragging: false,
      moved: 0,
    });
    let obj = getJsonApi(item, 'FreeAsso_Site', item.id);
    this.props.actions
      .updateOneSite(obj)
      .then(result => {
        // @Todo propagate result to store
        // propagateModel est ajouté aux actions en bas de document
        this.props.actions.propagateModel('FreeAsso_Site', result);
      })
      .catch(errors => {
        // @todo display errors to fields
        console.log(errors);
      });
  }

  onClick({ event, latLng, pixel }) {
    console.log('Map clicked!', latLng, pixel);
  }

  onMarkerClick({ event, anchor, payload }) {
    this.setState({ selected: payload, center: anchor, moved: false });
  }

  onSiteClick(id, anchorCoord) {
    let coord = this.state.center || [49.096306, 6.160053];
    const json = JSON.parse(anchorCoord);
    if (json) {
      coord = [json.lat, json.lon];
    }
    this.setState({ selected: id, center: coord, moved: false });
  }

  onSiteMove(id, item) {
    let coord = this.state.center || [49.096306, 6.160053];
    const json = JSON.parse(item.site_coord);
    if (json) {
      coord = [json.lat, json.lon];
    }
    this.setState({ selected: id, center: coord, moved: item });
  }

  render() {
    let items = false;
    if (this.props.site.items.FreeAsso_Site) {
      items = normalizedObjectModeler(this.props.site.items, 'FreeAsso_Site');
    }
    return (
      <div className="map-pigeon-map">
        <Default>
          <div className={classnames('map-content')}>
            <Map
              provider={providers[this.state.provider]}
              center={this.state.center}
              zoom={this.state.zoom}
              animate={this.state.animate}
              onClick={this.onClick}
            >
              {items &&
                items.map(item => {
                  const json = JSON.parse(item.site_coord);
                  if (json) {
                    const coord = [json.lat, json.lon];
                    return (
                      <Marker
                        key={item.id}
                        anchor={coord}
                        payload={item.id}
                        onClick={this.onMarkerClick}
                        hover={this.state.selected === item.id}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              {this.state.moved && this.state.moved.id === this.state.selected && (
                <Draggable
                  anchor={this.state.center}
                  offset={[14, 30]}
                  onDragStart={this.onDragStart}
                  onDragEnd={anchor => {
                    this.onDragEnd(anchor, this.state.moved);
                  }}
                >
                  <img className="map-selector" src={mapselect} alt="selector" />
                </Draggable>
              )}
            </Map>
          </div>
          <div className="map-list-header">
            <button className="btn btn-primary btn-sm" onClick={this.zoomIn}>
              <Icon path={mdiMagnifyPlus} size={1} color="white" />
            </button>
            <button className="btn btn-primary btn-sm" onClick={this.zoomOut}>
              <Icon path={mdiMagnifyMinus} size={1} color="white" />
            </button>
            <br />
            <p>
              Position : {Math.round(this.state.center[0] * 10000) / 10000},{' '}
              {Math.round(this.state.center[1] * 10000) / 10000} /{' '}
              {Math.round(this.state.zoom * 100) / 100}
            </p>
          </div>
          <div className="map-list-scroll">
            <ListGroup
              selected={this.state.selected}
              onSiteClick={this.onSiteClick}
              onSiteGallery={this.onSiteGallery}
              onSiteMove={this.onSiteMove}
            />
          </div>
        </Default>
        <Mobile>
          <div className={classnames('map-content-mobile')}>
            <Map
              provider={providers[this.state.provider]}
              center={this.state.center}
              zoom={this.state.zoom}
              animate={this.state.animate}
              onClick={this.onClick}
            >
              {items &&
                items.map(item => {
                  const json = JSON.parse(item.site_coord);
                  if (json) {
                    const coord = [json.lat, json.lon];
                    return (
                      <Marker
                        key={item.id}
                        anchor={coord}
                        payload={item.id}
                        onClick={this.onMarkerClick}
                        hover={this.state.selected === item.id}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              {this.state.moved && this.state.moved.id === this.state.selected && (
                <Draggable
                  anchor={this.state.center}
                  offset={[14, 30]}
                  onDragStart={this.onDragStart}
                  onDragEnd={anchor => {
                    this.onDragEnd(anchor, this.state.moved);
                  }}
                >
                  <img className="map-selector" src={mapselect} alt="selector"/>
                </Draggable>
              )}
            </Map>
          </div>
          <div className="map-list-header-mobile">
            <button className="btn btn-primary btn-sm" onClick={this.zoomIn}>
              <Icon path={mdiMagnifyPlus} size={1} color="white" />
            </button>
            <button className="btn btn-primary btn-sm" onClick={this.zoomOut}>
              <Icon path={mdiMagnifyMinus} size={1} color="white" />
            </button>
            <br />
            <span title={lat2tile(this.state.center[0], this.state.zoom)}>
              Lat: {Math.round(this.state.center[0] * 10000) / 10000}
            </span>
            <br />
            <span title={lng2tile(this.state.center[1], this.state.zoom)}>
              Lon: {Math.round(this.state.center[1] * 10000) / 10000}
            </span>
            <br />
            <span>Zoom: {Math.round(this.state.zoom * 100) / 100}</span>
            <br />
            <hr />
          </div>
          <div className="map-list-scroll-mobile">
            <ListGroup
              selected={this.state.selected}
              onSiteClick={this.onSiteClick}
              onSiteGallery={this.onSiteGallery}
              onSiteMove={this.onSiteMove}
            />
          </div>
        </Mobile>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    common: state.common,
    map: state.map,
    site: state.site,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { ...actions, loadMoreSite, updateOneSite, propagateModel },
      dispatch,
    ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PigeonMap);
