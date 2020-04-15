import React from 'react';
import {Table} from 'antd';
import './Balance.scss';
import BalanceHeader from "./Balance-header";

const columns = [
    {
        title: '#',
        dataIndex: 'id',
        key: 'id',
        ellipsis: true,
        width: 75,
        align: 'center'
    },
    {
        title: 'Date & Time',
        dataIndex: 'date',
        key: 'date',
        ellipsis: true,
        width: 179,
        className: "table-date"
    },
    {
        title: 'Info',
        dataIndex: 'info',
        key: 'info',
        ellipsis: true,
        width: 661,
        className: "table-info",
        render: info =>(info.length === 1 ? <span>{info[0]}</span>
                : <span>{info[0]}
                    <span className="link">{getRandElem(gamesArr)}</span>
                    {info[1]}
                    <span className="link">{getRandElem(itemsArr)}</span>
                  </span>
        )
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        ellipsis: true,
        width: 90,
        /*align: 'center',*/
        className: "table-type"
    },
    {
        title: 'Cash',
        dataIndex: 'cash',
        key: 'cash',
        ellipsis: true,
        width: 169,
        align: 'right'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        ellipsis: true,
        width: 70,
        align: 'center',
        className: "table-status",
        render: status =>(<span className={status.toLowerCase()}>{status}</span>)
    }
];
const gamesArr = [
    "Fortnite",
    "WOW Classic",
    "WOW BFA"
];
const itemsArr = [
    "Happy 8 ball",
    "Axe of Ice King",
    "Golden fish of enemy"
];
function getRandElem(arr){
    let randomElem = Math.floor(Math.random() * arr.length);
    return arr[randomElem];
}

let data = [];

function generateArr(){
    let arrLength = Math.floor(Math.random()*(100 - 40 + 1)) + 40;
    const typesArr = [
        "Sale",
        "Buy",
        "Deposit"
    ];
    const statusesArr = [
      "Done",
      "Cancel",
      "Error",
    ];

    for (let i = 0; i < arrLength; i++) {
        let date = new Date(Date.now() - i*100000);
        let cash = (i * Math.random()*(20 - 2 + 1) + 2).toFixed(2);

        data.push({
            key: i,
            id: i,
            date: date.toLocaleString('en', {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: false
            }),
            info: i%2 === 0 ? ["Make up deposit $ 5,000.00 to your account."] : ["Buy in ", " the unique item, "],
            type: getRandElem(typesArr),
            cash: "$ " + cash,
            status: getRandElem(statusesArr)
        });
    }
}

generateArr();

const Balance = props => {

    return (
        <div>
            <BalanceHeader/>
            <Table
                columns={columns}
                dataSource={data}
                bordered={true}
                size={'small'}
                scroll={{
                    x: '100%',
                    scrollToFirstRowOnChange: true
                }}
                pagination={{
                    showLessItems: true,
                    //pageSize: 15
                    showTitle: true,
                    responsive: true,
                    defaultPageSize: 14,
                    pageSizeOptions: ['15','25','30']
                }}
            />
        </div>
    );
};

export default Balance;