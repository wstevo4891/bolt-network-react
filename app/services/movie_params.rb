# frozen_string_literal: true

# Service for generating Movie params to use in seeds.rb script
class MovieParams
  # == Constants ==============================================================
  FILE_REGEX = %r{/[\w-]+\.yml}.freeze

  # == Attribute Methods ======================================================
  attr_reader :params

  # == Class Methods ==========================================================
  def self.build(path, movie)
    new(path, movie).params
  end

  # == Instance Methods =======================================================
  def initialize(path, movie)
    @file = path[FILE_REGEX]
    @movie = movie
    @params = params_hash
    add_genre_params
    add_remote_url_params
  end

  private

  def params_hash
    {
      title: @movie['Title'],
      slug: @file.slice(1..-5),
      year: @movie['Year'],
      rating: @movie['Rated'],
      release_date: @movie['Released'],
      run_time: @movie['Runtime'],
      plot: @movie['Plot'],
      poster: @movie['Poster']
    }
  end

  def add_genre_params
    genres = @movie['Genre'].split(', ')

    @params[:genres_list] = genres.take(3)
    @params[:genre_ids] = Genre.where(title: genres).pluck(:id)
  end

  def add_remote_url_params
    poster_file = @file.slice(1..-1).sub('.yml', '-poster.jpg')

    @params[:remote_photo_url] = image_url(poster_file)
    return unless @movie['Banner']

    @params[:remote_banner_url] = image_url(@movie['Banner'])
    @params[:remote_logo_url] = image_url(@movie['Logo'])
  end

  def image_url(file)
    "https://bolt-network.s3-us-west-2.amazonaws.com/#{file}"
  end
end
