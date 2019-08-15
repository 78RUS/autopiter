import React from 'react';
import './board.css';
import logo from './logo.svg'

export default class Board extends React.Component {
    render () {
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
                                <div className="TabBar-Tab-Active">Новая организация</div>
                                <div className="TabBar-Tab">Сохраненные организации (3)</div>
                            </nav>
                            <div className="Container-TabPane">
                                
                            </div>
                        </div>
                    </main>
                </div>
            </>
        )
    }
}