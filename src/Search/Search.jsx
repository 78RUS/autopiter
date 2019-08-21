import React from 'react';
import axios from 'axios';
import { uniqueId } from 'lodash';
import './Search.css'

export default class Search extends React.Component {
    state = {
        value: '',
        companies: [],
        show: 'search',
        placeholder: "Введите название, ИНН или адрес организации",
    }

    handleChangeField = async ({ target }) => {
        const { value } = target;
        const apiURL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
        const config = {
            headers: {
                  "Authorization": "Token ee2e5d435d2d30856b0463247e53a1f48e1ca0c0",
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
            }
        };
        if (value === '') {
            this.setState({ value: '', companies: [] });
        } else {
            const res = await axios.post (apiURL, { "query": value }, config);
            const data = res.data.suggestions;
            const clearData = data.map((company) => {
                const name = company.value;
                const { inn, kpp, ogrn, management } = company.data
                const { city } = company.data.address.data;
                const { postal_code } = company.data.address.data;
                const address = `${postal_code}, ${company.data.address.value}`;
                return { id: uniqueId('company-'), inn, kpp, ogrn, name, city, management, address }
            } );
            this.setState({ value, companies: clearData, show: 'search' });
        }   
    }

    handleSubmitForm = e => e.preventDefault();

    renderSearchHints = (companies) => {
        if (companies.length > 0) {
            return (
                <div className="Search-Hints">
                    {companies.map((company) => {
                        return (
                            <div className="Search-Hints-Company-Card" key={company.id} id={company.id} onClick={this.handleCompanyDetails}>
                                <div className="Search-Hints-Company-Name">{company.name}</div>
                                <div className="Search-Hints-Company-Info">
                                    <div className="Search-Hints-Company-Inn">{company.inn}</div>
                                    <div className="Searsh-Hints-Company-City">{company.city}</div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )
        } else {
            return null;
        }
    }

    renderCompanyDetails = (company) => {

    }

    handleCompanyDetails = ({currentTarget}) => {
        const { id } = currentTarget
        console.log(id)
        const { companies } = this.state;
        console.log(companies)
        const companyToShow = companies.filter(company => company.id === id).reduce(company => company)
        console.log(companyToShow)
        this.setState({ show: 'details', placeholder: companyToShow.name, value: ''})
        return companyToShow;
    }
    

    render () {
        const { companies, value, show, placeholder} = this.state;
        return (
            <div className="Search-Pane">
                <form className="Search-Form" onSubmit={this.handleSubmitForm}>
                    <div className="Search-Form-Group">
                        <label className="Search-Form-Label">Организация или ИП</label>
                        <input
                            type="text"
                            className="Search-Form-Control"
                            placeholder={placeholder}
                            onChange={this.handleChangeField}
                            value={value}
                        />
                    </div>
                </form>
                {show === 'search' ? this.renderSearchHints(companies): null}
                {/* {companies.length > 0 ? this.renderSearchHints(companies) : null} */}
            </div>
        )
    }
    
}
