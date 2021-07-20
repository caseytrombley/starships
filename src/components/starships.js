import React from 'react';
import axios from 'axios';

const baseurl = 'https://swapi.dev/api/starships/';

class Starships extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starships: [],
            manufacturer: '',
        }
    }

    componentDidMount() {
        this.getDataFromApi();
    }

    getDataFromApi = async () => {
        const response = await axios.get(baseurl);
        const data = response.data.results;
        console.log('data', data);
        this.setState({
            starships: data,
        })
        console.log('state', this.state);
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState({
            manufacturer: value,
        });
    }

    render() {
        const { starships, manufacturer } = this.state;
        const getFirstRecord = Array.isArray(starships) && starships.length ? starships[0] : {};
        const dataKeys = Object.keys(getFirstRecord);
        const manufacturers = starships.map(item => (
            item.manufacturer
        ));
        const filteredManufacturers = manufacturers.filter((item, index) => {
            return manufacturers.indexOf(item) === index;
        }).sort();

        console.log('headings', getFirstRecord);
        console.log('new manufacturer', this.state.manufacturer);
        console.log('unique manufacturers list', filteredManufacturers);

        return (
            <div className="starships">
                <div className="masthead">
                    <label className="label" htmlFor="starshipSelect">Starships by manufacturer:</label>
                    <div className="selector">
                        <select
                            name="starship-manufacturers"
                            id="starshipSelect"
                            onChange={(e) => this.handleChange(e)}
                        >
                            <option value="">-- All starships --</option>

                            { filteredManufacturers.map(item => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {!starships ? <div>loading...</div> :
                    <div className="results">
                        <table>
                            <thead>
                            <tr>
                                {dataKeys.map(heading =>
                                    <th>
                                        {
                                            heading
                                            .split('_').join(' ')
                                            .replace(/^\w/, c => c.toUpperCase())
                                        }
                                    </th>
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {!manufacturer.length ? starships.map(ship => {
                                return <tr>{dataKeys.map(heading => <td>{ship[heading]}</td>)}</tr>
                            }) : starships.filter(ship => ship.manufacturer.includes(manufacturer)).map(ship => {
                                return <tr>{dataKeys.map(heading => <td>{ship[heading]}</td>)}</tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        );
    }
}

export default Starships;