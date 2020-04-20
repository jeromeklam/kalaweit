import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { ResponsiveModal } from 'freeassofront';
import { CenteredLoading3Dots } from '../ui';

export default class SearchModal extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    onClear: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired,
    list: PropTypes.array.isRequired,
    pickerDisplay: PropTypes.string.isRequired,
    filters: PropTypes.array,
  };
  static defaultProps = {
    filters: [],
  };

  constructor(props) {
    super(props);
    let filters = this.props.filters;
    filters.forEach(item => {
      item.value = '';
    });
    this.state = {
      fields: filters,
      condition: 'or',
    };
    this.onChange = this.onChange.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  onChange(event) {
    let filters = this.state.fields;
    filters.forEach(item => {
      if (item.name === event.target.name) {
        item.value = event.target.value;
      }
    });
    this.setState({ fields: filters });
  }

  onClear(event) {
    let filters = this.state.fields;
    filters.forEach(item => {
      item.value = '';
    });
    this.setState({ fields: filters });
    this.props.onClear();
  }

  onSearch(event) {
    let params = false;
    let sort = '';
    this.state.fields.forEach(item => {
      if (item.value !== '') {
        if (params === false) {
          params = { filter: { [this.state.condition]: {} }};
        }
        params.filter[this.state.condition][item.name] = item.value;
      }
      if (sort === '') {
        sort = item.name;
      } else {
        sort = sort + ',' + item.name;
      }
    });
    params = params || {};
    params.sort = sort;
    const filters = params;
    this.props.onSearch(filters);
  }

  render() {
    const buttons = [
      {name: "Filtrer", function: this.onSearch, theme: "primary", icon: "filter" },
      {name: "Effacer", function: this.onClear, theme: "warning" , icon: "delete"},
      {name: "Annuler", function: this.props.onClose, theme: "secondary", icon: "close"},
    ];
    return (
      <ResponsiveModal
        size="lg"
        title={this.props.title}
        show={this.props.show}
        onClose={this.props.onClose}
        buttons={buttons}
      >
        <div className="search-modal">
          <div className="search-filters">
            <span>Critères de recherche :</span>
            <div className="row">
              {this.state.fields &&
                this.state.fields.map(item => {
                  return (
                    <div className={classnames('col-sm-' + (item.size || '36'))}>
                      <input
                        key={item.name}
                        className="form-control mb-1"
                        value={item.value}
                        name={item.name}
                        placeholder={item.label}
                        type="text"
                        onChange={this.onChange}
                      />
                    </div>
                  );
                })
              }
            </div>
            <hr />
          </div>
          <div className="search-results">
            {this.props.loading ? (
              <CenteredLoading3Dots />
            ) : (
              <div>
                <span>Résultats de recherche :</span>
                <ul className="list-group">
                  {this.props.list &&
                    this.props.list.map(item => {
                      return (
                        <li
                          key={item.id}
                          className="list-group-item list-group-item-action"
                          onClick={() => {
                            this.props.onSelect(item);
                          }}
                        >
                          {(typeof this.props.pickerDisplay === 'function') ? (
                            this.props.pickerDisplay(item)
                          ) : (
                            this.props.pickerDisplay.split(',').map(elem => {
                              if (item[elem]) {
                                return <span>{item[elem]}</span>
                              }
                              return elem;
                            })
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </ResponsiveModal>
    );
  }
}
