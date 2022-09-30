import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

 export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`; 

export const CREATE_WINE = gql`
mutation createWine($name: String!, $vineyard: String!, $year: Int!, $varietal: String, $price: Int!, $type: String!, $blurb: String) {
  createWine(name: $name, vineyard: $vineyard, year: $year, varietal: $varietal, price: $price, type: $type,  blurb: $blurb) {
    _id
    name
    vineyard
    year
    varietal
    price
    type
    blurb
  }
}
`;

// add pairing
export const ADD_PAIRING = gql`
    mutation addPairing($wineId: ID!, $pairingName: String!, $pairingDescription: String!, $pairingCategory: String!){
        addPairing(wineId: $wineId, pairingName: $pairingName, pairingDescription: $pairingDescription, paringCategory: $pairingCategory){
            _id
            name
            vineyard
            year
            varietal
            price
            type
            blurb
            pairings {
                _id
                pairingName
                pairingDescription
                pairingCategory
            }
        }
    }
`

// remove wine