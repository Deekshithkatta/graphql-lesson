import {gql} from 'apollo-boost'

export const typeDefs = gql`
    extend type Mutation {
        ToggleCartHidden: Boolean!
    }
`
/*
    @client means this query is local
*/

const GET_CART_HIDDEN = gql`
   {
    cartHidden @client 
   } 
`

export const resolvers = {
    /*
    
    */
    Mutation: {
        /*
        _ means they are not be modified
        _root is the top level object 
        _args is the variable passed to mutation
        _context access to cache + client  
        _info Information about the query   
        toggleCartHidden: ( _root,_args,_context,_info)
        */
        toggleCartHidden: ( _root,_args,{cache})=> {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN,
            })

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            })

            return !cartHidden;
        }
    }
}
