# Custom SQL Query
class QueryLab
  def self.call
    # genres_list
    # movies_index
    # action_movie_titles
    # all_indicies
    # search_results
    search_people
  end

  def self.search_results
    SearchResults.create('comedy')
  end

  def self.movies_index
    Genre.all.each_with_object({}) do |genre, hash|
      hash[genre.title] = genre.movies
    end
  end

  def self.find_people
    likes = <<-SQL
      array_to_string(directors, '||') LIKE :match
        OR array_to_string(writers, '||') LIKE :match
        OR array_to_string(actors, '||') LIKE :match
    SQL

    select(:directors, :writers, :actors).where(likes, match: '%Stanley%')
  end

  def self.search_people
    ActiveRecord::Base.connection.execute(
      <<-SQL
        SELECT directors, writers, actors
        FROM movies
        WHERE array_to_string(directors, '||') LIKE '%Stanley%'
          OR array_to_string(writers, '||') LIKE '%Stanley%'
          OR array_to_string(actors, '||') LIKE '%Stanley%'
      SQL
    ).values.flatten.uniq
  end

  # Movie.joins(:genres).where(genres: { title: genre.title })
  # def self.movies_index
  #   ActiveRecord::Base.connection.execute(
  #     <<-SQL
  #       SELECT movies.title, genres.title
  #       FROM
  #         movies
  #         INNER JOIN genres_movies
  #           ON movies.id = genres_movies.movie_id
  #         INNER JOIN genres
  #           ON genres_movies.genre_id = genres.id
  #       ORDER BY genres.title
  #     SQL
  #   ).values
  # end

  # def self.movies_index
  #   ActiveRecord::Base.connection.execute(
  #     <<-SQL
  #       SELECT genres.title, movies.*
  #       FROM
  #         genres
  #         INNER JOIN genres_movies
  #           ON genres.id = genres_movies.genre_id
  #         INNER JOIN movies
  #           ON movies.id = genres_movies.movie_id
  #       ORDER BY genres.title
  #     SQL
  #   ).values
  # end

  def self.action_movies
    # Movie.joins(:genres).where(genres: { title: 'Action' })
    Movie.connection.select_all(
      <<-SQL
        SELECT title FROM movies
        INNER JOIN genres_movies
          ON movies.id = genres_movies.movie_id
        WHERE genres_movies.genre_id = 1
        ORDER BY movies.title
        LIMIT 50
      SQL
    ).to_a
  end

  def self.action_movie_titles
    # Movie.joins(:genres).where(genres: { title: 'Action' }).pluck(:title)
    Movie.titles('Action')
  end

  def self.genres_list
    Genre.find_by_sql(
      <<-SQL
        SELECT genres.title FROM genres
        INNER JOIN genres_movies
          ON genres.id = genres_movies.genre_id
        WHERE genres_movies.movie_id = 91
        LIMIT 3
      SQL
    ).map(&:title)
  end

  # See all indices made by the database
  def self.all_indicies
    ActiveRecord::Base.connection.tables.each do |table|
      indexes = ActiveRecord::Base.connection.indexes(table)
      next unless indexes.length > 0

      puts "====>  #{table} <===="
      indexes.each do |ind|
        puts "----> #{ind.name}"
      end
      puts "====>  #{table} <===="
      2.times { puts '' }
    end
  end

  # def self.movies_index
  #   Movie.find_by_sql(
  #     <<-SQL
  #       SELECT * FROM movies, title FROM genres
  #       INNER JOIN genres_movies
  #         ON genres_movies.genre_id = genre.id
  #         AND genres_movies.movie_id = movie.id
  #       ORDER BY movies.title
  #     SQL
  #   )
  # end

  # def self.not_managed_by(name)
  #   joins(
  #     <<-SQL
  #       LEFT JOIN people managers
  #       ON managers.id = people.manager_id
  #     SQL
  #   ).where(
  #     'managers.id != ? OR managers.id IS NULL',
  #     Person.find_by(name: name)
  #   )
  # end
end

# Doesn't Work
# SELECT * FROM movies
# LEFT JOIN genres ON genres.title IN movies.genres
# ORDER BY movies.title
