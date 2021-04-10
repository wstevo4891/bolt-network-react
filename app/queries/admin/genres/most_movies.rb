# frozen_string_literal: true

module Admin
  module Genres
    ##
    # Single query to find genres with the most movies
    #
    class MostMovies
      MOST_MOVIES_LIMIT = 28

      def self.call
        Genre.joins(:genres_movies)
             .group('genres.id')
             .having('COUNT(genre_id) > ?', MOST_MOVIES_LIMIT)
      end

      def self.test
        Genre.joins(:genres_movies)
             .group('genres.id')
             .order('COUNT(genre_id) DESC')
             .limit(5)
      end
    end
  end
end
