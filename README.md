# es6-altEgo

Give your constructors and alter ego, allowing classes to be used as both a `constructor()` and a `function()`.

* Tiny, <20 lines of code
* Fast - practically no impact on performance
* Requires an ES6 environment with [`new.target`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new.target).
* Won't work in IE, works great in all other browsers

## Why?

So, I ran in to that issue where you can't invoke a `constructor()` as a normal function, it can only be used with `new`.

After doing some refactoring, I realised I'd have to rewrite a bunch of documentation. That's where I snapped...

## The problem

```es6
class foo {
  constructor() {
    console.log( 'hello from ego foo!' );
  }
}

foo(); // Class constructor foo cannot be invoked without 'new'
```

Why would you ever want to do this?

Well, maybe you want to dual-purpose your class to work both as a constructor (`new foo()`) or as a mixin (`foo( someObj )`).

## The solution

```es6
import altEgo from './path-to/altEgo.js';

class foo {
  // ...
}

const alt = function( ...args ) {
  console.log( 'hello from alt foo!' );
}

foo = altEgo( alt, foo ); // the new foo is pretty much identical twin of the original foo

foo(); // hello from alt foo!

void new foo(); // hello from ego foo!

class bar extends foo {
  constructor() {
    console.log( 'hello from ego bar!' );
    super();
  }
}

void new bar(); // hello from ego bar!
                // hello from ego foo!

bar(); // Class constructor bar cannot be invoked without 'new'
       // ...because we didn't altEgo() `bar`
```

## Alt extras

The alternate function gets two properties:

* `ego` - the constructor (in our case, the original `foo`)
* `mask` - the mask function (in our case, the new `foo`)

For example, you could do:

```es6
const alt = function( ...args ) {
  return new alt.ego( ...args );
}
```

In which case invoking `let ifoo = foo( some, args )` would give same results as `let ifoo = new foo( some, args )`.

## Credits

Based on a [idea by Bergi](https://stackoverflow.com/questions/56621336/is-there-a-way-to-allow-a-class-constructor-to-be-invoked-as-if-it-were-an-ordin).

## License

"The Unlicense", ie. public domain. Because screw lawyers.
