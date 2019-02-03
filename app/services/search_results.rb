# app/services/search_results.rb

class SearchResults
  attr_reader :query

  def self.create(query)
    new(query).call
  end

  def initialize(query)
    @query = query
  end

  def call
    retrieve_results
  end

  private

  def retrieve_results
    {
      movies: movie_title_match,
      genres: genre_name_match
    }
  end

  def movie_title_match
    Movie.where(Movie.arel_table[:title].lower.matches("%#{query}%"))
  end

  def genre_name_match
    Genre.where(Genre.arel_table[:name].lower.matches("%#{query}%"))
  end
end
