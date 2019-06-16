'use strict';

const always = new Set([ 'name', 'length', 'prototype' ]); // properties to copy to mask

const altEgo = ( alt, ego ) => {

    if ( typeof alt !== 'function' ) throw new TypeError( `alt parameter must be a function` );
    if ( typeof ego !== 'function' ) throw new TypeError( `ego parameter must be a function` );

    const mask = function( ...args ) {
        return new.target ? Reflect.construct( ego, args, new.target ) : alt( ...args );
    };

    // make sure mask has any static methods/properties, also the correct name, length and prototype
    for ( const property of Object.getOwnPropertyNames( ego ) )
        if ( always.has( property ) || !mask.hasOwnProperty( property ) )
            Object.defineProperty( mask, property, Object.getOwnPropertyDescriptor( ego, property ) );

    alt.mask = mask;
    alt.ego  = ego;

    return mask;
};

export default altEgo;
