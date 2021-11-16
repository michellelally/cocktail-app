import React, { Component } from 'react';
import { Card } from 'react-bootstrap';

// This component is responsible for querying the database and returning the items that match the request
class Recommendations extends Component {

    state = {
        data: []
    };

    componentDidMount() {
        this.callBackendAPI()
            // .then(res => this.setState({ data: res.recommendations }))
            // .catch(err => console.log(err));
            .then(res => this.setState({ data: res.express }))
            .catch(err => console.log(err));
    }
    // fetching the GET route from the Express server which matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/express_backend');
        const body = await response.json();
        console.log(body)

        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

    // This method createa a React-Bootstrap Card that I got from here
    // https://react-bootstrap.github.io/components/cards/
    renderCards = (card, index) => {
        // return (
        //     <div style={styles.divContainer}>
        //         {/* creating the card and assigning it with the bootstrap class */}
        //         <Card style={styles.card} className="cards bg-dark text-white" key={index}>
        //             {/* im using a card that provides an image overlay  */}
        //             <Card.Img className="images" src={card.image_url} alt="Glass" />
        //             <Card.ImgOverlay className="overlay">
        //                 {/* displaying the cocktail name  */}
        //                 <Card.Title style={styles.cardTitle}>{card.title}</Card.Title>
        //                 {/* displaying the cocktail alcohol and description  */}
        //                 <Card.Text style={styles.cardText}>{card.author}</Card.Text>
        //             </Card.ImgOverlay>
        //         </Card>
        //     </div>
        // );
    }

    render() {

        return (

            <div>
                {/* mapping the cocktails array to call the renderCards function for each element in the array*/}
                <div>
                    {/* {this.state.data.map(this.renderCards)} */}

                    {this.state.data}
                </div>
                {/* a button that redirects you back to the homepage  */}
            </div>
        );
    }
};

const styles = StyleSheet.create({
    divContainer: { width: '90%', margin: '1%' },
    card: { width: '100%', margin: '1.5%' },
    cardTitle: { fontSize: '1.5vw', marginBottom: '0.12rem', fontWeight: 'bold' },
    cardText: { fontSize: '1.1vw', marginBottom: '0.12rem' }
});
export default Recommendations;