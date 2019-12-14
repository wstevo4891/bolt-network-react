# Suggestion Results Service

# Service for building suggestion search results
class SuggestionResults
  # Error thrown by a suggestion_id that does not match
  # 'genre', 'person', or 'movie'
  class SuggestionIDError < StandardError
    def message
      'Malformed suggestion ID'
    end
  end

  attr_reader :movies

  def self.create(suggestion_id)
    new(suggestion_id).call
  end

  def initialize(suggestion_id)
    @id, @klass = suggestion_id.split('_')
    @movies = []
  end

  def call
    @movies = fetch_results
    self
  end

  private

  def fetch_results
    case @klass
    when 'genre'
      suggest_genre
    when 'person'
      suggest_person
    when 'movie'
      suggest_movie
    else
      raise SuggestionIDError
    end
  end

  def suggest_genre
    Genre.includes(:movies).find(@id).movies
  end

  def suggest_person
    Person.includes(:movies).find(@id).movies
  end

  def suggest_movie
    movie = Movie.includes(genres: [:movies]).find(@id)

    [movie].concat(movie.genres.map(&:movies).flatten).uniq
  end
end