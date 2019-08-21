import React from 'react';
import './board.css';
import logo from './logo.svg'
import Search from '../Search/Search'

export default class Board extends React.Component {
    state = {
        show: 'search',
        companies: []
    }

    

    render () {
        const { companies } = this.state;

        return (
            <>
                <div className="grid-container">
                    <header className="Board-Header">
                        <img className="Board-Header-Logo" src={logo} alt="Logo"/>
                    </header>
                    <main className="Board-Body">
                        <div className="Board-Body-Container">
                            <div className="Container-HeaderText">Мои организации</div>
                            <nav className="Container-TabBar">
                                <div className="TabBar-Tab Active">Новая организация</div>
                                <div className="TabBar-Tab">Сохраненные организации ({companies.length})</div>
                            </nav>
                            <div className="Container-TabPane">
                                <Search />
                            </div>
                        </div>
                    </main>
                </div>
            </>
        )
    }
}