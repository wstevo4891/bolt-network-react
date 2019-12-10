# Person Suggestions Service

# Service for searching movies based on a person suggestion
class PersonSuggestions
  def self.create(id)
    new(id).call
  end

  def initialize(id)
    @person = Person.lookup_with_movies(id)
  end

  def call
    build_movie_suggestions
  end

  private

  def build_movie_suggestions
    @movies = @person.movies

    @movies.concat(all_genre_movies).uniq
  end

  def all_genre_movies
    genres = @person.movies.map(&:genres).flatten.uniq

    genres.map { |genre| genre.movies.limit(10) }.flatten
  end
end
