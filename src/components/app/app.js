import React, { Component } from 'react';
import { Spin, Alert, Pagination } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import List from '../list';

import SearchPanel from '../searchPanel';
import 'antd/dist/antd.css';
import './app.scss';

import SearchMovies from '../service/SearchMovies';

export default class App extends Component {
  state = {
    dataBase: [],
    loading: true,
    error: false,
    request: 'hello',
    page: 1,
	total:685,
	  
  };

  search = new SearchMovies();

  componentDidMount() {
    this.Fun();
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, request } = this.state;
 
    if (page !== prevState.page) {
      this.Fun();
    }     
	  else if (request !== prevState.request) {
      this.Fun();
    }
  }

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  onLoaded = (dataBase) => {
    this.setState({ dataBase, total:dataBase.total_results, loading: false  });
  };

  Fun = () => {
    const { request, page } = this.state;
    this.search
      .getSearch(request, page)
      .then((dataBase) =>dataBase)
	  .then(this.onLoaded)
      .catch(this.onError);
  };

  onChange = (p) => {
    this.setState({ page: p });
  };

  onSearch = (request) => {
	  
	    this.setState({ request,
					  loading:true,
					  });
  };

  render() {
    const { dataBase, loading, error, total } = this.state;
	const pagination = !loading ? <Pagination
            defaultCurrent={1}
            total={total}
            onChange={this.onChange}
            defaultPageSize={20}
            showSizeChanger={false}
            className="pagination" /> : null
    const hasDate = !(loading || error);
   	const notPage = !total ? <Alert message="Ни чего не найдено" type="error"/> : null;
	const errorMessage = error ? <Alert message="Ошибка запроса!" type="error" /> : null;
    const load = loading ? (
      <div className="center">
        <Spin size="large" tip="Loading..." />
     </div>
    ) : null;
    const content = hasDate ? <List data={dataBase} /> : null;
    return (
      <div className ='head'>
        <Online >
          <SearchPanel onSearch={this.onSearch} />
		  
          {errorMessage} 
          {load}
		{notPage}
          {content}
		{pagination}
        </Online>
        <Offline>
          <Alert message="Отсутствует подключение к интернету" type="warning" />
        </Offline>
      </div>
    );
  }
}
