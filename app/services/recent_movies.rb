# app/services/recent_movies.rb

require 'date'

class RecentMovies
  def self.create
    new.call
  end

  def initialize
    @year = Date.today.year - 5
  end

  def call
    recent_movies
  end

  private

  def recent_movies
    Movie.select { |movie| movie.year.to_i > @year }
  end
end
