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

  attr_reader :movies, :genres, :people, :header

  def self.create(suggestion_id)
    new(suggestion_id).call
  end

  def initialize(suggestion_id)
    @id, @klass = suggestion_id.split('_')
    @movies = []
    @genres = []
    @people = []
  end

  def call
    fetch_results
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
    @movies = Genre.includes(:movies).find(@id).movies
  end

  def suggest_person
    @movies = Person.includes(:movies).find(@id).movies
  end

  def suggest_movie
    movie = Movie.includes(genres: [:movies]).find(@id)

    @movies = [movie].concat(movie.genres.map(&:movies).flatten.uniq)
  end
end
