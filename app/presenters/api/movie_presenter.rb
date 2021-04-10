# frozen_string_literal: true

module Api
  # Presenter for Movie API
  class MoviePresenter
    MOVIE_METHODS = %i[
      genres_list
      id
      plot
      poster
      rating
      runtime
      title
      year
    ].freeze

    attr_reader :actors, :directors, :movie, :writers

    delegate MOVIE_METHODS, to: :@movie

    def initialize(movie)
      @movie = movie
      @actors = people_list(:actors)
      @directors = people_list(:directors)
      @writers = people_list(:writers)
    end

    def formatted_release_date
      movie.release_date.strftime('%B %e, %Y')
    end

    def reviews_list
      movie.reviews.select(:id, :source, :value)
    end

    def movie_url
      "/movies/#{movie.id}"
    end

    private

    def people_list(association)
      movie.send(association).pluck(:name)
    end
  end
end
