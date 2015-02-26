module Jekyll
  module CleanUrlFilter
    def clean_url(url)
      url.gsub(".html", "")
    end
  end
end

Liquid::Template.register_filter(Jekyll::CleanUrlFilter)