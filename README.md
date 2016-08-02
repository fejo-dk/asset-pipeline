# An Asset Pipeline (Work in Progress)

This is an asset pipeline for projects that use the following:

* ECMAScript 2015
* SCSS
* Fonts
* Images

It creates files with hashes in their names (for cache busting). It creates so called manifest files so that your application can find the files. You can for example use it together with Rails with the [rails_external_asset_pipeline](https://rubygems.org/gems/rails_external_asset_pipeline) gem. You can configure it via your `package.json`. Details on that will follow.

It's the core philosophy of this package that you don't need to know what technology is used in the pipeline. Currently it is a mix of Webpack and Gulp, but this could change later. The idea is that it still offers the same commands and understands the same configuration.
