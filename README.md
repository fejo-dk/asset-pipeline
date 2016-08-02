# An Asset Pipeline (Work in Progress)

This is an asset pipeline for projects that use the following:

* ECMAScript 2015
* SCSS
* Fonts
* Images

It creates files with hashes in their names (for cache busting). It creates so called manifest files so that your application can find the files. You can for example use it together with Rails with the [rails_external_asset_pipeline](https://rubygems.org/gems/rails_external_asset_pipeline) gem. You can configure it via your `package.json`. Details on that will follow.

It's the core philosophy of this package that you don't need to know what technology is used in the pipeline. Currently it is a mix of Webpack and Gulp, but this could change later. The idea is that it still offers the same commands and understands the same configuration.

## Example

You can find an example on how to use this asset pipeline [here](https://github.com/moonglum/rails-5-and-node-asset-pipeline)

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/fejo-dk/asset-pipeline. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).

