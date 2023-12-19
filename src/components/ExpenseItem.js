import React, { Component } from 'react'
import "./ExpenseItem.css";
import { MdDelete, MdEdit } from 'react-icons/md';
//지출 항목 리스트 값 받아서 실제 요소 생성
const ExpenseItem = ({ expense, handleDelete, handleEdit }) => {
    return (
        <li className='item'>
            <div className='info'>
                <span className='expense'>{expense.charge}</span>
                <span className='amount'>{expense.amount}</span>
            </div>
            <div>
                <button className='edit-btn'
                    onClick={() => handleEdit(expense.id)}
                >
                    <MdEdit />
                </button>
                <button className='clear-btn'
                    onClick={() =>
                        handleDelete(expense.id)
                    }
                >
                    <MdDelete />
                </button>
            </div>
        </li>
    )

}

export default ExpenseItem