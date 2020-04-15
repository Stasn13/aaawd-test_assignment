import React from 'react';
import {Button, Layout} from "antd";
import "./BalanceHeader.scss"

const BalanceHeader = props => {
    let randomAmount = (Math.random()*(1500 - 20 + 1) + 20).toFixed(2);
    let splittedAmount = randomAmount.split('.');

    return (
        <div id="BalanceHeader">
            <div className="header-title">
                My Balance
            </div>
            <div className="header-amount">
                <span className="sign">$</span>
                <span className="amount">{splittedAmount[0]}</span>
                <span className="amount-after">{(splittedAmount[1] && ","+splittedAmount[1])}</span>

            </div>
            <div className="header-deposit">
                <Button className="deposit-btn" href="#" type="primary" >Make up deposit</Button>
            </div>
        </div>
    );
};

export default BalanceHeader;