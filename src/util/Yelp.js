import credentials from './Credentials';

const apiKey = credentials.apiKey;

const Yelp = {
  search(term, location, sortBy) {
    const url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
    const data = {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    };
    return fetch(url, data).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => {
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zipCode,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        });
      }
    });
  }
};

export default Yelp;
