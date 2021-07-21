import React from 'react';

const baseurl = 'https://swapi.dev/api/starships/';

class Starships extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starships: [],
            selectedManufacturer: '',
            manufacturers: [],
        }
    }

    componentDidMount() {
        this.getStarships();
    }

    async getStarships() {
        const results = [];
        let url = baseurl;

        do {
            const res = await fetch(url);
            const data = await res.json();
            url = data.next;
            results.push(...data.results);
        } while(url)
        this.setState({
            starships: results,
            manufacturers: results.map(result => result.manufacturer).sort(),
        })
    }

    handleChange(event) {
        let value = event.target.value;
        this.setState({
            selectedManufacturer: value,
        });
    }

    render() {
        const { starships, selectedManufacturer, manufacturers } = this.state;
        const getFirstRecord = Array.isArray(starships) && starships.length ? starships[0] : {};
        const dataKeys = Object.keys(getFirstRecord);

        const filteredManufacturers = manufacturers.filter((item, index) => {
            return manufacturers.indexOf(item) === index;
        });

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
                                <option key={item} value={item}>{item}</option>
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
                                    <th key={heading}>
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
                            {!selectedManufacturer.length ? starships.map(ship => {
                                return <tr key={ship.model}>{dataKeys.map(heading => <td key={heading}>{ship[heading]}</td>)}</tr>
                            }) : starships.filter(ship => ship.manufacturer.includes(selectedManufacturer)).map(ship => {
                                return <tr key={ship.model}>{dataKeys.map(heading => <td key={heading}>{ship[heading]}</td>)}</tr>
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