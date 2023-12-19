import React from 'react'
import { MdDelete } from 'react-icons/md';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';
const ExpenseList = ({ handleDelete, expenses, handleEdit, clearItems }) => {
    return (
        <>
            <ul className='list'>
                {/* Expense Item */}
                {expenses.map(expense => {
                    //ExpenseItem 가져와서 값 넣고 요소 생성
                    return (
                        <ExpenseItem
                            expense={expense}
                            key={expense.id}
                            handleDelete={handleDelete}
                            handleEdit={handleEdit}
                        />
                    )
                })}
            </ul>
            {/* 항목의 길이가 1 이상일떄 항목 삭제 버튼 생성 */}
            {expenses.length > 0 && (
                <button className='btn' onClick={clearItems}>
                    목록 지우기
                    <MdDelete className='btn-icon' />
                </button>
            )}
        </>
    )
}

export default ExpenseList