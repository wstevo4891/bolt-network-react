# frozen_string_literal: true

# Shared methods for searching by title column
module TitleSearch
  extend ActiveSupport::Concern

  def self.match_arel_title(query)
    where(arel_table[:title].lower.matches("%#{query}%"))
  end

  def self.match_title(query)
    lower_title("#{query}%").or(lower_title("%#{query}%"))
  end

  def self.lower_title(query)
    where('LOWER(title) LIKE ?', query)
  end
end
