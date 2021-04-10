# frozen_string_literal: true

# Service for building suggestion search results
class SuggestionResults
  # Error thrown by a suggestion_id that does not match
  # 'genre', 'person', or 'movie'
  class SuggestionIDError < StandardError
  end

  attr_reader :movies

  def initialize(suggestion_id)
    @id, @klass = suggestion_id.split('_')
    @movies = fetch_results
  end

  private

  def fetch_results
    pick_result_type
  rescue SuggestionIDError => e
    Rails.logger.error(e.message)
    []
  end

  def pick_result_type
    case @klass
    when 'genre'
      suggest_genre
    when 'person'
      suggest_person
    when 'movie'
      suggest_movie
    else
      raise SuggestionIDError, error_message
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

  def error_message
    "Malformed suggestion ID: #{@id}_#{@klass}"
  end
end
