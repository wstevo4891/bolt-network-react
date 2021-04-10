# frozen_string_literal: true

module Api
  # Presenter for Movie API
  class MoviePresenter
    attr_reader :movie, :reviews, :actors, :directors, :url, :writers

    delegate :id, :title, :poster, :year, :rating, :runtime, :plot,
             :genres_list, to: :@movie

    def initialize(movie)
      @movie = movie
      @url = "/movies/#{movie.id}"
      @reviews = reviews_list
      @actors = people_list(:actors)
      @directors = people_list(:directors)
      @writers = people_list(:writers)
    end

    def formatted_release_date
      @movie.release_date.strftime('%B %e, %Y')
    end

    private

    def reviews_list
      @movie.reviews.select(:id, :source, :value)
    end

    def people_list(association)
      @movie.send(association).pluck(:name)
    end
  end
end
