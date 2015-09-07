Mojo Toolkit
============

Note: This library is in alpha status. Do not use it in production yet.

Mojo is a small JavaScript library providing a bunch of small useful classes
to daily JavaScript programming a bit more enjoyable.
This toolkit tries to observe YAGNI principle ("you ain't gonna need it").
Means that new features will only be added by the author as soon as he
author needs them in daily work.
So, the toolkit will start as a quite "tiny" toolkit and will grow to a "small"
toolkit in future - it will never become a "large" toolkit, as it's main
purpose is to provide only really basic functionality.
Additional non-basic functionality will be provided in other projects,
not in this one.


Current eatures of "Mojo" are:

- *Class "Stream"*:<br/>
  This class allows to iterate collections and other iterable things
  very convenient.
  Most stream operation will work lazily, means transforming stream
  does normally not result in copying the underlying data collections.
  It is quite similar to 'java.util.stream.Streams' from the Java word,
  seqs in the Clojure world, streams in Scheme and Scala or lazy lists
  in Haskell (although the implementation is different).

  With Sreams you can do thinks like the following:

       Stream.from([1, 2, 3, 4, 5])
                .takeWhile(n => n < 5)
                .map(n => n * 2)
                .forEach(n => console.log(n)) // Will output 2, 4, 6, 8

       Stream.iterate([1, 1], (n1, n2) => n1 + n2) // will calculate the first
                .take(6)                           // six fibonacci numbers:
                .toArray()                         // [1, 1, 2, 3, 5, 8, 13]


- *Class "Objects":*<br/>
  Utility class with some static helper functions concerning objects.

- *Class "Strings":*<br/>
  Utility class with some static helper functions concerning string.

- *Class "Arrays":*<br/>
  Utility class with some static helper functions concerning arrays.


JavaScript support:
Mojo will support all ECMAScript 5 JavaScript engines, in particular all
modern browser (IE >= 10) and server-side Node.

