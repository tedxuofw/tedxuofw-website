# tedxuofw-website

All code and related assets for the website for [TEDxUofW][tedxuofw].


## Initial setup

You will need to install [Ruby][ruby], [SASS][sass], [Jekyll][jekyll], and [jekyll-assets][ja].

You may need to only install Ruby. Try the following steps:

1.  Install [Ruby][ruby] using the instructions from [their website][ruby-install].
2.  Install [Bundler][bundler] by executing the following command on the console:

        gem install bundler 
        
3.  Navigate to the root directory of the repository (the folder that contains the `Gemfile`)
4.  Install the packages by running the command:

        bundle install 
        
In theory, these commands _should_ install all the packages you need to build the website. If not, let me know, and we'll figure something out.
  
## Build

Currently, we use [jekyll-assets][ja] as our build system. Run the following commands to fully build the website:

    cd tedxofw-website
    bundle exec jekyll serve --watch
    
The command `jekyll serve --watch` will create a process that automatically watches our files for changes and rebuilds the website when any file is changed. The actual website can then be found inside `tedxuofw-website/_site` and can be copied via ftp to production. 

## Project structure 

Our project is organized into the following folders and files :

    tedxuofw-website 
        _assets 
            fonts 
            javascripts 
            media 
            stylesheets 
            vendors 
        _data 
        _includes 
        _layouts 
        _plugins 
        _posts 
        _site 
        
        .gitignore 
        .htaccess 
        _config.yml 
        
        [html files]

Out of these files, you can safely ignore the `_plugins` and `_posts` folders, and the `.gitignore` file. The `_plugins` folder contains some minimal configuration for the few plugins that we use, and should not need modification on a day-to-date basis. The `_posts` folder is meant to contain blog posts. Because at present, we don't have a blog post and therefore no blogs, this folder will remain empty.

TODO: complete 

  [tedxuofw]: http://tedxuofw.com
  [ruby]: https://www.ruby-lang.org/
  [sass]: http://sass-lang.com 
  [jekyll]: http://jekyllrb.com 
  [ja]: http://ixti.net/jekyll-assets/ 
  [ruby-install]: https://www.ruby-lang.org/en/installation/
  [bundler]: http://bundler.io/ 
  