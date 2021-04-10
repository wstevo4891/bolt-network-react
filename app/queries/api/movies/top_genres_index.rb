# frozen_string_literal: true

module Api
  module Movies
    # Query for building movies index by top genres
    class TopGenresIndex
      MOVIES_LIMIT = 24

      TOP_GENRES = %w[
        Action
        Adventure
        Comedy
        Drama
        Animation
        Family
        Romance
        Fantasy
        Sci-Fi
        Horror
      ].freeze

      def self.call
        genres.each_with_object({}) do |genre, hash|
          hash[genre.title] = genre.movies.take(MOVIES_LIMIT)
        end
      end

      def self.genres
        Genre.includes(:index_movies)
             .where(title: TOP_GENRES)
             .select(:id, :title)
      end
    end
  end
end
