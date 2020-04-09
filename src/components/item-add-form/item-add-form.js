import React, {Component} from "react";
import './item-add-form.css'

export default class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            label: ''
        };

        this.onLabelChange = (e) => {
            this.setState({label: e.target.value})
        };

        const { onAddedItem } = this.props;

        this.onSubmit = (evt) => {
            evt.preventDefault();
            onAddedItem(this.state.label);
            this.setState(({label: ''}));
        }
    }

    render() {
        return (
            <form className={'item-add-form d-flex'}
                  onSubmit={ this.onSubmit }
            >
                <input type="text"
                       className={'form-control'}
                       onChange={ this.onLabelChange }
                       placeholder={'What needs to be done'}
                       value={ this.state.label }
                />
                <button type={'submit'}
                        className={'button btn btn-outline-secondary'}
                >
                    Add new item
                </button>
            </form>
        )
    }
}
