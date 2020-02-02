import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { buildModel, getJsonApi } from 'freejsonapi';
import { Loading3Dots, ResponsiveConfirm } from 'freeassofront';
import * as actions from './redux/actions';
import {
  DelOne as DelOneIcon,
  Download as DownloadIcon,
  View as ViewIcon,
  Upload as UploadIcon,
  Checked as CheckedIcon,
  Unchecked as UncheckedIcon,
} from '../icons';
import { downloadCauseMediaBlob } from './';
import { downloadBlob, ImageModal } from '../ui';

export class InlinePhotos extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      confirm: false,
      caum_id: 0,
      view: false,
      blob: false,
      item: null,
    };
    this.onCheck = this.onCheck.bind(this);
    this.onDropFiles = this.onDropFiles.bind(this);
    this.onConfirmClose = this.onConfirmClose.bind(this);
    this.onConfirmPhoto = this.onConfirmPhoto.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
    this.onDownload = this.onDownload.bind(this);
    this.onView = this.onView.bind(this);
    this.onCloseView = this.onCloseView.bind(this);
  }

  onCheck(item, caum_id) {
    item.default_blob.id = caum_id;
    let obj = getJsonApi(item, 'FreeAsso_Cause', item.id);
    this.props.actions
      .updateOne(item.id, obj)
      .then(result => {
        this.props.actions.propagateModel('FreeAsso_Cause', result);
      })
      .catch(errors => {
        console.log(errors);
      });
  }

  onDropFiles(item, acceptedFiles) {
    const promises = acceptedFiles.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onabort = () => {
          reject();
        };
        reader.onerror = error => {
          reject(error);
        };
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
          this.props.actions.uploadPhoto(0, item.id, binaryStr).then(result => resolve(true));
        };
        reader.readAsDataURL(file);
      });
    });
    const reload = Promise.all(promises);
    reload.then(result => {
      this.props.actions.loadPhotos(item.id, true);
    });
  }

  onConfirmClose() {
    this.setState({ confirm: false, caum_id: 0 });
  }

  onConfirmPhoto(id) {
    this.setState({ confirm: !this.state.confirm, caum_id: id });
  }

  onConfirm(item) {
    const caum_id = this.state.caum_id;
    this.setState({ confirm: false, caum_id: 0 });
    this.props.actions.delCauseMedia(caum_id).then(result => {
      this.props.actions.loadPhotos(item.id, true);
    });
  }

  onDownload(item) {
    downloadCauseMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const blob = result.data;
      downloadBlob(blob, type, item.sitm_title);
    });
  }

  onView(item) {
    downloadCauseMediaBlob(item.id, true).then(result => {
      const type = result.headers['content-type'] || 'application/octet-stream';
      const bytes = new Uint8Array(result.data); 
      const blob = new Blob([bytes], {type: type});
      const url = window.URL.createObjectURL(blob);
      this.setState({blob: url, view: true, item: item});
    });
  }

  onCloseView() {
    this.setState({blob: null, view: false, item: null});
  }

  render() {
    let photos = [];
    if (this.props.cause.photos.FreeAsso_CauseMedia) {
      photos = buildModel(this.props.cause.photos, 'FreeAsso_CauseMedia');
    }
    return (
      <div>
        <div className="cause-inline-photos">
          {this.props.cause.loadPhotosPending ? (
            <div className="text-center">
              <Loading3Dots className="text-light" />
            </div>
          ) : (
            <div className="row p-2 row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3">
              {photos.map(photo => {
                let img = '';
                try {
                  if (photo.caum_short_blob) {
                    img = `data:image/jpeg;base64,${photo.caum_short_blob}`;
                  }
                } catch (ex) {
                  console.log(ex);
                }
                return (
                  <div className="col" key={photo.id}>
                    <div className="card mt-2">
                      <div className="card-header">
                        <div className="row">
                          <div className="col-12">
                            <span className="">
                              <small>Principale</small>
                            </span>
                            &nbsp;
                            {photo.id === this.props.cause.photosItem.default_blob.id ? (
                              <CheckedIcon className="text-secondary" />
                            ) : (
                              <UncheckedIcon
                                className="text-secondary inline-action"
                                onClick={() => {
                                  this.onCheck(this.props.cause.photosItem, photo.id);
                                }}
                              />
                            )}
                          </div>
                          <div className="col-24 text-right">
                            <div className="btn-group btn-group-sm" role="group" aria-label="...">
                              <div className="btn-group" role="group" aria-label="First group">
                                <div className="ml-2">
                                  <ViewIcon 
                                    className="text-secondary inline-action" 
                                    onClick={() => this.onView(photo)}
                                  />
                                </div>
                                <div className="ml-2">
                                  <DownloadIcon
                                    className="text-secondary inline-action"
                                    onClick={() => this.onDownload(photo)}
                                  />
                                </div>
                                <div className="ml-2">
                                  <UploadIcon className="text-secondary inline-action" />
                                </div>
                                <div className="ml-2">
                                  <DelOneIcon
                                    onClick={() => this.onConfirmPhoto(photo.id)}
                                    className="text-secondary inline-action"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body text-center">
                        {img && <img src={img} className="rounded" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div className="col" key={'000'}>
                <div className="card mt-2">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-36">
                        <span className="">Ajouter une photo</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body text-center">
                    {this.props.cause.uploadPhotoPending ? (
                      <div className="text-center">
                        <Loading3Dots />
                      </div>
                    ) : (
                      <Dropzone
                        onDrop={acceptedFiles => {
                          this.onDropFiles(this.props.cause.photosItem, acceptedFiles);
                        }}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <UploadIcon className="text-secondary inline-action" size={4} />
                            </div>
                          </section>
                        )}
                      </Dropzone>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {this.state.view && (
          <ImageModal
            show={this.state.view}
            onClose={this.onCloseView}
            title={Image}
            image={this.state.blob}
          />
        )}
        <ResponsiveConfirm
          show={this.state.confirm}
          onClose={this.onConfirmClose}
          onConfirm={() => {
            this.onConfirm(this.props.cause.photosItem);
          }}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    cause: state.cause,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlinePhotos);