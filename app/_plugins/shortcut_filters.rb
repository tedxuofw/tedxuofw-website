module Jekyll
  module ShortcutFilters
    def if(value, true_output, untrue_output = '')
      value ? true_output : untrue_output
    end
  end
end

Liquid::Template.register_filter(Jekyll::ShortcutFilters)