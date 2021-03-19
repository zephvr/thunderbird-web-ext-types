# thunderbird-mail-ext-types

TypeScript type definitions for Thunderbird WebExtensions, based on
[thundernest/webext-docs](https://thunderbird-webextensions.readthedocs.io)
documentation and schema files in Thunderbird's source.

This is a fork of [ctrlxc](https://github.com/ctrlxc/thunderbird-web-ext-types).

I've added a few more APIs that have been added and changed `browser` to
`messenger`.

## Requirements

As this library is using the `object` type and default values for generics,
`typescript` should at least be on version `2.3` to get the definitions to work.
I use version 4.5+

## Install it

Grab mail-ext-types.d from this repo.

As this is not a [`DefinitelyTyped`][definitely-typed] package, you will have to
include the type definition in your `tsconfig.json` by hand, via a `typeRoots`
option.

```json
{
  "compilerOptions": {
    // You have to explicitly set @types to get DefinitelyTyped type definitions
    "typeRoots": ["node_modules/@types", "node_modules/thunderbird-web-ext-types"],
  }
}
```

# Bugs

Probably. Also likely incomplete.


[definitely-typed]: https://github.com/DefinitelyTyped/DefinitelyTyped/
