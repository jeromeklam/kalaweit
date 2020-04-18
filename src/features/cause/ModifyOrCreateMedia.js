import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Flag from 'react-world-flags';
import { getJsonApi } from 'freejsonapi';
import { InputHidden, InputText } from 'freeassofront';
import { ResponsiveModalOrForm, CenteredLoading3Dots, InputTextarea } from '../ui';
import * as actions from './redux/actions';

const getNewCauseMediaLang = (id, subject, text, lang) => {
  return {
    id: id,
    type: 'FreeAsso_CauseMediaLang',
    caml_subject: subject,
    caml_text: text,
    lang: {
      id: lang,
      type: 'FreeFW_Lang'
    }
  }
}

export class ModifyOrCreateMedia extends Component {
  static propTypes = {
    cause: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    loader: PropTypes.bool,
  };
  static defaultProps = {
    loader: true,
  };

  constructor(props) {
    super(props);
    let lang = '368';
    let version = getNewCauseMediaLang(0, '', '', lang);
    if (props.item && props.item.versions) {
      props.item.versions.forEach(vers => {
        if (vers.lang.id === lang) {
          version = vers;
        }
      });
    }
    this.state = {
      item: null,
      caumId: props.caumId || null,
      currentTab: lang,
      version: version,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleNavTab = this.handleNavTab.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.actions.loadOneMedia(this.state.caumId).then(result => {
      const item = this.props.cause.loadOneMediaItem;
      let version = getNewCauseMediaLang(0, '', '', this.state.currentTab);
      if (item && item.versions) {
        item.versions.forEach(vers => {
          if (vers.lang.id === this.state.currentTab) {
            version = vers;
          }
        });
      }
      this.setState({ item: item, version: version });
    });
  }

  handleSubmit(ev) {
    if (ev) {
      ev.preventDefault();
    }
    let obj = getJsonApi(this.state.item, 'FreeAsso_CauseMedia', this.state.caumId);
    if (this.state.caumId > 0) {
      // Update
    } else {
      // Create
    }
  }

  handleCancel(ev) {
    if (ev) {
      ev.preventDefault();
    }
    this.props.onClose();
  }

  handleNavTab(id) {
    const { item, currentTab } = this.state;
    let version = getNewCauseMediaLang(0, '', '', currentTab);
    if (item && item.versions) {
      item.versions.forEach(vers => {
        if (vers.lang.id === id) {
          version = vers;
        }
      });
    }
    this.setState({ currentTab: id, version: version });
  }

  handleChange(ev) {
    const { currentTab } = this.state;
    let item = this.state.item;
    let version = getNewCauseMediaLang(0, '', '', currentTab);
    let idxVers = -1;
    if (item && item.versions) {
      idxVers = item.versions.findIndex(elem => elem.lang.id === currentTab);
    } else {
      item.versions = [];
    }
    if (idxVers >= 0) {
      version = item.versions[idxVers]; 
    }
    version[ev.target.name] = ev.target.value;
    if (idxVers >= 0) {
      item.versions[idxVers] = version;
    } else {
      item.versions.push(version);
    }
    this.setState({ item: item, version: version });
  }

  render() {
    let tabs = [];
    if (this.props.lang) {
      this.props.lang.flags.forEach(oneLang => {
        if (oneLang.lang_flag !== null && oneLang.lang_flag !== '') {
          tabs.push({
            key: oneLang.id,
            name: oneLang.lang_code,
            label: <Flag code={oneLang.lang_flag} height={24} />,
          });
        }
      });
    }
    const { item, version, currentTab } = this.state;
    return (
      <div className="cause-modify-or-create-media">
        {item !== null ? (
          <ResponsiveModalOrForm
            title="Journal"
            className="m-5"
            tab={currentTab}
            tabs={tabs}
            size="xl"
            onSubmit={this.handleSubmit}
            onCancel={this.handleCancel}
            onNavTab={this.handleNavTab}
            onClose={this.props.onClose}
            modal={true}
          >
            <InputHidden name="id" id="id" value={item.id} />
            <div classname="row">
              <div classname="col-36">
                <InputText
                  name="caum_title"
                  label="Titre général"
                  value={item.caum_title}
                  onChange={this.handleChange}
                />
              </div>
              <hr />
              {this.props.lang.flags.map(oneLang => {
                if (oneLang.id === currentTab) {
                  return (
                    <div>
                      <div className="row">
                        <div className="col-36">
                          <InputText
                            Text
                            name="caml_subject"
                            label="Sujet"
                            value={version.caml_subject}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-36">
                          <InputTextarea
                            Text
                            name="caml_text"
                            label="Texte"
                            value={version.caml_text}
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </ResponsiveModalOrForm>
        ) : (
          <div>{this.props.loader && <CenteredLoading3Dots />}</div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    cause: state.cause,
    lang: state.lang,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ModifyOrCreateMedia);
