import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import AddItem from "../item-add-form";

import './app.css';

export default class App extends Component {
    constructor(props){
        super(props);

        this.maxId = 1;

        // Создание элемента
        this.createTodoItemData = (label) => {
            return {
                label,
                important: false,
                done: false,
                id: this.maxId++
            }
        };

        this.state = {
            todoData: [
                this.createTodoItemData('Drink Coffee'),
                this.createTodoItemData('Make Awesome App'),
                this.createTodoItemData('Have a lunch')
            ],
            term: '',   // search
            filter: 'all'  // active, all, done
        };

        // Изменение значений в state
        this.toggleProperty = (arr, id, property) => {
            const idx = arr.findIndex((element) => {
                return element.id === id;
            });

            const oldItem = arr[idx];
            const newItem = {...oldItem, [property]: !oldItem[property]};
            return [
                ...arr.slice(0, idx),
                newItem,
                ...arr.slice(idx + 1)
            ];
        };

        // Удалить существующий элемент списка
        this.deleteItem = (id) => {
            this.setState((state) => {
                const idx = state.todoData.findIndex((element) => {
                    return element.id === id;
                });

                const resultItems = [
                    ...state.todoData.slice(0, idx),
                    ...state.todoData.slice(idx + 1)
                ];

                return {
                    todoData: resultItems
                }
            })
        };

        // Добавить новый элемент списка
        this.addItem = (text) => {
            const newItem = this.createTodoItemData(text);

            this.setState((state) => {
                const resultItems = [
                    ...state.todoData,
                    newItem
                ];

                return {
                    todoData: resultItems
                };
            });
        };

        // Изменение статуса Important
        this.onToggleImportant = (id) => {
            this.setState((state) => {
                return {
                    todoData: this.toggleProperty(state.todoData, id, 'important')
                };
            })
        };

        // Изменение статуса Done
        this.onToggleDone = (id) => {
            this.setState((state) => {
                return {
                    todoData: this.toggleProperty(state.todoData, id, 'done')
                };
            })
        };

        // Поиск по списку, либо весь список, либо список соответствующий term (поиск)
        this.search = (items, term) => {
            if (term.length === 0) {
                return items
            }

            return items.filter((item) => {
                return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
            });
        };

        // Поиск при вводе в панель поиска
        this.onSearchChange = (term) => {
            this.setState({ term });
        };

        // Фильтрация при выборе фильтра
        this.onFilterChange = (filter) => {
            this.setState({ filter });
        };

        // Фильтр статусов
        this.filter = (items, filter) => {
            switch (filter) {
                case 'all':
                    return items;
                case 'active':
                    return items.filter( (item) => !item.done );
                case 'done':
                    return items.filter( (item) => item.done );
                default:
                    return items;
            }
        };
    }

    render() {
        const { todoData, term, filter } = this.state;
        const visibleItems = this.filter(this.search(todoData, term), filter);
        const doneCount = this.state.todoData.filter((element) => {
            return element.done;
        }).length;

        const todoCount = todoData.length - doneCount;

        return (
            <div className="todo-app">
                <AppHeader toDo={ todoCount } done={ doneCount } />
                <div className="top-panel d-flex">
                    <SearchPanel onSearchChange={ this.onSearchChange }/>
                    <ItemStatusFilter filter={ filter }
                                      onFilterChange = { this.onFilterChange }
                    />
                </div>

                <TodoList todos={ visibleItems }
                          onDeleted={ this.deleteItem }
                          onToggleImportant={ this.onToggleImportant }
                          onToggleDone={ this.onToggleDone }
                />
                <AddItem onAddedItem={ this.addItem }/>
            </div>
        );
    }

};
