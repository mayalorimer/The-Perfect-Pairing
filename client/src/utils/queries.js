import { gql } from '@apollo/client';


export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      wineSchema {
        name
        vineyard
        year
        varietal
        price
        type
        blurb
      }
    }
  }
`;

export const QUERY_GETWINE = gql`
query getWine($type: String, $minPrice: Int, $maxPrice: Int) {
  getWine(type: $type, minPrice: $minPrice, maxPrice: $maxPrice) {
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
`;

export const QUERY_GETPAIRING = gql`
query getPairing($pairingCategory: String!){
    getPairing(pairingCategory: $pairingCategory){
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
`;


export const QUERY_GETONEWINE = gql`
query getOneWine($wineID: ID!){
    wine(wineID: $wineID){
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
`;

export const QUERY_WINES = gql`
query Wines {
  wines {
    _id
    name
    vineyard
    year
    varietal
    price
    type
    blurb
  }
}`