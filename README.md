# TEDxUofW - Readme

## Build instructions

You must have both Ruby and Node installed. Be sure to install Ruby 2.x (64-bit) 
using RubyInstaller if you're using Windows.

Run the following inside the `tedxuofw-website` folder to install dependencies:

    gem install bundle
    npm install -g bower
    npm install -g grunt-cli
    
    bundle install
    bower install 
    npm install
    
To develop locally, run and visit `localhost:9000`:

    grunt serve 
    
Note that no minification or size optimizations will occur. To fully build a 
production-ready site, run:

    grunt build
    
...and deploy the contents of the `dist` folder. If you want to view the production 
code on localhost, run:

    grunt serve:dist
    
Running this command will first run `grunt build` then serve the contents of the 
`dist` folder at `localhost:9000`.

