import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputPicker as DefaultInputPicker } from 'freeassofront';
import { Search } from './';
import axios from 'axios';
import { More, DelOne } from '../icons';

export default class InputPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    item: PropTypes.object,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    let value = '';
    let display = '';
    if (this.props.item) {
      value = this.props.item.id;
      display = this.props.item.site_name || '';
    }
    this.state = {
      search: false,
      item: this.props.item || null,
      list: [],
      value: value,
      display: display,
      autocomplete: false,
      source: false,
    };
    this.onMore = this.onMore.bind(this);
    this.onClear = this.onClear.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onCloseMore = this.onCloseMore.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.item !== state.item) {
      let value = null;
      let display = '';
      if (props.item) {
        value = props.item.id;
        display = props.item.site_name;
      }
      return { item: props.item, value: value, display: display };
    }
    return null;
  }

  onChange(event) {
    if (this.state.source) {
      this.state.source.cancel();
    }
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      cancelToken: source.token,
    };
    const search = '' + event.target.value;
    this.setState({ display: search, loading: true, cancel: source });
    if (search.length >= 2) {
      axios
        .get(process.env.REACT_APP_BO_URL + '/v1/asso/site/autocomplete/' + event.target.value, {
          headers: headers,
        })
        .then(result => {
          this.setState({ list: result.data, loading: false });
        })
        .catch(err => {
          this.setState({ list: [], loading: false });
        });
    }
  }

  onMore() {
    this.setState({ search: true, autocomplete: false });
  }

  onClear() {
    this.setState({ autocomplete: false });
    this.props.onChange({
      target: { name: this.props.name, value: null, type: 'FreeAsso_Site' },
    });
  }

  onSelect(item) {
    this.setState({ search: false, autocomplete: false, list: [] });
    this.props.onChange({
      target: { name: this.props.name, value: item.id, type: 'FreeAsso_Site' },
    });
  }

  onCloseMore() {
    this.setState({ search: false });
  }

  render() {
    return (
      <div className="site-input-picker">
        <DefaultInputPicker
          name={this.props.name}
          label={this.props.label}
          value={this.state.value}
          labelTop={this.props.labelTop || false}
          list={this.state.list}
          display={this.state.display}
          onChange={this.onChange}
          onClear={this.onClear}
          onMore={this.onMore}
          onSelect={this.onSelect}
          pickerId="site_id"
          pickerDisplay="site_name"
          clearIcon={<DelOne className="text-warning" />}
          moreIcon={<More className="text-secondary" />}
        />
        <Search
          title={this.props.label}
          show={this.state.search}
          onClose={this.onCloseMore}
          onSelect={this.onSelect}
        />
      </div>
    );
  }
}
