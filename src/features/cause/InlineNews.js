import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Flag from 'react-world-flags';
import { buildModel, getJsonApi } from 'freejsonapi';
import { HoverObserver } from 'freeassofront';
import { CenteredLoading3Dots } from '../ui';
import * as actions from './redux/actions';
import { GetOne as GetOneIcon, DelOne as DelOneIcon, AddOne as AddOneIcon } from '../icons';
import { ModifyOrCreateMedia } from './';

export class InlineNews extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      lang_id: '368',
      caum_id: null,
      confirm: null,
      hover: false,
    };
    this.onConfirmMedia = this.onConfirmMedia.bind(this);
    this.onAddMedia = this.onAddMedia.bind(this);
    this.onUpdateMedia = this.onUpdateMedia.bind(this);
    this.onCloseMedia = this.onCloseMedia.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
  }

  onConfirmMedia(p_id) {
    this.setState({ confirm: p_id });
  }

  onUpdateMedia(p_id) {
    this.setState({ caum_id: p_id });
  }

  onAddMedia(p_id) {
    this.setState({ caum_id: p_id });
  }

  onCloseMedia() {
    this.setState({ caum_id: null, confirm: null });
  }

  onMouseLeave() {
    this.setState({ hover: 0 });
  }

  onMouseEnter(id) {
    this.setState({ hover: id });
  }

  render() {
    let news = [];
    let counter = 0;
    if (this.props.cause.news.FreeAsso_CauseMedia) {
      news = buildModel(this.props.cause.news, 'FreeAsso_CauseMedia');
    }
    return (
      <div>
        <div className="cause-inline-news">
          {this.props.cause.loadNewsPending || !this.props.lang.flags ? (
            <CenteredLoading3Dots />
          ) : (
            <div className="inline-list">
              <div className="row row-title row-line">
                <div className="col-30 col-last text-right">
                  <span>Langue courante : </span>
                  {this.props.lang.flags.map(oneLang => {
                    if (oneLang.id === this.state.lang_id) {
                      return <Flag className="ml-2" code={oneLang.lang_flag} height={24} />;
                    }
                    return '';
                  })}
                  <span className="ml-5">Autres langues : </span>
                  {this.props.lang.flags.map(oneLang => {
                    if (
                      oneLang.id !== this.state.lang_id &&
                      oneLang.lang_flag !== null &&
                      oneLang.lang_flag !== ''
                    ) {
                      return (
                        <Flag
                          key={oneLang.lang_id}
                          className="ml-2"
                          code={oneLang.lang_flag}
                          height={24}
                        />
                      );
                    }
                    return '';
                  })}
                </div>
                <div className="col-6 text-right">
                  <div className="btn-group col-toolbar">
                    <button
                      className="btn btn-inline btn-primary text-light"
                      onClick={() => {
                        this.onAddMedia(0);
                      }}
                    >
                      <AddOneIcon color="light" />
                    </button>
                  </div>
                </div>
              </div>
              {news &&
                news.map(item => {
                  if (item.caum_type !== 'HTML') {
                    return null;
                  }
                  counter++;
                  return (
                    <HoverObserver
                      onMouseEnter={() => {
                        this.onMouseEnter(item.id);
                      }}
                      onMouseLeave={this.onMouseLeave}
                    >
                      <div
                        className={classnames(
                          'row row-line',
                          counter % 2 !== 1 ? 'row-odd' : 'row-even',
                        )}
                        key={item.caum_id}
                      >
                        <div className="col-36">
                          {item.versions &&
                            item.versions.map(version => {
                              if (version.lang.id === this.state.lang_id) {
                                return (
                                  <div className="site-text-sample pt-2">
                                    <div className="mb-2">
                                      <span className="site-text-title">
                                        {version.caml_subject}
                                      </span>
                                      <div
                                        className={classnames(
                                          'btn-group ml-5 text-light float-right',
                                          this.state.hover !== item.id && 'd-none',
                                        )}
                                      >
                                        <button
                                          className="btn btn-inline btn-secondary text-light"
                                          onClick={() => {
                                            this.onUpdateMedia(item.id);
                                          }}
                                        >
                                          <GetOneIcon color="light" />
                                        </button>
                                        <button
                                          className="btn btn-inline btn-warning text-light"
                                          onClick={() => {
                                            this.onConfirmMedia(item.id);
                                          }}
                                        >
                                          <DelOneIcon color="light" />
                                        </button>
                                      </div>
                                    </div>
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: version.caml_text,
                                      }}
                                    ></div>
                                  </div>
                                );
                              }
                            })}
                        </div>
                      </div>
                    </HoverObserver>
                  );
                })}
            </div>
          )}
        </div>
        {this.state.caum_id !== null && (
          <ModifyOrCreateMedia
            caumId={this.state.caum_id}
            loader={false}
            modal={true}
            onClose={this.onCloseMedia}
          />
        )}
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    cause: state.cause,
    lang: state.lang,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InlineNews);
