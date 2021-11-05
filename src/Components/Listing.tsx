import Input from './Input';
import React from 'react';

type Member = {name: string, email: string}
type MyState = { name: string, email: string, members: Array<Member> }

export default class Listing extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            email: '',
            members: []
        }
    }

    addItem = (evt: React.MouseEvent<HTMLInputElement>) => {
        evt.preventDefault();
        const text = this.state.name;
        const email = this.state.email;

        this.setState((prevState:MyState) => ({
            name: '',
            email: '',
            members: [...prevState.members, {name:text, email:email}],
          }));
    };

    setName = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ name: evt.currentTarget.value })
    }

    setEmail = (evt: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ email: evt.currentTarget.value })
    }

    render() {
        const { fieldProps } = this.props;

        return (
            <div>
                <Input {...fieldProps} name="participants" value={JSON.stringify(this.state.members)} type="hidden"></Input>
                <div className="wrapper">
                    <ul id="myMemberList">
                    {
                        this.state.members.map((member:Member, i:number) => {
                            return(
                            <li key={`li${i}`}>
                                <label htmlFor={`item${i}`}>{`${member.name}-${member.email}`}</label>
                            </li>
                            );
                        })
                    }
                    </ul>
                    <div className="add-items" >
                        <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.setName} required />
                        <input type="text" name="email" placeholder="Email" value={this.state.email} onChange={this.setEmail} required />
                        <input type="submit" value="+ Add Item" onClick={this.addItem} />
                    </div>
                </div>
            </div>
        );
    }
}